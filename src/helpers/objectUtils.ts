/**
 * Creates a new object by removing the specified properties.
 * This function ensures immutability by not modifying the original object.
 *
 * @template T - The type of the source object.
 * @template K - The type of the keys to remove, which must be keys of T.
 * @param {T} obj - The source object.
 * @param {...K[]} keys - A rest parameter of keys to remove from the object.
 * @returns {Omit<T, K>} A new object without the specified keys.
 */
export function removeProperties<T extends object, K extends keyof T>(
  obj: T,
  ...keys: K[]
): Omit<T, K> {
  // 1. Create a shallow copy of the source object to avoid mutation.
  const newObj = { ...obj };

  // 2. Iterate over the keys and delete them from the new object.
  for (const key of keys) {
    delete newObj[key];
  }

  // 3. Return the new object.
  // Type assertion is needed as TypeScript doesn't automatically infer the new shape after deletion.
  return newObj as Omit<T, K>;
}