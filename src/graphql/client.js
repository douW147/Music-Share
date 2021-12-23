import ApolloClient from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';

// const client = new ApolloClient({
//     uri: "https://music-share-douw147.hasura.app/v1/graphql",
//     headers: {
//         "x-hasura-admin-secret": "SFFPNkGh8ZHfNvBKImYMOTFfP1yS13BspXK8j7eK4tkXNRe0UAFlwUH4H7deYzVP" 
//     }
// });


const client = new ApolloClient({
    link: new WebSocketLink({
        
        uri: "wss://music-share-douw147.hasura.app/v1/graphql",
        options: {
            reconnect: true,
            connectionParams: {
                headers: {
                    "x-hasura-admin-secret": "SFFPNkGh8ZHfNvBKImYMOTFfP1yS13BspXK8j7eK4tkXNRe0UAFlwUH4H7deYzVP"
                }
              }
        }
    }),
    cache: new InMemoryCache(),
    
})


export default client;