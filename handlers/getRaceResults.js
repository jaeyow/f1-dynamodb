const { makeHandler } = require('./utils')
const { getRaceResults } = require('../data')
const { Result } = require('../entities')

const inputSchema = {
  type: 'object',
  properties: {
    pathParameters: {
      type: 'object',
      properties: {
        season: { type: 'string' },
        round: { type: 'integer' }
      },
      required: [ 'season', 'round' ]
    }
  },
  required: [ 'pathParameters' ]
};

const handler = async event => {
  const result_obj = new Result({
    season: event.pathParameters.season,
    round: event.pathParameters.round
  });
  const { results, error } = await getRaceResults({result: result_obj});
  const statusCode = error ? 500 : 200;
  const body = error ? JSON.stringify({ error }) : JSON.stringify({ results });
  return {
    statusCode,
    body
  };
};

module.exports.handler = makeHandler({ handler, inputSchema});