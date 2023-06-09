import Book from '../model/book'
import Author from '../model/author'
import User from '../model/user'
//what relationship there is between the author and thebook? only at the time of creating a new book a new author can be added
export const books = [
  new Book(
    23456,
    'The alarm before 7am',
    'a story of an everyday life',
    'TRECCANI',
    [new Author('Matteo Renga'), new Author('Matieu Matieauius')],
    'real-life',
    2014
  ),
  new Book(
    23457,
    'The alarm before 8am',
    'a story of an everyday life 2',
    'Tregatti',
    [new Author('Matteo Renga'), new Author('Matieu Matieauius')],
    'real-life',
    2022
  ),
  new Book(
    23458,
    'The alarm before 9am',
    'a story of an everyday life3',
    'Marzian',
    [new Author('Matieu Matieauius')],
    'real-life',
    2023
  ),
  new Book(
    23459,
    'The alarm before 10am',
    'a story of an everyday life4',
    'merrer',
    [new Author('Matteo Renga')],
    'real-life',
    2021
  ),
  new Book(
    23460,
    'That was a false alarm',
    'A compilation of common mistakes that makes the compiler angry',
    'Oracle',
    [new Author('William Rebus'), new Author('Maio Caio')],
    'computer science',
    1990
  ),
  new Book(
    23461,
    'Beethoven',
    'All about Beethoven, since his early childhood',
    'Tregatti',
    [new Author('Matteo Renga'), new Author('Boris')],
    'bio',
    1980
  ),
  new Book(
    23462,
    'L.Torvalds',
    'To Linux 4.0',
    'Treccani',
    [new Author('Maio Caio'), new Author('Mark Max')],
    'bio',
    2023
  ),
  new Book(
    23463,
    'Football in practice',
    'dedicated schema and analysis',
    'Treccani',
    [new Author('Matteo Renga'), new Author('Matieu Matieauius')],
    'sport',
    2015
  ),
  new Book(
    23464,
    'Magic creatures in the deep space',
    'a fantastic story',
    'Treccani',
    [new Author('Matteo Renga')],
    'fantasy',
    2000
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
  new User('a', 'a', 'a', '1'),
  new User('Fabio', 'Privitera', 'fabioprivitera@integrify.io', '112233'),
  new User('Marco', 'Pantellaro', 'marpan@integrify.io', '112233'),
  new User('Giovanna', 'Pierpaolini', 'giopier@integrify.io', '112233'),
  new User('Fabio', 'Musini', 'famusini@integrify.io', '112233')
]
