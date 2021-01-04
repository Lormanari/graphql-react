import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
query {
  allAuthors  {
	name
	id
    born
    bookCount
  }
}
`

export const ALL_BOOKS = gql`
query {
  allBooks  {
	title
	published
    author
  }
}
`

export const CREATE_BOOK = gql`
mutation addBook($title: String!, $published: Int!, $author: String!, $genres: [String!]) {
  addBook(
	title: $title,
    published: $published,
    author: $author,
    genres: $genres
  ) {
    title
    published
    id
	author
	genres
  }
}
`

export const EDIT_BIRTHYEAR = gql`
  mutation editAuthor($name: String!, $born: Int!) {
    editAuthor(name: $name, born: $born)  {
      name
	  born
	  bookCount
      id
    }
  }
`