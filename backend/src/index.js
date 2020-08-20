import '@babel/polyfill/noConflict'
import server from './server'

server.start({ port: process.env.PORT || 3030 }, () => {
    if (!process.env.PORT) { console.log("NodeJS Graphql API Started at http://localhost:3030") }
})