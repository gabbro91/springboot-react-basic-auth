import React from 'react'
import { NavLink } from 'react-router-dom'
import { Form, Button, Input, Table, Select, Icon } from 'semantic-ui-react'

function UserTable({ users, userUsernameSearch, handleInputChange, handleDeleteUser, handleSearchUser, handleRoleChange }) {
  const roleOptions = [
    { key: 'user', text: 'User', value: 'USER' },
    { key: 'admin', text: 'Admin', value: 'ADMIN' }
  ]
  let userList
  if (users.length === 0) {
    userList = (
      <Table.Row key='no-user'>
        <Table.Cell collapsing textAlign='center' colSpan='6'>No user</Table.Cell>
      </Table.Row>
    )
  } else {
    userList = users.map(user => {
      return (
        <Table.Row key={user.id}>
          <Table.Cell collapsing>
            <Button
              circular
              color='red'
              size='small'
              icon='trash'
              disabled={user.username === 'delgrosso'}
              onClick={() => handleDeleteUser(user.username)}
            />
          </Table.Cell>
          <Table.Cell>{user.id}</Table.Cell>
          <Table.Cell>{user.username}</Table.Cell>
          <Table.Cell>{user.name}</Table.Cell>
          <Table.Cell>{user.email}</Table.Cell>
          <Table.Cell>{user.role}</Table.Cell>
          
          <Select
              options={roleOptions}
              value={roleOptions.find(option => option.value === user.role)}
              onChange={(e, { value }) => handleRoleChange(user.username, value)}
              disabled={user.username === 'delgrosso'}
              />
        </Table.Row>
      )
    })
  }

  return (
    <>
      <Form onSubmit={handleSearchUser}>
        <Input
          action={{ icon: 'search' }}
          name='userUsernameSearch'
          placeholder='Search by Username'
          value={userUsernameSearch}
          onChange={handleInputChange}
        />
      </Form>
      {/* <Button icon labelPosition='right'>
          Create<Icon name='add' />
        </Button> */}
        <NavLink to="/signup" color='teal'>Create User</NavLink>
      <Table compact striped selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1}/>
            <Table.HeaderCell width={1}>ID</Table.HeaderCell>
            <Table.HeaderCell width={3}>Username</Table.HeaderCell>
            <Table.HeaderCell width={4}>Name</Table.HeaderCell>
            <Table.HeaderCell width={5}>Email</Table.HeaderCell>
            <Table.HeaderCell width={2}>Role</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {userList}
        </Table.Body>
      </Table>
    </>
  )
}

export default UserTable