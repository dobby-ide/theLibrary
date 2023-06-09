import Author from './author'
import cslogo from '../assets/images/cslogo.svg'
import rllogo from '../assets/images/rllogo.svg'
import biologo from '../assets/images/biologo.svg'
import falogo from '../assets/images/falogo.svg'
import splogo from '../assets/images/splogo.svg'
import User from './user'
export type Category = 'fantasy' | 'bio' | 'sport' | 'real-life' | 'computer science'

class Book {
  ISBN: number
  title: string
  description: string
  publisher: string
  authors: Author[]
  status = 'Available'
  borrowerId?: User['id']
  returnDate?: string
  category: Category
  year: number
  imageUrl?: string
  constructor(
    ISBN: number,
    title: string,
    description: string,
    publisher: string,
    authors: Author[],
    category: Category,
    year: number,
    review?: [{ positive: number; negative: number }]
  ) {
    this.ISBN = ISBN
    this.title = title
    this.description = description
    this.publisher = publisher
    this.authors = authors
    this.status === 'Available'
    this.category = category
    this.year = year
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
