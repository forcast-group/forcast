const initMocks = async (): Promise<void> => {
  if (typeof window !== 'undefined') {
    const { worker } = await import('./browser');
    worker.start();
  } else {
    const { server } = await import('./server');
    server.listen();
  }
};

export { initMocks };
