import React, { useState, Fragment } from "react"
import {
  Box,
  Typography,
  Input,
  makeStyles,
  FormControl,
  InputLabel,
  Divider,
  Button,
  Backdrop,
  CircularProgress,
} from "@material-ui/core"
import { Helmet } from "react-helmet"
import Appbar from "./Appbar"
import { handleUpload } from "../helpers"

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
    margin: "30px 0px",
    width: "100%",
    flexGrow: 1,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  header: { marginBottom: "20px" },
  input: { width: "25%" },
  form: { marginTop: "25px" },
  select: { minWidth: 120 },
  submitBtn: { marginTop: "20px" },
  [theme.breakpoints.down("sm")]: {
    input: { width: "90%" },
  },
}))

const CustomIput = ({ label, ...props }) => {
  const classes = useStyles()
  return (
    <Fragment>
      <FormControl className={classes.input}>
        <InputLabel>{label}</InputLabel>
        <Input {...props} required />
      </FormControl>
      <br />
      <br />
    </Fragment>
  )
}

function Upload() {
  const classes = useStyles()
  const [recipeDetails, setRecipeDetails] = useState({})
  const [isOpen, setIsOpen] = useState(false)

  function handleChange(event) {
    setRecipeDetails({
      ...recipeDetails,
      [event.target.name]: event.target.value,
    })
  }

  function handleThumbnailChange(event) {
    const thumbnail = event.target.files[0]
    setRecipeDetails({ ...recipeDetails, thumbnail })
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault()
      let { ingredients, steps, tags, ...restData } = recipeDetails
      ingredients = recipeDetails.ingredients.replace(8629, "\n").split("\n")
      steps = recipeDetails.steps.replace(8629, "\n").split("\n")
      tags = recipeDetails.tags.split(", ")
      setIsOpen(true)
      await handleUpload({ ...restData, ingredients, steps, tags })
      setIsOpen(false)
      alert("Successfully saved")
      window.location.reload()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Fragment>
      <Appbar />
      <Helmet title={"Admin Portal"} />
      <Backdrop className={classes.backdrop} open={isOpen}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box className={classes.root}>
        <Typography variant="h4" className={classes.header}>
          Upload Recipe
        </Typography>
        <Divider />
        <form className={classes.form} onSubmit={handleSubmit}>
          <CustomIput
            label="Recipe Title"
            name={"title"}
            onChange={handleChange}
          />
          <CustomIput
            label="Description"
            placeholder="About the Recipe"
            type="text"
            name={"description"}
            onChange={handleChange}
          />
          <CustomIput
            label="Thumbnail"
            type="file"
            accept="image/*"
            onChange={handleThumbnailChange}
          />
          <CustomIput
            label="Ingredients"
            placeholder="Ingredients"
            name={"ingredients"}
            type="text"
            multiline
            onChange={handleChange}
          />
          <CustomIput
            label="Cooking Steps"
            placeholder="Steps"
            name={"steps"}
            type="text"
            multiline
            onChange={handleChange}
          />
          <CustomIput
            label="Tags"
            placeholder="Eg: sweet, spicy, fast-food"
            name={"tags"}
            type="text"
            onChange={handleChange}
          />
          <Button
            className={classes.submitBtn}
            type="submit"
            color="primary"
            variant="contained"
          >
            Submit
          </Button>
        </form>
      </Box>
    </Fragment>
  )
}

export default Upload
