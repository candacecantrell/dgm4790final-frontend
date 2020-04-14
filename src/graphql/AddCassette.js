import gql from 'graphql-tag'

export const CREATE_CASSETTE=gql`
mutation createCassette ($artist: String, $genre: String!, $price: Float, $title: String!) {
  createCassette (
    artist: $artist,
    genre: $genre,
    price: $price,
    title: $title,
  )
}`