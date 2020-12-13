import React, { useEffect, Fragment } from "react"
import { Typography } from "@material-ui/core"
import { Helmet } from "react-helmet"
import { navigate } from "gatsby"
import { isLoggedIn } from "../services/auth"

export default () => {
  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/app/home")
    } else {
      navigate("/app/login")
    }
  }, [])

  return (
    <Fragment>
      <Helmet title={"Loading..."} />
      <Typography variant="h6">Loading...</Typography>
    </Fragment>
  )
}
