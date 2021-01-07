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
query filterBooksByGenre($genre: String){
  allBooks(genre: $genre)  {
	title
	published
    author {
		name
		born
	}
	genres
  }
}
`

export const ME = gql`
query {
  me {
	username
	favoriteGenre
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
	author {
		name
		born
	}
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

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`