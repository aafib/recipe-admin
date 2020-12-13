import firebase from "gatsby-plugin-firebase"

export async function uploadImage({ title, thumbnail }) {
  try {
    const storageRef = firebase.storage().ref(`thumbnails/${title}`)
    const snapshot = await storageRef.put(thumbnail)
    const thumbnailURL = await snapshot.ref.getDownloadURL()
    return { isUploaded: true, url: thumbnailURL }
  } catch (error) {
    return { isUploaded: false, error }
  }
}

export async function saveToDB(...recipeDetails) {
  try {
    const ref = firebase.firestore().collection("recipes")
    await ref.add(...recipeDetails)
    return { isSaved: true }
  } catch (error) {
    return { isSaved: false, error }
  }
}

export async function handleUpload(recipeDetails) {
  try {
    const { url } = await uploadImage(recipeDetails)
    let slug = recipeDetails.title
      .toLowerCase()
      .split(" ")
      .join("-")
    let { thumbnail, ...restData } = recipeDetails
    thumbnail = url
    await saveToDB({ ...restData, thumbnail, slug })
    return { isSaved: true }
  } catch (error) {
    return error
  }
}

export async function handleLogin({ userName, password }) {
  try {
    const ref = firebase.firestore().collection("admin")
    const snapshot = await ref.get()
    const USER = snapshot.docs[0].data()
    if (USER.userName === userName && USER.password === password) {
      return { isAuthentic: true }
    } else {
      return { isAuthentic: false }
    }
  } catch (error) {
    return { isAuthentic: false, error }
  }
}
