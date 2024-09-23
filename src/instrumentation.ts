export const register = async (): Promise<void> => {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { initMocks } = await import('./libs/msw/setup');
    initMocks();
  }
};
