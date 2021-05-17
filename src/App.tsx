import { Switch, Route } from "react-router-dom"
import { ApolloClient, InMemoryCache } from "@apollo/client"
import { ApolloProvider } from "@apollo/client/react"
import Container from "react-bootstrap/Container"
import { createBrowserHistory } from "history"
import "bootstrap/dist/css/bootstrap.min.css"

import { AddEvent, ShowEvent, Events } from "./components"

const App = () => {
  const history = createBrowserHistory()
  const client = new ApolloClient({
    uri: "http://localhost:9002/graphql",
    cache: new InMemoryCache(),
  })
  return (
    <ApolloProvider client={client}>
      <Container className="mt-2">
            <Switch>
              <Route exact path="/">
                <Events history={history} />
              </Route>
              <Route path="/add">
                <AddEvent />
              </Route>
              <Route path="/show">
                <ShowEvent />
              </Route>
            </Switch>
      </Container>
    </ApolloProvider>
  )
}

export default App
