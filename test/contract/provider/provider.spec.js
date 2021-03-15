import 'dotenv/config';
import jsonServer from 'json-server';
import { Verifier } from '@pact-foundation/pact';

const LOG_LEVEL = process.env.LOG_LEVEL || 'WARN';
const providerService = `${process.env.SERVER_URI}:${process.env.SERVER_PORT}`;
const pactBrokerUrl = `${process.env.PACT_LOCAL_BROKER}pacts/`;

const opts = {
  provider: process.env.PROVIDER_SERVICE,
  logLevel: LOG_LEVEL,
  providerBaseUrl: providerService,
  pactUrls: [
    `${pactBrokerUrl}provider/${process.env.PROVIDER_SERVICE}/consumer/${process.env.CONSUMER_SERVICE}/latest`,
  ],
  publishVerificationResult: true,
  providerVersion: process.env.PACT_VERSION,
};

describe('Pact Verification', () => {
  let server;

  beforeAll(() => {
    const app = jsonServer.create();
    app.use(jsonServer.defaults());
    app.use(jsonServer.bodyParser);
    app.use(jsonServer.router('./data/characters.json'));

    server = app.listen(process.env.SERVER_PORT, () => {
      console.log('JSON Server is running');
    });
  });

  afterAll(() => {
    server.close();
  });

  it('should validate the expectations of the consumer service', () => {
    return new Verifier(opts).verifyProvider();
  });
});
