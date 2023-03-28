import React, { useEffect, useState } from 'react'
import classes from '../styling/Filter.module.scss'

const Filter = ({ books, results }) => {
  const [categoryChoice, setCategoryChoice] = useState('')
  const categories = books.map((book) => book.category)
  const uniqueCategories = [...new Set(categories)]
  console.log(uniqueCategories)
  const onSelectCategory = (e) => {
    setCategoryChoice(e.target.value)
  }
  const filteredResults = books.filter((book) => book.category === categoryChoice)
  useEffect(() => {
    results(filteredResults)
  }, [categoryChoice])
  return (
    <div className={classes.switch}>
      <div className={classes.switch__main}>
        <p className={classes.switch__main_paragraph}>choose a category:</p>
        <select onChange={onSelectCategory} className={classes.switch__dropdown}>
          <option defaultValue=""></option>
          {uniqueCategories.map((cat) => {
            return (
              <option key={cat} value={cat}>
                {cat}
              </option>
            )
          })}
        </select>
      </div>
    </div>
  )
}
export default Filter
