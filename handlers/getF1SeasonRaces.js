const { makeHandler } = require('./utils')
const { getF1SeasonRaces } = require('../data')
const { Race } = require('../entities')

const inputSchema = {
  type: 'object',
  properties: {
    pathParameters: {
      type: 'object',
      properties: {
        season: { type: 'string' }
      },
      required: [ 'season' ]
    }
  },
  required: [ 'pathParameters' ]
};

const handler = async event => {
  const race_obj = new Race({
    season: event.pathParameters.season,
  })
  const { races, error } = await getF1SeasonRaces({race: race_obj});
  const statusCode = error ? 500 : 200;
  const body = error ? JSON.stringify({ error }) : JSON.stringify({ races });
  return {
    statusCode,
    body
  };
};

module.exports.handler = makeHandler({ handler, inputSchema});