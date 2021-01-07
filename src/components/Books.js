import React, {useState, useEffect} from 'react'
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const [books, setBooks] = useState([])
  const [genre, setGenre] = useState('')

  const booksResult = useQuery(ALL_BOOKS)


  useEffect(() => {
	if (booksResult.data) {
		setBooks(booksResult.data.allBooks)
	}
}, [booksResult])  // eslint-disable-line

  if (!props.show) {
    return null
  }
  if (booksResult.loading)  {
    return <div>loading...</div>
  }

  const genres = booksResult.data.allBooks.map(b => b.genres).flat()
  const genresUnique = [...new Set(genres)]


  const filterByGenre = (genre) => {
	const filteredBooks = (booksResult.data.allBooks.filter(b => b.genres.includes(genre)))
	setBooks(filteredBooks)
	setGenre(genre)
  }

  const setToAllGenres = () => {
	setBooks(booksResult.data.allBooks)
	setGenre('')
  }


  return (
    <div>
      <h2>books</h2>
       {genre? <p>in genre {genre}</p> : null}
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
	  {genresUnique.map(g => <button key={g} onClick={() => filterByGenre(g)}>{g}</button>)}
	  <button key="all genres" onClick={setToAllGenres}>all genres</button>
    </div>
  )
}

export default Books