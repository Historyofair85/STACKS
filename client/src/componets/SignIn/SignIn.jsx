import { useState } from "react"
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from "../../utils/mutations"
import Auth from "../../utils/Auth"
import Button from "react-bootstrap/Button"
import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"
import Row from "react-bootstrap/Row"

// import './login.css'

export const SignIn = () => {
  const [formState, setFormState] = useState({ email: '', password: '' })
  const [login, { error, data }] = useMutation(LOGIN_USER);

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target

    setFormState({
      ...formState,
      [name]: value,
    })
  }

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault()
    try {
      const { data } = await login({
        variables: { ...formState },
      })

      Auth.login(data.login.token)
    } catch (e) {
      console.error(e)
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    })
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
      <Container classNam='container__form container--signup"'>
        <Row>
          <Form
            className="form"
            id="form2"
            onSubmit={handleFormSubmit}>
            <h1 className='form__title'>Log In</h1>
            <Form.Control
              placeholder="Your email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
            />
            <Form.Control
              placeholder="**********"
              name="password"
              type="password"
              value={formState.password}
              onChange={handleChange}
            />
            <div>
              <Button
                variant="outline-light"
                size="lg"
                type="submit"
                id="submit"
                onClick={handleFormSubmit}
                onChange={handleChange}>
                Enter
              </Button>
            </div>
          </Form>
        </Row>
      </Container>
    )
  }
  return (
    <>
      {renderForm()}
      {error && <div className='text-center text-danger fs-3 fw-bold'>{error.message}</div>}
    </>
  );
}
export default SignIn;