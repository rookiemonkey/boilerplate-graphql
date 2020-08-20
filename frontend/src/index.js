import ApolloBoost, { gql } from 'apollo-boost'

const client = new ApolloBoost({
    // uri of the nodejs graphql instance
    uri: "http://localhost:3030/"
})

const queryUsers = gql`
    query {
        users {
            id
            name
            email
            password
        }
    }
`

client.query({ query: queryUsers })
    .then(response => {
        let html = ``

        response.data.users.forEach(user => {
            html += `
            <div>
                <h2>${user.name}</h2>
            </div>
            `
        })

        document.querySelector("#users").innerHTML = html
    })