import { type HttpHandler } from 'msw';
import { usersHandlers } from './handlers/users';

export const handlers: HttpHandler[] = [...usersHandlers];
