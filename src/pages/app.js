import React from "react"
import { Router } from "@reach/router"
import PrivateRoute from "../components/PrivateRoute"
import Login from "../components/Login"
import Upload from "../components/Upload"

const App = () => (
  <Router>
    <PrivateRoute path="/app/home" component={Upload} />
    <Login path="/app/login" />
  </Router>
)

export default App
