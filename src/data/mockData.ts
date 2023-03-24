import Book from '../model/book'
import Author from '../model/author'
import User from '../model/user'
//what rrelationship there is between the author and thebook? only at the time of creating a new book a new author can be added
export const books = [
  new Book(23456, 'The alarm before 7am', 'a story of an everyday life', 'TRECCANI', [
    'PierPaolo Pasolini',
    'Frank Johnson'
  ]),
  new Book(23457, 'The alarm before 8am', 'a story of an everyday life 2', 'TREgatti', [
    'Matieu Matieauius'
  ]),
  new Book(23458, 'The alarm before 9am', 'a story of an everyday life3', 'Marzian', [
    'Boris Biros'
  ]),
  new Book(23459, 'The alarm before 10am', 'a story of an everyday life4', 'merrer', [
    'Daniel Trevisan'
  ]),
  new Book(
    23460,
    'That was a false alarm',
    'A compilation of common mistakes that makes the compiler angry',
    'Oracle',
    ['Daniel Trevisan', 'Matieu Matieauius']
  )
]

export const Authors = [
  new Author('PierPaolo Pasolini'),
  new Author('Frank Johnson'),
  new Author('Matieu Matieauius'),
  new Author('Boris Biros'),
  new Author('Daniel Trevisan')
]

export const Users = [
  new User("Fabio", "Privitera", "fabioprivitera@integrify.io"),
  new User("Marco", "Pantellaro", "marpan@integrify.io"),
  new User("Giovanna", "Pierpaolini", "giopier@integrify.io"),
  new User("Fabio", "Musini", "famusini@integrify.io"),
]
