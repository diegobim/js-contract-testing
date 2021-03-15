import { eachLike, string, integer } from '@pact-foundation/pact/dsl/matchers';

const interaction = {
  uponReceiving: 'a request to list all characters',
  withRequest: {
    method: 'GET',
    path: '/characters',
  },
  willRespondWith: {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
    },
    body: eachLike(
      {
        id: integer(1),
        name: string('Walter White'),
      },
      { min: 5 }
    ),
  },
};

module.exports = interaction;
