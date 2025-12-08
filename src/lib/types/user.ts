/**
 * User type for the application
 */
export interface User {
  id: string;
  email: string;
  displayName: string;
  createdAt: Date;
  lastLoginAt: Date;
}

/**
 * Auth state for the application
 */
export interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

/**
 * User favorite
 */
export interface Favorite {
  id: string;
  userId: string;
  productId: string;
  createdAt: Date;
}

/**
 * Product click record
 */
export interface ProductClick {
  id: string;
  userId?: string;
  productId: string;
  clickedAt: Date;
}
