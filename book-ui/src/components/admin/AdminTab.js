import React from 'react'
import { Tab } from 'semantic-ui-react'
import UserTable from './UserTable'
import BookTable from './BookTable'
import ConversationTable from './ConversationTable'

function AdminTab(props) {
  const { handleInputChange } = props
  const { isUsersLoading, users, userUsernameSearch, handleDeleteUser, handleRoleChange, handleSearchUser } = props
  const { isBooksLoading, books, bookIsbn, bookTitle, bookTextSearch, handleAddBook, handleDeleteBook, handleSearchBook, conversations } = props

  const panes = [
    {
      menuItem: { key: 'users', icon: 'users', content: 'Users' },
      render: () => (
        <Tab.Pane loading={isUsersLoading}>
          <UserTable
            users={users}
            userUsernameSearch={userUsernameSearch}
            handleInputChange={handleInputChange}
            handleDeleteUser={handleDeleteUser}
            handleSearchUser={handleSearchUser}
            handleRoleChange={handleRoleChange}
          />
        </Tab.Pane>
      )
    },
    {
      menuItem: { key: 'books', icon: 'book', content: 'Query' },
      render: () => (
        <Tab.Pane loading={isBooksLoading}>
          <BookTable
            books={books}
            bookIsbn={bookIsbn}
            bookTitle={bookTitle}
            bookTextSearch={bookTextSearch}
            handleInputChange={handleInputChange}
            handleAddBook={handleAddBook}
            handleDeleteBook={handleDeleteBook}
            handleSearchBook={handleSearchBook}
          />
        </Tab.Pane>
      )
    },
    {
      menuItem: { key: 'conversation', icon: 'book', content: 'Conversations' },
      render: () => (
        <Tab.Pane>
          <ConversationTable
            conversations={conversations}
            bookIsbn={bookIsbn}
            books={books}
            bookTitle={bookTitle}
            bookTextSearch={bookTextSearch}
            handleInputChange={handleInputChange}
            handleAddBook={handleAddBook}
            handleDeleteBook={handleDeleteBook}
            handleSearchBook={handleSearchBook}
          />
        </Tab.Pane>
      )
    }
  ]

  return (
    <Tab menu={{ attached: 'top' }} panes={panes} />
  )
}

export default AdminTab