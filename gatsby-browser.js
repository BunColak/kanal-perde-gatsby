/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/browser-apis/
 */

// You can delete this file if you're not using it

const React = require("react")
const ThemeProvider = require("styled-components").ThemeProvider
const Theme = require("./src/theme")

exports.wrapRootElement = ({ element }) => {
  return (
    <ThemeProvider theme={Theme.theme}>
      <Theme.GlobalStyles />
      {element}
    </ThemeProvider>
  )
}