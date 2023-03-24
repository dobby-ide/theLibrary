import Book from './book'

function uniqueID() {
  return Math.floor(Math.random() * Date.now()).toString()
}

class User {
  id: string = uniqueID()
  firstName: string
  lastName: string
  email: string
  booksBorrowed: Book[] = []

  constructor(firstName: string, lastName: string, email: string) {
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
  }
}
export default User
