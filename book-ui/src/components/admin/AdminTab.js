import React, { useState } from "react";
import { Tab } from "semantic-ui-react";
import UserTable from "./UserTable";
import BookTable from "./BookTable";
import ConversationTable from "./ConversationTable";

function AdminTab(props) {
  const { handleInputChange } = props;
  const {
    isUsersLoading,
    users,
    userUsernameSearch,
    handleDeleteUser,
    handleRoleChange,
    handleSearchUser,
  } = props;
  const {
    isBooksLoading,
    books,
    bookIsbn,
    bookTitle,
    bookTextSearch,
    handleAddBook,
    handleDeleteBook,
    handleSearchBook,
    conversations,
    allConversations,
  } = props;
  
   
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const [trigger, setTrigger] = useState(1)

  const handleTabChange = (e, { activeIndex }) => {
    setActiveTabIndex(activeIndex);

    if (activeIndex === 1) {
      setTrigger(prevTrigger => prevTrigger + 1);
      
    }
  };


  const panes = [
    {
      menuItem: { key: "users", icon: "users", content: "Users" },
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
      ),
    },
    {
      menuItem: { key: "conversation", icon: "book", content: "Conversations" },
      render: () => (
        <Tab.Pane>
          <ConversationTable
            conversations={conversations}
            allConversations={allConversations}
            bookIsbn={bookIsbn}
            books={books}
            bookTitle={bookTitle}
            bookTextSearch={bookTextSearch}
            handleInputChange={handleInputChange}
            handleAddBook={handleAddBook}
            handleDeleteBook={handleDeleteBook}
            handleSearchBook={handleSearchBook}
            activeTabIndex={activeTabIndex}
            trigger={trigger}

          />
        </Tab.Pane>
      ),
    },
    // {
    //   menuItem: { key: 'query', icon: '', content: 'Assistants' },
    //   render: () => (
    //     <Tab.Pane loading={isBooksLoading}>

    //     </Tab.Pane>
    //   )
    // }
  ];

  return (
    <Tab
      menu={{ attached: "top" }}
      panes={panes}
      activeIndex={activeTabIndex}
      onTabChange={handleTabChange}
    />
  );
}

export default AdminTab;
