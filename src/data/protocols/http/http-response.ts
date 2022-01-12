export enum HttpStatusCode {
  noContent = 204,          
  ok = 200,          
  badRequest = 400,          
  unauthorized = 401,          
  notFound = 404,          
  serverError = 400,          
}

export type HttpResponse<T> = {
  statusCode: HttpStatusCode;
  body?: T;
}