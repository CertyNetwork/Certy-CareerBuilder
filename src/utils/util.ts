export function shortenHex(hex: string, length = 4) {
  return `${hex.substring(0, length + 2)}…${hex.substring(
    hex.length - length,
  )}`;
}

export const storage = {
  get: name =>
    localStorage.getItem(name)
      ? JSON.parse(localStorage.getItem(name) || '')
      : undefined,
  set: (name: string, token: string) =>
    window.localStorage.setItem(name, JSON.stringify(token)),
  clear: name => localStorage.removeItem(name),
};
