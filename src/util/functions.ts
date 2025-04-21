/**
 *
 * @param key
 */
export function nameof<T>(key: keyof T): string;

// export function nameof<T>(type: { new(): T }, key: keyof T): string {
//   return `${type.name}.${String(key)}`;
// }

/**
 * 
 */
export function nameof(entity: { new (): object }): string;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function nameof(keyOrEntity: any): string {
  if (typeof keyOrEntity === 'function') {
    // This means the input is a class constructor
    return keyOrEntity.name; // Return the class name
  } else {
    // Otherwise, it's a key of a type, return it as string
    return keyOrEntity as string;
  }
}