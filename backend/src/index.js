import '@babel/polyfill/noConflict'
import server from './server'

server.start({ port: process.env.PORT || 3030 }, () => {
    console.log("NodeJS Graphql API Started")
})