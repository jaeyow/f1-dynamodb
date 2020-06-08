const middy = require('middy')
const { jsonBodyParser, validator, httpErrorHandler } = require('middy/middlewares')

const makeHandler = ({ handler, inputSchema }) => middy(handler)
  .use(jsonBodyParser())
  .use(validator({inputSchema}))
  .use(httpErrorHandler())

module.exports = { makeHandler }