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

/**
 * Extracts address parts from a combined address string
 * @param fullAddress Combined address string (e.g., "123 Main St, Ward Name, Province Name")
 * @returns Object with street, ward, and province parts
 */
export function parseAddressParts(fullAddress: string | null | undefined): {
  street: string;
  ward: string;
  province: string;
} {
  if (!fullAddress || fullAddress.trim() === '') {
    return { street: '', ward: '', province: '' };
  }

  const parts = fullAddress.split(',').map(part => part.trim());

  return {
    street: parts[0] || '',
    ward: parts[1] || '',
    province: parts[2] || ''
  };
}

/**
 * Finds province code by matching province name
 * @param provinceName Name of the province to find
 * @param provinces Array of province objects with name and code properties
 * @returns Province code as string or empty string if not found
 */
export function findProvinceCodeByName(
  provinceName: string | null | undefined,
  provinces: Array<{ name: string; code: number }>
): string {
  if (!provinceName || !provinces) {
    return '';
  }

  const normalizedName = provinceName.toLowerCase().trim();
  const province = provinces.find(p =>
    p.name.toLowerCase().includes(normalizedName) ||
    normalizedName.includes(p.name.toLowerCase())
  );

  return province ? province.code.toString() : '';
}

/**
 * Finds ward code by matching ward name
 * @param wardName Name of the ward to find
 * @param wards Array of ward objects with name and code properties
 * @returns Ward code as string or empty string if not found
 */
export function findWardCodeByName(
  wardName: string | null | undefined,
  wards: Array<{ name: string; code: number }>
): string {
  if (!wardName || !wards) {
    return '';
  }

  const normalizedName = wardName.toLowerCase().trim();
  const ward = wards.find(w =>
    w.name.toLowerCase().includes(normalizedName) ||
    normalizedName.includes(w.name.toLowerCase())
  );

  return ward ? ward.code.toString() : '';
}

/**
 * Extracts street address from full address by removing ward and province parts
 * @param fullAddress Complete address string
 * @param wardName Ward name to remove
 * @param provinceName Province name to remove
 * @returns Clean street address
 */
export function extractStreetAddress(
  fullAddress: string | null | undefined,
  wardName?: string,
  provinceName?: string
): string {
  if (!fullAddress) {
    return '';
  }

  let streetAddress = fullAddress;

  // Remove province name if provided
  if (provinceName) {
    streetAddress = streetAddress.replace(new RegExp(`,\\s*${provinceName}\\s*$`, 'i'), '');
  }

  // Remove ward name if provided
  if (wardName) {
    streetAddress = streetAddress.replace(new RegExp(`,\\s*${wardName}\\s*$`, 'i'), '');
  }

  return streetAddress.replace(/,\s*$/, '').trim();
}


/**
 * Generates initials for avatar fallback from a full name.
 * Takes the first letter of the first name and first letter of the last name.
 * If only one name is provided, takes the first two letters.
 * @param fullName The full name string
 * @returns Uppercase initials (max 2 characters)
 */
export function getAvatarFallback(fullName: string | null | undefined): string {
  if (!fullName || fullName.trim() === '') {
    return 'U'; // Default fallback
  }

  const nameParts = fullName.trim().split(/\s+/);

  if (nameParts.length === 1) {
    // Single name: take first two letters
    return nameParts[0].substring(0, 2).toUpperCase();
  }

  // Multiple names: take first letter of first and last name
  const firstInitial = nameParts[0].charAt(0);
  const lastInitial = nameParts[nameParts.length - 1].charAt(0);

  return (firstInitial + lastInitial).toUpperCase();
}
