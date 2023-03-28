import Book from '../model/book'
import Author from '../model/author'
import User from '../model/user'
//what rrelationship there is between the author and thebook? only at the time of creating a new book a new author can be added
export const books = [
  new Book(
    23456,
    'The alarm before 7am',
    'a story of an everyday life',
    'TRECCANI',
    [new Author('Matteo Renga'), new Author('Matieu Matieauius')],
    'real-life'
  ),
  new Book(
    23457,
    'The alarm before 8am',
    'a story of an everyday life 2',
    'Tregatti',
    [new Author('Matteo Renga'), new Author('Matieu Matieauius')],
    'real-life'
  ),
  new Book(
    23458,
    'The alarm before 9am',
    'a story of an everyday life3',
    'Marzian',
    [new Author('Matieu Matieauius')],
    'real-life'
  ),
  new Book(
    23459,
    'The alarm before 10am',
    'a story of an everyday life4',
    'merrer',
    [new Author('Matteo Renga')],
    'real-life'
  ),
  new Book(
    23460,
    'That was a false alarm',
    'A compilation of common mistakes that makes the compiler angry',
    'Oracle',
    [new Author('William Rebus'), new Author('Maio Caio')],
    'computer science'
  ),
  new Book(
    23461,
    'Beethoven',
    'All about Beethoven, since his early childhood',
    'Tregatti',
    [new Author('Matteo Renga'), new Author('Boris')],
    'bio'
  ),
  new Book(
    23462,
    'L.Torvalds',
    'To Linux 4.0',
    'Treccani',
    [new Author('Maio Caio'), new Author('Mark Max')],
    'bio'
  ),
  new Book(
    23463,
    'Football in practice',
    'dedicated schema and analysis',
    'Treccani',
    [new Author('Matteo Renga'), new Author('Matieu Matieauius')],
    'sport'
  ),
  new Book(
    23464,
    'Magic creatures in the deep space',
    'a fantastic story',
    'Treccani',
    [new Author('Matteo Renga')],
    'fantasy'
  )
]

export const Authors = [
  new Author('Matteo Renga'),
  new Author('Francesco Trevisani'),
  new Author('Matieu Matieauius'),
  new Author('Boris'),
  new Author('William Rebus'),
  new Author('Matthew Bond'),
  new Author('Mark Max'),
  new Author('Maio Caio')
]

export const Users = [
  new User("Fabio", "Privitera", "fabioprivitera@integrify.io"),
  new User("Marco", "Pantellaro", "marpan@integrify.io"),
  new User("Giovanna", "Pierpaolini", "giopier@integrify.io"),
  new User("Fabio", "Musini", "famusini@integrify.io"),
]
