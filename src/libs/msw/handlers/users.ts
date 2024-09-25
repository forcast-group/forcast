import { http, type HttpHandler, HttpResponse } from 'msw';

/**
 * Example Request Handler
 *
 * GET: /user
 */
const getUser = http.get('https://example.com/user', () => {
  return HttpResponse.json({
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
  });
});

export const usersHandlers: HttpHandler[] = [getUser];
