export function getNonEmptyFields(data) {
  return Object.fromEntries(Object.entries(data).filter(([_, v]) => !v));
}
