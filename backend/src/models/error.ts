export interface Error {
  message: string;
  stack?: string;
}

export interface ErrorResponseBody {
  error: Error
}
