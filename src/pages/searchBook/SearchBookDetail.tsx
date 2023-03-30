import { useParams } from 'react-router-dom'

import classes from './styling/SearchBookDetail.module.scss'
import Book from '../../model/book'

const SearchBookDetail = (props:{ book:Book[] }) => {
  const params = useParams()
  const [filteredResult] = props.book.filter((book) => String(book.ISBN) === String(params.bookID))

  return (
    <section className={classes.bookDetail_container}>
      <div className={classes.card}>
        <div className={classes.card__side_front}>
          <h1>{filteredResult.title}</h1>
          <p>{filteredResult.description}</p>
          <p>
            {filteredResult.authors.map((author) => (
              <span>{author.name} </span>
            ))}
          </p>
          <p>{filteredResult.category}</p>
          <p>{filteredResult.publisher}</p>
          <p>{filteredResult.status}</p>
        </div>
        <div className={classes.card__side_back}>
          {filteredResult.authors[0].photoUrl ? (
            <img src={filteredResult.authors[0].photoUrl} className={classes.authorImage}></img>
          ) : (
            <span className={classes.nophotoAvailable}>no photo available</span>
          )}
        </div>
      </div>
    </section>
  )
}
export default SearchBookDetail
