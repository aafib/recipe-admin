import React from "react"
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"
import ExitToAppIcon from "@material-ui/icons/ExitToApp"
import { logout } from "../services/auth"
import { navigate } from "gatsby"

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  btn: {
    textTransform: "none",
    color: "inherit",
  },
  btnText: {
    paddingRight: "5px",
  },
  logoutIcon: {
    display: "none",
  },
  [theme.breakpoints.up("sm")]: {
    logoutIcon: {
      display: "unset",
    },
  },
}))

function Appbar() {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            Admin Portal
          </Typography>
          <Button
            className={classes.btn}
            onClick={() => {
              logout(() => navigate("/app/login"))
            }}
          >
            <Typography
              className={classes.btnText}
              variant="body1"
              component={"span"}
            >
              Logout
            </Typography>{" "}
            <ExitToAppIcon className={classes.logoutIcon} />
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Appbar
