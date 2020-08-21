require('@babel/register')
require('@babel/polyfill')
const server = require('../../src/server').default

const globalSetup = async () => {
    global.httpServer = await server.start({ port: 3030 })
}

module.exports = globalSetup 