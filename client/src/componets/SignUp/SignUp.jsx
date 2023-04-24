import { useState } from "react"
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from "../../utils/mutations"
import Auth from '../../utils/Auth'
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"

// import './login.css'

export const SignUp = () => {

  const [formState, setFormState] = useState({ username: '', email: '', password: '', })
  const [addUser, { error, data }] = useMutation(ADD_USER);


  const handleChange = (event) => {
    const { name, value } = event.target

    setFormState({
      ...formState,
      [name]: value,
    })
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault()

    try {
      const { data } = await addUser({
        variables: { ...formState },
      })

      Auth.login(data.addUser.token)
    } catch (error) {
      console.error(error)
    }
  }
  const renderForm = () => {
    if (data) {
      return (
        <p>
          Success! You may now head{' '}
          <Link to="/">back to the homepage.</Link>
        </p>
      )
    }
    return (
      <Container className='container__form container--signup'
      >
        <Row>
          <Form
            onSubmit={handleFormSubmit}
            className="form"
            id="form1">
            <h1 className="form__title">Sign Up</h1>
            <Form.Control
              placeholder="Username"
              name="username"
              type="text"
              value={formState.name}
              onChange={handleChange}
            />
            <Form.Control
              placeholder="Email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
            />
            <Form.Control
              placeholder="Password"
              name="password"
              type="password"
              value={formState.password}
              onChange={handleChange}
            />
            <Button
              className="btn"
              variant="outline-light"
              size="lg"
              type="submit"
              id="submit"
              onClick={handleFormSubmit}
              onChange={handleChange}>
              Enter
            </Button>
          </Form>
        </Row>
      </Container >
    )
  }
  return (
    <>
      {renderForm()}
      {error && <div className='text-center text-danger fs-3 fw-bold'>{error.message}</div>}
    </>
  );
};

export default SignUp;
