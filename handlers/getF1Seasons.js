const { makeHandler } = require('./utils')
const { getF1Seasons } = require('../data')
const { F1Season } = require('../entities')

const handler = async event => {
  const { seasons, error } = await getF1Seasons()
  const statusCode = error ? 500 : 200
  const body = error ? JSON.stringify({ error }) : JSON.stringify({ seasons })
  return {
    statusCode,
    body
  }
}

module.exports.handler = makeHandler({ handler })