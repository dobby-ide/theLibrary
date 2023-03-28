import author1 from '../assets/images/author1.jpg'
let authors:
  | 'Matteo Renga'
  | 'Francesco Trevisani'
  | 'Boris'
  | 'Maio Caio'
  | 'Mark Max'
  | 'Matthew Bond'
  | 'William Rebus'
  | 'Matieu Matieauius'
class Author {
  name: String
  photoUrl?: string
  constructor(name: typeof authors) {
    this.name = name
    if (name === 'Matteo Renga') {
      this.photoUrl = `${author1}`
    }
  }
}
export default Author
