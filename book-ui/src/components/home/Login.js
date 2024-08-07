import React, { useState } from 'react'
import { NavLink, Navigate } from 'react-router-dom'
import { Button, Form, Grid, Segment, Message } from 'semantic-ui-react'
import { useAuth } from '../context/AuthContext'
import { bookApi } from '../misc/BookApi'
import { handleLogError } from '../misc/Helpers'

function Login() {
  const Auth = useAuth()
  const isLoggedIn = Auth.userIsAuthenticated()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isError, setIsError] = useState(false)
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const handleInputChange = (e, { name, value }) => {
    if (name === 'username') {
      setUsername(value)
    } else if (name === 'password') {
      setPassword(value)
    }
  }


  const handlePasswordVisibilityToggle = () => {
    setIsPasswordVisible(!isPasswordVisible)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!(username && password)) {
      setIsError(true)
      return
    }

    try {
      const response = await bookApi.authenticate(username.toLowerCase(), password)
      const { id, name, role } = response.data
      const authdata = window.btoa(username + ':' + password)
      const authenticatedUser = { id, name, role, authdata }

      Auth.userLogin(authenticatedUser)

      setUsername('')
      setPassword('')
      setIsError(false)
    } catch (error) {
      handleLogError(error)
      setIsError(true)
    }
  }

  if (isLoggedIn) {
    return <Navigate to={'/'} />
  }

  return (
    <Grid textAlign='center'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Form size='large' onSubmit={handleSubmit}>
          <Segment>
            <Form.Input
              fluid
              autoFocus
              name='username'
              icon='user'
              iconPosition='left'
              placeholder='Username'
              value={username}
              onChange={handleInputChange}
            />
            <Form.Input
              fluid
              name='password'
              icon={{
                name: isPasswordVisible ? 'eye' : 'lock',
                link: true,
                onClick: handlePasswordVisibilityToggle
              }}
              iconPosition='left'
              placeholder='Password'
              type={isPasswordVisible ? 'text' : 'password'}
              value={password}
              onChange={handleInputChange}
            />
            <Button color='blue' fluid size='large'>Login</Button>
          </Segment>
        </Form>
        {/* <Message>{`Don't have already an account? `}
          <NavLink to="/signup" as={NavLink} color='teal'>Sign Up</NavLink>
        </Message> */}
        {isError && <Message negative>The username or password provided are incorrect!</Message>}
      </Grid.Column>
    </Grid>
  )
}

export default Login