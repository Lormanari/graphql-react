import React, { useState, useRef } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import Select from 'react-select'
import { EDIT_BIRTHYEAR, ALL_AUTHORS } from '../queries'

const SetBirthyear = (props) => {
  const [name, setName] = useState(null)
  const [born, setBorn] = useState('')

  const authorsResult = useQuery(ALL_AUTHORS)
  const authors = authorsResult.data.allAuthors

  const [ changeBirthyear ] = useMutation(EDIT_BIRTHYEAR)

  const selectInputRef = useRef();

  const submit = async (event) => {
	event.preventDefault()

	changeBirthyear({variables: {name, born} })

    setName(null)
    setBorn('')

	selectInputRef.current.select.clearValue();
  }

//   useEffect(() => {
//     if (result.data && result.data.editNumber === null) {
//       setError('person not found')
//     }
//   }, [result.data])  // eslint-disable-line


const options = authors.map(a => ({value: a.name, label: a.name}))

  return (
    <div>
	<h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
		  <Select ref={selectInputRef} options={options} defaultValue={name} onChange={(event) => {if(event&&event.value){setName(event.value)}}}
/>
        </div>

        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>

        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default SetBirthyear