
export const isPublicAddressValid = (publicAddress: any):boolean => {
  return !!publicAddress && typeof publicAddress ==='string' && publicAddress.trim() !== ""
}
