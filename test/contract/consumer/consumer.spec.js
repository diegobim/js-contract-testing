import 'dotenv/config';
import path from 'path';
import { Pact } from '@pact-foundation/pact';
import { fetchCharacters } from '../../../src/service/api';
import charactersInteraction from '../interactions/characters.interaction';

const opts = {
  consumer: process.env.CONSUMER_SERVICE,
  provider: process.env.PROVIDER_SERVICE,
  port: parseInt(process.env.MOCK_SERVER_PORT),
  log: path.resolve(process.cwd(), 'logs', 'pact.log'),
  dir: path.resolve(process.cwd(), 'pacts'),
  logLevel: process.env.LOG_LEVEL || 'WARN',
  spec: 2,
  cors: true,
};

describe('API Pact Test - Characters Service', () => {
  const mockProvider = new Pact(opts);

  beforeAll(
    async () =>
      await mockProvider.setup().then(() => {
        mockProvider.addInteraction(charactersInteraction);
      })
  );

  afterEach(() => mockProvider.verify());

  afterAll(() => mockProvider.finalize());

  it('should return the expected data', async () => {
    const response = await fetchCharacters();
    const { id, name } = response.data[0];
    expect(response.status).toEqual(200);
    expect(id).toBe(1);
    expect(name).toBe('Walter White');
  });
});
