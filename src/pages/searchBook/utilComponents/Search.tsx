// @ts-nocheck
import { useState, useEffect } from 'react'

import classes from '../styling/Search.module.scss'

const Search = (props: { books: any; back: any; updatedBooks: any }) => {
  const [term, setTerm] = useState('')
  const filteredResult: [] = props.books.filter(({ title }) =>
    title.toLowerCase().includes(term.toLowerCase())
  )

  useEffect(() => {
    const handler = setTimeout(() => {
      if (!filteredResult.length < 1) {
        props.back(filteredResult)
      }
    }, 1500)
    return () => {
      clearTimeout(handler)
    }
  }, [term])

  return (
    <div>
      <div className="ui form">
        <div className="field">
          <input
            placeholder="enter book name"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            className={classes.input}
          />
        </div>
      </div>
    </div>
  )
}
export default Search
