import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import AuthContext from '../context/AuthContext'
import { bookApi } from '../misc/BookApi'
import AdminTab from './AdminTab'

class AdminPage extends Component {
  static contextType = AuthContext

  state = {
    users: [],
    books: [],
    bookIsbn: '',
    bookTitle: '',
    bookTextSearch: '',
    userUsernameSearch: '',
    isAdmin: true,
    isUsersLoading: false,
    isBooksLoading: false,
  }

  componentDidMount() {
    const Auth = this.context
    const user = Auth.getUser()
    const isAdmin = user.role === 'ADMIN'
    this.setState({ isAdmin })

    this.handleGetUsers()
    this.handleGetBooks()
  }

  handleInputChange = (e) => {
    const { id, value } = e.target
    this.setState({ [id]: value })
  }

  handleGetUsers = () => {
    const Auth = this.context
    const user = Auth.getUser()

    this.setState({ isUsersLoading: true })
    bookApi.getUsers(user)
      .then(response => {
        this.setState({ users: response.data })
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        this.setState({ isUsersLoading: false })
      })
  }

  handleDeleteUser = (username) => {
    const Auth = this.context
    const user = Auth.getUser()

    bookApi.deleteUser(user, username)
      .then(() => {
        this.handleGetUsers()
      })
      .catch(error => {
        console.log(error)
      })
  }

  handleSearchUser = () => {
    const Auth = this.context
    const user = Auth.getUser()

    const username = this.state.userUsernameSearch
    bookApi.getUsers(user, username)
      .then(response => {
        if (response.status === 200) {
          const data = response.data;
          const users = data instanceof Array ? data : [data]
          this.setState({ users })
        } else {
          this.setState({ users: [] })
        }
      })
      .catch(error => {
        console.log(error)
        this.setState({ users: [] })
      })
  }

  handleGetBooks = () => {
    const Auth = this.context
    const user = Auth.getUser()

    this.setState({ isBooksLoading: true })
    bookApi.getBooks(user)
      .then(response => {
        this.setState({ books: response.data })
      })
      .catch(error => {
        console.log(error)
      })
      .finally(() => {
        this.setState({ isBooksLoading: false })
      })
  }

  handleDeleteBook = (isbn) => {
    const Auth = this.context
    const user = Auth.getUser()

    bookApi.deleteBook(user, isbn)
      .then(() => {
        this.handleGetBooks()
      })
      .catch(error => {
        console.log(error)
      })
  }

  handleAddBook = () => {
    const Auth = this.context
    const user = Auth.getUser()

    const { bookIsbn, bookTitle } = this.state
    if (!(bookIsbn && bookTitle)) {
      return
    }

    const book = { isbn: bookIsbn, title: bookTitle }
    bookApi.addBook(user, book)
      .then(() => {
        this.clearBookForm()
        this.handleGetBooks()
      })
      .catch(error => {
        console.log(error)
      })
  }

  handleSearchBook = () => {
    const Auth = this.context
    const user = Auth.getUser()

    const text = this.state.bookTextSearch
    bookApi.getBooks(user, text)
      .then(response => {
        if (response.status === 200) {
          const data = response.data;
          const books = data instanceof Array ? data : [data]
          this.setState({ books })
        } else {
          this.setState({ books: [] })
        }
      })
      .catch(error => {
        console.log(error)
        this.setState({ books: [] })
      })
  }

  clearBookForm = () => {
    this.setState({
      bookIsbn: '',
      bookTitle: ''
    })
  }

  render() {
    if (!this.state.isAdmin) {
      return <Redirect to='/' />
    } else {
      const { isUsersLoading, users, userUsernameSearch, isBooksLoading, books, bookIsbn, bookTitle, bookTextSearch } = this.state
      return (
        <Container>
          <AdminTab
            isUsersLoading={isUsersLoading}
            users={users}
            userUsernameSearch={userUsernameSearch}
            handleDeleteUser={this.handleDeleteUser}
            handleSearchUser={this.handleSearchUser}
            isBooksLoading={isBooksLoading}
            books={books}
            bookIsbn={bookIsbn}
            bookTitle={bookTitle}
            bookTextSearch={bookTextSearch}
            handleAddBook={this.handleAddBook}
            handleDeleteBook={this.handleDeleteBook}
            handleSearchBook={this.handleSearchBook}
            handleInputChange={this.handleInputChange}
          />
        </Container>
      )
    }
  }
}

export default AdminPage