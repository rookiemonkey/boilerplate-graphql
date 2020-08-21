const globalTeardown = async () => {
    await global.httpServer.close()
}

module.exports = globalTeardown 