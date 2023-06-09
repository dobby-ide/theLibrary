// @ts-nocheck
import { useEffect, useState } from 'react'

import classes from './style/Filter.module.scss'

const Filter = (props: { books: []; results: () => void }) => {
  const [categoryChoice, setCategoryChoice] = useState('')
  const categories = props.books.map((book) => {
    if (book.category != null) {
      return book.category.categoryName
    }
    return null // or any other value you prefer for the null case
  })
  const uniqueCategories = [...new Set(categories)]

  const onSelectCategory = (e) => {
    setCategoryChoice(e.target.value)
  }

  const filteredResults = props.books.filter((book) => {
    if (book.category != null) {
      return book.category.categoryName === categoryChoice
    }
  })

  useEffect(() => {
    categoryChoice !== '' ? props.results(filteredResults) : props.results(props.books)
  }, [categoryChoice])

  return (
    <div className={classes.switch}>
      <div className={classes.switch__main}>
        <p className={classes.switch__main_paragraph}>category:</p>
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
