import React from 'react'
import { useParams } from 'react-router-dom'
const SearchBookDetail = ({ books }) => {
  const params = useParams()

  return (
    <>
      <h1>book detail page</h1>
      <p>{params.bookID}</p>
    </>
  )
}
export default SearchBookDetail
