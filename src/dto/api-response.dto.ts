export class ApiResponse<T = null> {
  statusCode: number;
  message: string;
  payload?: T;
}
