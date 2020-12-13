export const isBrowser = () => typeof window !== "undefined"

export const getUser = () =>
  isBrowser() && window.localStorage.getItem("recipeAdmin")
    ? JSON.parse(window.localStorage.getItem("recipeAdmin"))
    : {}

export const setUser = user =>
  window.localStorage.setItem("recipeAdmin", JSON.stringify(user))

export const isLoggedIn = () => {
  const user = getUser()
  return !!user.userName
}

export const logout = callback => {
  setUser({})
  callback()
}
