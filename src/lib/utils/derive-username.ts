/**
 * DERIVE USERNAME FROM EMAIL
 * ==========================
 *
 * Derives a display username from an email address following these rules:
 * 1. Take the string before the "@"
 * 2. Replace dots and underscores with spaces
 * 3. Capitalize each word
 * 4. If longer than 13 chars, truncate to 11 and add "..."
 *
 * @example
 * "john.doe@example.com" → "John Doe"
 * "jane_smith@gmail.com" → "Jane Smith"
 * "alexander_hamilton_the_great@gmail.com" → "Alexander H..."
 * "a.very.long.email.name@test.com" → "A Very Long..."
 *
 * @param email - The user's email address
 * @returns The derived display name
 */
export function deriveUsername(email: string): string {
  if (!email || !email.includes("@")) {
    return "User";
  }

  // Get the local part (before @)
  const localPart = email.split("@")[0];

  // Replace dots and underscores with spaces
  const withSpaces = localPart.replace(/[._]/g, " ");

  // Capitalize each word
  const capitalized = withSpaces
    .split(" ")
    .filter((word) => word.length > 0) // Remove empty strings from consecutive delimiters
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  // Constants for truncation
  const MAX_LENGTH = 13;
  const TRUNCATE_TO = 11;
  const ELLIPSIS = "...";

  // Truncate if too long
  if (capitalized.length > MAX_LENGTH) {
    return capitalized.slice(0, TRUNCATE_TO).trimEnd() + ELLIPSIS;
  }

  return capitalized || "User";
}

/**
 * Gets initials from a derived username (for avatars)
 *
 * @example
 * "John Doe" → "JD"
 * "Jane" → "J"
 * "Alexander H..." → "AH"
 *
 * @param username - The derived username
 * @returns 1-2 character initials
 */
export function getInitials(username: string): string {
  // Remove ellipsis if present
  const cleanName = username.replace("...", "").trim();

  const words = cleanName.split(" ").filter((w) => w.length > 0);

  if (words.length === 0) return "U";
  if (words.length === 1) return words[0].charAt(0).toUpperCase();

  return (words[0].charAt(0) + words[words.length - 1].charAt(0)).toUpperCase();
}
