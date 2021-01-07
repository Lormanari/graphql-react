import React, { useState } from 'react'
import { useApolloClient } from '@apollo/client';
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from "./components/LoginForm";
import Recommend from "./components/Recommend";
// import { useQuery } from '@apollo/client';
// import { ALL_AUTHORS } from './queries'
const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const client = useApolloClient()

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