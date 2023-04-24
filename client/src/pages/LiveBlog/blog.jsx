import { useQuery } from '@apollo/client';
import Auth from '../../utils/Auth';

import { NewPost } from '../../componets/NewPost/NewPost';
import { Post } from '../../componets/Post/Post';

import { GET_ALL_POSTS } from '../../utils/queries';

import Container from 'react-bootstrap/Container'

export const Blog = () => {
  const { loading, data } = useQuery(GET_ALL_POSTS, { variables: { order: -1, limit: 5 } });
  const posts = data?.getAllPosts || [];

  const renderUsername = () => {
    if (!Auth.loggedIn()) return null;
    return Auth.getProfile().data.username;
  }
  return (
    <>
      <Container>
        <h1>Create New Post</h1>
        <NewPost />
      </Container>
      <Container>
        <h1>Live Blog</h1>
        {/*mapping over the top 5 latest posts */}
        {posts.map((post, index) => (
          <Post key={post._id} post={post} index={index} />
        ))}
      </Container>
    </>
  )
}