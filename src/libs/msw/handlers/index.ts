import { type HttpHandler } from 'msw';
import { usersHandlers } from './users';

export const handlers: HttpHandler[] = [...usersHandlers];
