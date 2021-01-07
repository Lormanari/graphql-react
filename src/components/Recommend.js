import React, {useState, useEffect} from 'react'
import { useQuery, useLazyQuery } from '@apollo/client';
import { ALL_BOOKS, ME } from '../queries'

const Recommend = (props) => {

//   const booksResult = useQuery(ALL_BOOKS)
  const userResult = useQuery(ME)
  const [getBooks, result] = useLazyQuery(ALL_BOOKS)
  const [books, setBooks] = useState(null)

  useEffect(() => {
    if (result.data) {
		setBooks(result.data.allBooks)
    }
  }, [result])

  useEffect(() => {
    if (userResult.data) {
		getBooks({ variables: { genre: userResult.data.me.favoriteGenre } })
    }
  }, [userResult]) // eslint-disable-line

  if (!props.show) {
    return null
  }
  if (userResult.loading)  {
    return <div>loading...</div>
  }

  const user = userResult.data.me

// const filteredBooks = (booksResult.data.allBooks.filter(b => b.genres.includes(user.favoriteGenre)))



  return (
    <div>
      <h2>books</h2>
       {user.favoriteGenre? <p>books in your favorate genre {user.favoriteGenre}</p> : null}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {books.map(a =>
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  )
}

export default Recommend