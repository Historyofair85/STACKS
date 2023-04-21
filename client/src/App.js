import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { Router, Route, Routes } from 'react-router-dom'
// import './App.css'
import { Navigation } from './componets/navbar/navbar'
import { Home } from './pages/Home/home'
import { Profile } from './pages/Profile/profile.js'
import { Blog } from './pages/LiveBlog/blog'
import { Login } from './pages/Login/login'


const httpLink = createHttpLink({
  uri: '/graphql',
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
          <div className='min-vh-100 d-flex flex-column'>
            <Routes>
              <Route exact path="/" component={Home} />
              <Route exact path="/login" component={Login} />
              {/* <Route exact path="/signup" component={Login} /> */}
              <Route exact path="/me" component={Profile} />
              <Route exact path="/users/:id" component={Profile} />
              <Route exact path="/blog" component={Blog} />
              <Route exact path="/blog/:id" component={Blog} />
            </Routes>
          </div>
        </Router>
      </ApolloProvider >
    </>
  )
}

export default App
