export const isValidHex = (hexString: string) => {
  return /^([A-Fa-f0-9]+)$/.test(hexString);
}
