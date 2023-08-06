export interface ICreateLogParams {
  method: string;
  url: string;
  queryParams: string;
  reqBody: string;
  duration: number;
  statusCode: number;
  resBody: string;
}
