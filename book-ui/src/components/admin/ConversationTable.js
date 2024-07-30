import React, { useState } from "react";
import { Button, Form, Grid, Icon, Image, Input, Table } from "semantic-ui-react";
import BookForm from "./BookForm";

function ConversationTable({
  books,
  bookIsbn,
  bookTitle,
  bookTextSearch,
  handleInputChange,
  handleAddBook,
  handleDeleteBook,
  handleSearchBook,
  conversations,
  allConversations
}) {
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [showBooksTable, setShowBooksTable] = useState(false);
  const [showChatTable, setShowChatTable] = useState(false);
  const [selected, setSelected] = useState("");
  const [mex, setMex] = useState([]);
  const [num, setNum] = useState("");
  const [userConv, setUserConv] = useState([]);
  const [mainTable, setMainTable] = useState(true);

  const handleShowBooks = (conversationId) => {
    const booksForConversation = books.filter(
      (book) => book.conversation_uid === conversationId
    );
    setSelectedBooks(booksForConversation);
    setSelected(booksForConversation);
    setShowBooksTable(false);
    setShowChatTable(true);
    transformAndSetMessages(booksForConversation);
    console.log("selected-book",booksForConversation);

  };

  const handleShowConversations = (topic) => {
    const ConversationByUser = conversations.filter(
      (conversation) => conversation.topic === topic
    );
    setSelectedBooks(ConversationByUser);
    setUserConv(ConversationByUser);
    setShowBooksTable(true);
    setMainTable(false);
  };

  const handleBackClick = () => {
    setMainTable(true);
    setShowBooksTable(false);
    setShowChatTable(false);
  };

  const renderMessages = () => (
    <div style={{ padding: "10px" }}>
      <Icon name="arrow left"  style={{ color: '#00BFFF' }}/>
          <span
            style={{ cursor: "pointer", color: '#00BFFF' }}
            onClick={() => handleBackClick()}
          >
            Back
          </span>
      {selectedBooks.map((msg, index) => (
        <div key={index} style={{ marginBottom: "10px" }}>
          <div style={{ textAlign: "right", marginBottom: "5px" }}>
            <div
              style={{
                display: "inline-block",
                padding: "10px",
                borderRadius: "10px",
                backgroundColor: "#00BFFF",
                color: "white",
              }}
            >
              {msg.title}
            </div>
          </div>
          <div style={{ textAlign: "left", marginBottom: "5px" }}>
            <div
              style={{
                display: "inline-block",
                padding: "10px",
                borderRadius: "10px",
                backgroundColor: "#D3D3D3",
              }}
            >
              {msg.input}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
  const getLastTimestampForTopic = (topic) => {
    // Filtra le conversazioni per il topic specificato
    const filteredConversations = conversations.filter(
      (conversation) => conversation.topic === topic
    );
    // Trova l'ultima conversazione basata sul timestamp
    const lastConversation = filteredConversations[filteredConversations.length-1].timestamp 
    return lastConversation // Restituisci "N/A" se non ci sono conversazioni
  };

  const getLenghtForTopic = (topic) => {
    const seenUids = new Set();
    const filteredConversations = conversations.filter(
      (conversation) => {
        if (conversation.topic === topic && !seenUids.has(conversation.conversation_uid)) {
          seenUids.add(conversation.conversation_uid);
          return true;
        }
        return false;
      }
    );
    
    return filteredConversations.length;
  };

  const transformAndSetMessages = (data) => {
    const transformedArray = data.flatMap((obj) => [
      {
        props: {
          model: {
            message: obj.title,
            sentTime: "Just now",
            sender: "Assistant",
            direction: "outgoing",
            position: "single",
          },
        },
      },
      {
        props: {
          model: {
            message: obj.input,
            sentTime: "Just now",
            sender: "Assistant",
            direction: "incoming",
            position: "single",
          }
          
        },
      },
    ]);
    setMex(transformedArray);
  };

  let bookList;

  if (mainTable) {
    console.log("conv",conversations)
    bookList = allConversations.map((conversation) => (
      <Table.Row key={conversation.id}>
        <Table.Cell onClick={() => handleShowConversations(conversation.user)}>
          {conversation.user}
        </Table.Cell>
        <Table.Cell>{conversation.conversationCount}</Table.Cell>
        <Table.Cell>{getLastTimestampForTopic(conversation.user)}</Table.Cell>
      </Table.Row>
    ));
  } else if (showBooksTable) {
    const seenConversationIds = new Set();
    bookList = selectedBooks
      .filter((conversation) => {
        if (seenConversationIds.has(conversation.conversation_uid)) {
          return false;
        } else {
          seenConversationIds.add(conversation.conversation_uid);
          return true;
        }
      })
      .map((book) => (
        <Table.Row key={book.id}>
          <Table.Cell onClick={() => handleShowBooks(book.conversation_uid)}>
            {showBooksTable ? book.conversation_uid : book.conversation_uid}
          </Table.Cell>
          <Table.Cell>{showBooksTable ? book.title : book.title}</Table.Cell>
          <Table.Cell>
            {showBooksTable ? book.timestamp : book.input}
          </Table.Cell>
          <Table.Cell>
            {showBooksTable ? book.timestamp : book.input}
          </Table.Cell>
        </Table.Row>
      ));
  } 

  return (
    <>
      <Grid stackable divided>
        <Grid.Row columns="2">
          <Grid.Column width="5">
            <Form onSubmit={handleSearchBook}>
              <Input
                action={{ icon: "search" }}
                name="bookTextSearch"
                placeholder="Search by User"
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
        {!mainTable && (
          <Table style={{marginBottom:'50px'}} compact striped selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell
                  style={{ backgroundColor: "#ADD8E6" }}
                  width={4}
                >
                  {!showBooksTable ? "Username" : "Username"}
                </Table.HeaderCell>
                <Table.HeaderCell
                  style={{ backgroundColor: "#ADD8E6" }}
                  width={4}
                >
                  {!showBooksTable ? "Conversations" : "Conversations"}
                </Table.HeaderCell>
                <Table.HeaderCell
                  style={{ backgroundColor: "#ADD8E6" }}
                  width={4}
                >
                  {!showBooksTable ? "Conv-name" : "LastUpdate"}
                </Table.HeaderCell>
                <Table.HeaderCell
                  style={{ backgroundColor: "#ADD8E6" }}
                  width={8}
                >
                  {!showBooksTable ? "Date" : "#queries"}
                </Table.HeaderCell>
                <Table.HeaderCell
                  style={{ backgroundColor: "#ADD8E6" }}
                  width={2}
                >
                  {!showBooksTable ? "#queries" : ""}
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
            <Table.Cell >
            {showBooksTable ? selectedBooks[0].topic : selected[0].usermail}
          </Table.Cell>
          <Table.Cell >
          {showBooksTable ? getLenghtForTopic(selectedBooks[0].topic) : selected[0].conversation_uid}
          </Table.Cell>
          <Table.Cell >
          {showBooksTable ? selectedBooks[selectedBooks.length-1].timestamp : selected[0].title}
          </Table.Cell>
          <Table.Cell >
          {showBooksTable ? "" : selectedBooks[selectedBooks.length-1].timestamp}
          </Table.Cell>
          <Table.Cell >
          {showBooksTable ? "" : selected.length}
          </Table.Cell>
          
            </Table.Body>
          </Table>
        )}
      </Grid>
      {showChatTable && renderMessages()}

      {!showChatTable && (
         <><div style={{ marginBottom: "10px" }}>
          <Icon name="arrow left"  style={{ color: '#00BFFF' }}/>
          <span
            style={{ cursor: "pointer", color: '#00BFFF' }}
            onClick={() => handleBackClick()}
          >
            Back
          </span>
        </div><Table compact striped selectable>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={4}>
                  {showBooksTable ? "Conversations" : "Username"}
                </Table.HeaderCell>
                <Table.HeaderCell width={4}>
                  {showBooksTable ? "Conv-name" : "Conversations"}
                </Table.HeaderCell>
                <Table.HeaderCell width={4}>
                  {showBooksTable ? "Date" : "LastUpdate"}
                </Table.HeaderCell>
                <Table.HeaderCell width={8}>
                  {showBooksTable ? "#queries" : ""}
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>{bookList}</Table.Body>
          </Table>
          </>
      )}
    </>
  );
}

export default ConversationTable;
