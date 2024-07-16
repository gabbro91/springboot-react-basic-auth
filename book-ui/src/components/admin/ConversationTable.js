import React, { useState } from 'react';
import { Button, Form, Grid, Image, Input, Table } from 'semantic-ui-react'
import BookForm from './BookForm'

function ConversationTable({ books, bookIsbn, bookTitle, bookTextSearch, handleInputChange, handleAddBook, handleDeleteBook, handleSearchBook, conversations }) {
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [showBooksTable, setShowBooksTable] = useState(false);

  const handleShowBooks = (conversationId) => {
    const booksForConversation = books.filter(book => book.conversation_uid === conversationId);
    console.log(booksForConversation)
    setSelectedBooks(booksForConversation);
    setShowBooksTable(true);
  };

  let bookList
  if (showBooksTable) {
    bookList = selectedBooks.map(book => (
      <Table.Row key={book.id}>
        <Table.Cell>{book.conversation_uid}</Table.Cell>
        <Table.Cell>{book.usermail}</Table.Cell>
        <Table.Cell>{book.title}</Table.Cell>
        <Table.Cell>{book.input}</Table.Cell>
      </Table.Row>
    ));
  } else {
    const seenConversationIds = new Set();
    bookList = conversations
      .filter(conversation => {
        if (seenConversationIds.has(conversation.conversation_uid)) {
          return false;
        } else {
          seenConversationIds.add(conversation.conversation_uid);
          return true;
        }
      })
    .map(conversations => {
      return (
        <Table.Row key={conversations.id}>
          <Table.Cell collapsing>
            <Button
              circular
              color='green'
              size='small'
              onClick={() => handleShowBooks(conversations.conversation_uid)}
            />
          </Table.Cell>
          <Table.Cell>
          <Table.Cell>{conversations.topic}</Table.Cell>
          </Table.Cell>
          <Table.Cell>{conversations.id}</Table.Cell>
          <Table.Cell>{conversations.timestamp}</Table.Cell>
        </Table.Row>
      )
    })
  }

  return (
    <>
      <Grid stackable divided>
        <Grid.Row columns='2'>
          <Grid.Column width='5'>
            <Form onSubmit={handleSearchBook}>
              <Input
                action={{ icon: 'search' }}
                name='bookTextSearch'
                placeholder='Search by User'
                value={bookTextSearch}
                onChange={handleInputChange}
              />
            </Form>
          </Grid.Column>
          <Grid.Column>
            <BookForm
              bookIsbn={bookIsbn}
              bookTitle={bookTitle}
              handleInputChange={handleInputChange}
              handleAddBook={handleAddBook}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Table compact striped selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1}/>
            <Table.HeaderCell width={1}>{showBooksTable? "User": "User"}</Table.HeaderCell>
            <Table.HeaderCell width={2}>{showBooksTable? "Input": "Conversation"}</Table.HeaderCell>
            <Table.HeaderCell width={8}>{showBooksTable? "Message": "Date"}</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {bookList}
        </Table.Body>
      </Table>
    </>
  )
}

export default ConversationTable