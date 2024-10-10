import { ApiError } from 'next/dist/server/api-utils';

export const fetchWithErrorHandling = <T>(url: RequestInfo, options: RequestInit): Promise<T> =>
  fetch(url, options)
    .catch((e) => {
      throw Error(e);
    })
    .then(handleErrors)
    .then((res) => res?.json());

const handleErrors = async (res: void | Response) => {
  if (!res) return;
  if (res.ok) return res;

  switch (res.status) {
    case 400:
      throw new ApiError(400, 'INVALID_TOKEN');
    case 401:
      throw new ApiError(401, 'UNAUTHORIZED');
    case 403:
      throw new ApiError(403, 'FORBIDDEN');
    case 500:
      throw new ApiError(500, 'INTERNAL_SERVER_ERROR');
    case 502:
      throw new ApiError(502, 'BAD_GATEWAY');
    case 404:
      throw new ApiError(404, 'NOT_FOUND');
    default:
      throw new ApiError(res.status, 'UNHANDLED_ERROR');
  }
};
