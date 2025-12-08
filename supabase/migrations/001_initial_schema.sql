-- ============================================
-- COZY COVE DATABASE SCHEMA
-- ============================================
-- Run this in your Supabase SQL Editor to set up the database

-- ============================================
-- USERS TABLE
-- ============================================
-- Extends Supabase auth.users with application-specific data
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- ============================================
-- FAVORITES TABLE
-- ============================================
-- Stores user's saved/favorited products
CREATE TABLE IF NOT EXISTS public.favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.users(id) ON DELETE CASCADE,
  product_id TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;

-- ============================================
-- PRODUCT CLICKS TABLE
-- ============================================
-- Tracks when users click on products (for trending calculation)
CREATE TABLE IF NOT EXISTS public.product_clicks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.users(id) ON DELETE SET NULL,
  product_id TEXT NOT NULL,
  clicked_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.product_clicks ENABLE ROW LEVEL SECURITY;

-- ============================================
-- PRODUCTS CACHE TABLE
-- ============================================
-- Caches normalized products from AliExpress to reduce API calls
CREATE TABLE IF NOT EXISTS public.products_cache (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  image TEXT,
  url TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  old_price DECIMAL(10,2),
  discount_percent INTEGER,
  rating DECIMAL(2,1),
  orders INTEGER DEFAULT 0,
  category TEXT,
  tags TEXT[],
  first_seen_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- PRODUCT STATS TABLE
-- ============================================
-- Aggregated statistics for trending calculation
CREATE TABLE IF NOT EXISTS public.product_stats (
  product_id TEXT PRIMARY KEY,
  total_clicks INTEGER DEFAULT 0,
  recent_clicks INTEGER DEFAULT 0,
  total_saves INTEGER DEFAULT 0,
  last_click_at TIMESTAMPTZ,
  last_save_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ROW LEVEL SECURITY POLICIES
-- ============================================

-- Users can only view and update their own data
CREATE POLICY "Users can view own data" ON public.users 
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own data" ON public.users 
  FOR UPDATE USING (auth.uid() = id);

-- Users can manage their own favorites
CREATE POLICY "Users can view own favorites" ON public.favorites 
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own favorites" ON public.favorites 
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own favorites" ON public.favorites 
  FOR DELETE USING (auth.uid() = user_id);

-- Anyone can insert clicks (including anonymous users)
CREATE POLICY "Anyone can insert clicks" ON public.product_clicks 
  FOR INSERT WITH CHECK (true);

-- Users can view their own clicks
CREATE POLICY "Users can view own clicks" ON public.product_clicks 
  FOR SELECT USING (auth.uid() = user_id);

-- Products cache is readable by everyone (no auth required)
CREATE POLICY "Anyone can read products cache" ON public.products_cache 
  FOR SELECT USING (true);

-- Product stats are readable by everyone
CREATE POLICY "Anyone can read product stats" ON public.product_stats 
  FOR SELECT USING (true);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX IF NOT EXISTS idx_favorites_user_id ON public.favorites(user_id);
CREATE INDEX IF NOT EXISTS idx_favorites_product_id ON public.favorites(product_id);
CREATE INDEX IF NOT EXISTS idx_clicks_product_id ON public.product_clicks(product_id);
CREATE INDEX IF NOT EXISTS idx_clicks_clicked_at ON public.product_clicks(clicked_at);
CREATE INDEX IF NOT EXISTS idx_products_cache_category ON public.products_cache(category);
CREATE INDEX IF NOT EXISTS idx_products_cache_updated_at ON public.products_cache(updated_at);

-- ============================================
-- TRIGGER FUNCTIONS
-- ============================================

-- Function to update product stats when a click is recorded
CREATE OR REPLACE FUNCTION update_product_stats_on_click()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.product_stats (product_id, total_clicks, recent_clicks, last_click_at, updated_at)
  VALUES (NEW.product_id, 1, 1, NOW(), NOW())
  ON CONFLICT (product_id) DO UPDATE SET
    total_clicks = product_stats.total_clicks + 1,
    recent_clicks = product_stats.recent_clicks + 1,
    last_click_at = NOW(),
    updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to update product stats when a favorite is added
CREATE OR REPLACE FUNCTION update_product_stats_on_save()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.product_stats (product_id, total_saves, last_save_at, updated_at)
  VALUES (NEW.product_id, 1, NOW(), NOW())
  ON CONFLICT (product_id) DO UPDATE SET
    total_saves = product_stats.total_saves + 1,
    last_save_at = NOW(),
    updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to decrement saves when a favorite is removed
CREATE OR REPLACE FUNCTION update_product_stats_on_unsave()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE public.product_stats SET
    total_saves = GREATEST(0, total_saves - 1),
    updated_at = NOW()
  WHERE product_id = OLD.product_id;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create user record on signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, created_at, last_login_at)
  VALUES (NEW.id, NEW.email, NOW(), NOW())
  ON CONFLICT (id) DO UPDATE SET last_login_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- TRIGGERS
-- ============================================

-- Trigger to update stats on product click
DROP TRIGGER IF EXISTS on_product_click ON public.product_clicks;
CREATE TRIGGER on_product_click
  AFTER INSERT ON public.product_clicks
  FOR EACH ROW
  EXECUTE FUNCTION update_product_stats_on_click();

-- Trigger to update stats on favorite add
DROP TRIGGER IF EXISTS on_product_favorite ON public.favorites;
CREATE TRIGGER on_product_favorite
  AFTER INSERT ON public.favorites
  FOR EACH ROW
  EXECUTE FUNCTION update_product_stats_on_save();

-- Trigger to update stats on favorite remove
DROP TRIGGER IF EXISTS on_product_unfavorite ON public.favorites;
CREATE TRIGGER on_product_unfavorite
  AFTER DELETE ON public.favorites
  FOR EACH ROW
  EXECUTE FUNCTION update_product_stats_on_unsave();

-- Trigger to create user record on Supabase auth signup
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- ============================================
-- SCHEDULED JOB FOR RESETTING RECENT CLICKS
-- ============================================
-- Note: This requires pg_cron extension. Run this if you want automatic reset.
-- You may need to enable pg_cron in your Supabase project settings.

-- Reset recent_clicks weekly (every Sunday at midnight UTC)
-- SELECT cron.schedule('reset-recent-clicks', '0 0 * * 0', $$
--   UPDATE public.product_stats SET recent_clicks = 0, updated_at = NOW();
-- $$);
