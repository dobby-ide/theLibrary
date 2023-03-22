import Author from './author'

class Book {
  ISBN: number
  title: string
  description: string
  publisher: string
  authors: [string]
  status: string = 'Available'
  borrowerId?: number
  returnDate?: string
  constructor(
    ISBN: number,
    title: string,
    description: string,
    publisher: string,
    authors: [string]
  ) {
    this.ISBN = ISBN
    this.title = title
    this.description = description
    this.publisher = publisher
    this.authors = authors
  }
}
export default Book
