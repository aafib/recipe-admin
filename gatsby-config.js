module.exports = {
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-material-ui`,
    {
      resolve: "gatsby-plugin-firebase",
      options: {
        credentials: {
          apiKey: "AIzaSyBMPdDOBZqY4tOAPWWdWqrohrjLOAJEpz8",
          authDomain: "recepie-project.firebaseapp.com",
          projectId: "recepie-project",
          databaseURL: "https://recepie-project.firebaseio.com",
          storageBucket: "recepie-project.appspot.com",
          messagingSenderId: "646175189224",
          appId: "1:646175189224:web:d1bacf61aa1dd57719415d",
        },
      },
    },
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/app/*`] },
    },
  ],
}
