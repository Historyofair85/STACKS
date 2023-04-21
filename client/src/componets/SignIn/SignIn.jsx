import { useState } from "react"
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from "../../utils/mutations"
import Auth from "../../utils/Auth"

export const SignIn = ({ hidden }) => {
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
      <div className={(hidden ? "right-panel-active" : null) + " container__form container--signup"
      }>
        <form action="#" className="form" id="form2">
          <h2 className="form__title">Sign In</h2>
          <input type="username" placeholder="username" className="input" onChange={handleChange} />
          <input type="password" placeholder="Password" className="input" onChange={handleChange} />
          <button className="btn" onClick={handleFormSubmit} onChange={handleChange}>Sign In</button>
        </form>
      </div>
    )
  }
  return (
    <>
      {renderForm()}
      {error && <div className='text-center text-danger fs-3 fw-bold'>{error.message}</div>}
    </>
  );
}