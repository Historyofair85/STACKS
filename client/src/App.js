import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Navigation } from './componets/navbar/navbar'
import { Home } from './pages/Home/home'
import { Profile } from './pages/Profile/profile.js'
import { Blog } from './pages/LiveBlog/blog'
import Login from './pages/Login/Login'
import 'bootstrap/dist/css/bootstrap.min.css';


const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
})

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export const App = () => {
  return (
    <>
      <ApolloProvider client={client}>
        <Navigation />
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/me" element={<Profile />} />
            <Route exact path="/users/:id" element={<Profile />} />
            <Route exact path="/blog" element={<Blog />} />
            <Route exact path="/blog/:id" element={<Blog />} />
          </Routes>
        </Router>
      </ApolloProvider >
    </>
  )
}

export default App
