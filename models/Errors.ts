export interface ValidationError {
  path: (string | number)[]
  message: string
  code: string
}

export interface APIError {
  statusCode: number
  statusMessage: string
  message: string
  data: {
    errors: ValidationError[]
  }
}
