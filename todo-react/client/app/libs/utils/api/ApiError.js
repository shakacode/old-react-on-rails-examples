// @flow
class ApiError extends Error {
  name: string;
  isApiError: boolean;
  response: {
    body: Object,
    status: number,
  };
  constructor(message: string, errData: Object, status: number) {
    super(message);
    this.name = 'ApiError';
    this.isApiError = true;
    this.response = {
      body: errData,
      status,
    };
  }
}

export default ApiError;
