import { http, HttpResponse } from 'msw';

export const handlers = [
  // Sample
  http.get('https://example.com/user', () => {
    return HttpResponse.json({
      id: '1',
      firstName: 'John',
      lastName: 'Doe',
    });
  }),
];
