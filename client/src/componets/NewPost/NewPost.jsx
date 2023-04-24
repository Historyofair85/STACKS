import { useQuery, useMutation } from "@apollo/client"
import { useState } from "react"

import { CREATE_POST } from "../../utils/mutations"
import { QUERY_USER, QUERY_ME } from '../../utils/queries'
import Auth from '../../utils/Auth'

import Card from "react-bootstrap/Card"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Container from "react-bootstrap/Container"
import Button from "react-bootstrap/Button"


export const NewPost = () => {

  const [formState, setFormState] = useState({ title: '', postText: '', image: '', sneakerName: '', })
  const { loading, data, error } = useQuery(QUERY_ME);
  const user = data?.me

  // Create a new Post attached to current user
  const [createPost, { postError, newPostData }] = useMutation(CREATE_POST, {
    // The update method allows us to access and update the local cache
    update(cache, { data: { createPost } }) {
      try {
        if (user) {
          cache.writeQuery({
            query: QUERY_USER,
            data: { user: { ...user, Posts: [createPost, ...user.Posts] } },
          })
        }
      } catch (e) {
        console.error(e)
      }
    }
  })

  if (error) console.log(error)
  if (postError) console.log(postError)

  if (loading) {
    return <h4>Loading...</h4>
  }

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
      const { data } = await createPost({
        variables: { ...formState },
      })

      Auth.login(data.login.token)
    } catch (e) {
      console.error(e)
    }

    // clear form values
    setFormState({
      title: '',
      postText: '',
      sneakerName: '',
      image: '',
    })
  }

  if (!user?.username) {
    return (
      <Container className='flex-fill align-items-center d-flex'>
        <Row className="rounded-3 d-flex justify-content-center text-center align-items-center col-11 col-lg-6 m-auto bg-dark text-light p-4" id="bg-card">
          <h3>
            You need to be logged in to see this. Use the navigation links above to
            sign up or log in!
          </h3>
        </Row>
      </Container>
    )
  }

  return (
    <Card>
      <Card.Body>
        <Form
          className="form"
          id="new-post-form"
          onSubmit={handleFormSubmit}>
          {/*thinking of what is gonna be required in a new post*/}
          <Form.Control
            placeholder="Post Title"
            name="title"
            value={formState.title}
            onChange={handleChange}
          />
          <Form.Control
            placeholder="Sneaker Name"
            name="sneakerName"
            value={formState.sneakerName}
            onChange={handleChange}
          />
          <Form.Control
            placeholder="Image URL"
            name="image"
            value={formState.image}
            onChange={handleChange}
          />
          <Form.Control
            placeholder="Post Text"
            name="postText"
            value={formState.postText}
            onChange={handleChange}
          />
          <div>
            <Button
              size="lg"
              type="submit"
              id="submit"
              onClick={handleFormSubmit}
              onChange={handleChange}>
              Enter
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  )
}