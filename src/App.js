import React, { useState } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client';
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from "./components/LoginForm";
import Recommend from "./components/Recommend";
import { ALL_BOOKS, BOOK_ADDED } from './queries'
// import { useQuery } from '@apollo/client';
// import { ALL_AUTHORS } from './queries'
const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const client = useApolloClient()

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map(b => b.id).includes(object.id)

	const dataInStore = client.readQuery({ query: ALL_BOOKS })

    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks : dataInStore.allBooks.concat(addedBook) }
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
	  const addedBook = subscriptionData.data.bookAdded
	  window.alert(`${addedBook.title} added`);
	  updateCacheWith(addedBook)
    }
  })

  const logout = () => {
	setToken(null)
	setPage('authors')
    localStorage.clear()
	client.resetStore()
  }
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
		{
			token ?
			<><button onClick={() => setPage('add')}>add book</button>
			<button onClick={() => setPage('recommend')}>recommend</button>
			<button onClick={logout}>logout</button>
			</>
			: <button onClick={() => setPage('login')}>login</button>
		}

      </div>

      <Authors
        show={page === 'authors'}
		token={token}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
		updateCacheWith={updateCacheWith}
      />
	  {token? <Recommend
        show={page === 'recommend'}
      /> : null}

	  {page==='login' && !token?
	  <div>
		<h2>Login</h2>
		<LoginForm
		  setToken={setToken}
		  setPage={setPage}
		/>
	  </div>
	  : null}

    </div>
  )
}

export default App