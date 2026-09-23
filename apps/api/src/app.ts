import Fastify from 'fastify';

type BuildAppOptions = {
  logger?: boolean;
};

export function buildApp(options: BuildAppOptions = {}) {
  const app = Fastify({
    logger: options.logger ?? process.env.NODE_ENV !== 'test',
  });

  app.get('/health', async () => ({
    service: 'idea-incubator-api',
    status: 'ok',
  }));

  return app;
}
