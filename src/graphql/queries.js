import { gql } from 'apollo-boost';

export const GET_QUEUED_SONGS = gql`
    query getQueqedSongs {
        queue @client {
            id
            duration
            title
            artist
            thumbnail
            url
        }
    }
`

// export const GET_SONGS = gql`
//     query getSongs {
//         songs(order_by: {created_at: desc}) {
//             artist
//             created_at
//             duration
//             id
//             thumbnail
//             title
//             url
//         }
//     }
// `