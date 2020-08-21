import 'cross-fetch/polyfill'
import '@babel/polyfill'
import ApolloBoost, { gql } from 'apollo-boost'

const client = new ApolloBoost({
    uri: "http://localhost:3030"
})

describe('USER', () => {
    test('This is my first test case', async () => {
        const createUserPayload = gql`
            mutation {
                createUser(data:{
                    name: "Test User 1"
                    username: "testusername"
                    email: "testemail@gmail.com"
                    password: "testpassword"
                    avatar: "test image url"
                }) {
                    token
                    user {
                        name
                        username
                        email
                        password
                        avatar
                    }
                }
            }
        `

        const createdUser = await client.mutate({ mutation: createUserPayload })

    })

    test('This is my second test case', async () => {

    })

    test('This is my third test case', async () => {

    })
})
