/**
 * Combines multiple address parts into a single string.
 * Empty, null, or undefined parts are automatically filtered out.
 * @param parts The string parts to combine (e.g., street, ward, district, city).
 * @returns A complete address string with parts joined by a comma and space.
 */
export function combineAddressParts(
  ...parts: (string | null | undefined)[]
): string {
  return parts
    .filter(part => part && part.trim() !== '') // Filter out invalid or empty parts
    .join(', '); // Join the valid parts with ', '
}