class User {
  id: number = Math.floor(Math.random() * 100000)
  firstName: string
  lastName: string
  email: string

  constructor(firstName: string, lastName: string, email: string) {
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
  }
}
export default User
