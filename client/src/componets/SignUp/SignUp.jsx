import { useState } from "react"
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from "../../utils/mutations"
import Auth from '../../utils/Auth'


export const SignUp = ({ hidden }) => {

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
      <div className={(hidden ? "right-panel-active" : null) + " container__form container--signup"
      }>
        <form action="#" className="form" id="form1">
          <h2 className="form__title">Sign Up</h2>
          <input type="username" placeholder="User" className="input" onChange={handleChange} />
          <input type="email" placeholder="Email" className="input" onChange={handleChange} />
          <input type="password" placeholder="Password" className="input" onChange={handleChange} />
          <button className="btn" onClick={handleFormSubmit} onChange={handleChange}>Sign Up</button>
        </form>
      </div >
    )
  }
  return (
    <>
      {renderForm()}
      {error && <div className='text-center text-danger fs-3 fw-bold'>{error.message}</div>}
    </>
  );
};