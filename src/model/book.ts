import Author from './author'
import cslogo from '../assets/images/cslogo.svg'
import rllogo from '../assets/images/rllogo.svg'
import biologo from '../assets/images/biologo.svg'
import falogo from '../assets/images/falogo.svg'
import splogo from '../assets/images/splogo.svg'
let Category: 'fantasy' | 'bio' | 'sport' | 'real-life' | 'computer science'

class Book {
  ISBN: number
  title: string
  description: string
  publisher: string
  authors: typeof Author
  status: string = 'Available'
  borrowerId?: number
  returnDate?: string
  category: typeof Category
  imageUrl?: string
  constructor(
    ISBN: number,
    title: string,
    description: string,
    publisher: string,
    authors: typeof Author,
    category: typeof Category
  ) {
    this.ISBN = ISBN
    this.title = title
    this.description = description
    this.publisher = publisher
    this.authors = authors
    this.category = category
    if (category === 'computer science') {
      this.imageUrl = `${cslogo}`
    }
    if (category === 'real-life') {
      this.imageUrl = `${rllogo}`
    }
    if (category === 'bio') {
      this.imageUrl = `${biologo}`
    }
    if (category === 'sport') {
      this.imageUrl = `${splogo}`
    }
    if (category === 'fantasy') {
      this.imageUrl = `${falogo}`
    }
  }
}
export default Book
