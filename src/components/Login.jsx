import React, { useState } from "react"
import {
  Typography,
  Box,
  makeStyles,
  TextField,
  Button,
  CircularProgress,
} from "@material-ui/core"
import { Helmet } from "react-helmet"
import { navigate } from "gatsby"
import { isLoggedIn, setUser } from "../services/auth"
import { handleLogin } from "../helpers"

const useStyles = makeStyles({
  root: {
    display: "flex",
    minHeight: "100vh",
    width: "100%",
    margin: 0,
    padding: 0,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  loginContainer: {
    border: "1px solid #dadce0",
    minWidth: "320px",
    textAlign: "center",
    padding: "40px 0px",
  },
  header: {
    fontWeight: 400,
    paddingBottom: "30px",
  },
  inputField: {
    paddingBottom: "30px",
  },
  form: {
    marginBottom: "20px",
  },
})

function Login() {
  if (isLoggedIn()) {
    navigate("/app/home")
  }

  const classes = useStyles()
  const [userName, setUserName] = useState("")
  const [password, setPassword] = useState("")
  const [isSubmit, setIsSubmit] = useState(false)

  return (
    <Box className={classes.root}>
      <Helmet title={"Login"} />
      <Box className={classes.loginContainer}>
        <Typography className={classes.header} variant="h4">
          Admin Login
        </Typography>
        <form
          className={classes.form}
          onSubmit={async (event) => {
            event.preventDefault()
            setIsSubmit(true)
            const { isAuthentic } = await handleLogin({ userName, password })
            if (isAuthentic) {
              setUser({ userName, name: "Admin User" })
              navigate("/app/home")
            } else {
              setIsSubmit(false)
              alert("Wrong username or password")
            }
          }}
        >
          <TextField
            className={classes.inputField}
            label="Username"
            type="text"
            variant="outlined"
            onChange={(event) => setUserName(event.target.value)}
            required
            disabled={isSubmit}
          />
          <br />
          <TextField
            className={classes.inputField}
            label="Password"
            type="password"
            variant="outlined"
            onChange={(event) => setPassword(event.target.value)}
            required
            disabled={isSubmit}
          />
          <br />
          <Button
            color="primary"
            type="submit"
            variant="contained"
            disabled={isSubmit}
          >
            {isSubmit ? <CircularProgress size={24} /> : "Login"}
          </Button>
        </form>
      </Box>
    </Box>
  )
}

export default Login
