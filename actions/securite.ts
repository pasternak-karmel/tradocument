"use server";

export function excludeFields<T, Key extends keyof T>(
  obj: T,
  keys: Key[]
): Omit<T, Key> {
  const newObj = { ...obj };
  for (const key of keys) {
    delete newObj[key];
  }
  return newObj;
}

//use case: return user.length > 0 ? excludeFields(user[0], ["id"]) : null;