import React, { useState, useEffect } from 'react'
import classes from '../styling/Search.module.scss'
const Search = ({ books, back }) => {
  const [term, setTerm] = useState('')

  const filteredResult = books.filter(({ title }) =>
    title.toLowerCase().includes(term.toLowerCase())
  )

  useEffect(() => {
    const handler = setTimeout(() => {
      if (!filteredResult.length < 1) {
        back(filteredResult)
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
