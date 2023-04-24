import Card from 'react-bootstrap/Card'


export const Post = ({ post, index }) => {


return (
  <Card>
    <Card.Header>{post.title}</Card.Header>
    <Card.Subtitle>{post.createdAt}</Card.Subtitle>
    <Card.Subtitle>{post.sneakerName}</Card.Subtitle>
    <Card.Body>
      <img src={post.image} alt={post.sneakerName} /> {post.postText}
    </Card.Body>
  </Card>
)
}
