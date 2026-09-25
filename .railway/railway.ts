import { defineRailway, github, postgres, project, service, volume } from 'railway/iac';

export default defineRailway(() => {
  const database = postgres('Postgres', { region: 'sfo' });
  database.networking = { privateNetworkEndpoint: 'postgres' };

  const postgresVolume = volume('postgres-volume', {
    alerts: { usage: { '80': {}, '95': {}, '100': {} } },
    allowOnlineResize: true,
    region: 'sfo',
    sizeMB: 5000,
  });

  const api = service('api', {
    source: github('embustos/idea-incubator', {
      branch: 'main',
      checkSuites: true,
    }),
    build: 'npm run build:api',
    start: 'npm run start --workspace @idea-incubator/api',
    healthcheck: '/health',
    healthcheckTimeout: 120,
    replicas: { sfo: 1 },
    env: {
      DATABASE_URL: database.env.DATABASE_URL,
      NODE_ENV: 'production',
    },
  });

  return project('idea-incubator', {
    resources: [database, api, postgresVolume],
  });
});
