import React from "react"
import Home from "./Home"
import Signup from "./Signup"
import Login from "./Login"
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from 'react-router-dom'
import { AuthContextProvider, useAuthState } from './firebase'
import { Container, Card, } from 'react-bootstrap'

const AuthenticatedRoute = ({ component: C, ...props }) => {
  const { isAuthenticated } = useAuthState()
  return (
    <Route
      {...props}
      render={routeProps =>
      isAuthenticated ? <C {...routeProps} /> : <Redirect to="/login" />
      }
    />
  )
}

const UnauthenticatedRoute = ({ component: C, ...props }) => {
  const { isAuthenticated } = useAuthState()
  return (
    <Route
      {...props}
      render={routeProps =>
        !isAuthenticated ? <C {...routeProps} /> : <Redirect to="/" />
      }
    />
  )
}

function App() {
  return (
  <Container>
  <Card style={{ width: '30rem' }}>
    <AuthContextProvider>
      <Router>
      <Card.Header>
      <Card.Title className="mb-2 text-muted">
        <div style={{ textAlign: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>Home</Link> |
          <Link to="/login" style={{ textDecoration: 'none' }}> Login</Link> |
          <Link to="/signup" style={{ textDecoration: 'none' }}> Register</Link> 
        </div>
      </Card.Title>
      </Card.Header>
        <AuthenticatedRoute exact path="/" component={Home} />
        <UnauthenticatedRoute exact path="/signup" component={Signup} />
        <UnauthenticatedRoute exact path="/login" component={Login} />
      </Router>
    </AuthContextProvider>
  </Card>
  </Container>
  )
}
export default App;
