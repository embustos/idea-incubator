import assert from 'node:assert/strict';
import { after, describe, it } from 'node:test';

import { buildApp } from './app.js';

const app = buildApp({ logger: false });

after(async () => {
  await app.close();
});

describe('GET /health', () => {
  it('reports that the API is healthy', async () => {
    const response = await app.inject({
      method: 'GET',
      url: '/health',
    });

    assert.equal(response.statusCode, 200);
    assert.deepEqual(response.json(), {
      service: 'idea-incubator-api',
      status: 'ok',
    });
  });
});
