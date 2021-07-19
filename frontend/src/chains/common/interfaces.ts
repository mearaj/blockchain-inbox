export interface ValidatorResponse {
  isValid: boolean;
  error: string;
}

export interface PublicKeyValidatorResponse extends ValidatorResponse {
  publicKey: string;
}
