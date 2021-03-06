import { createGlobalStyle } from "styled-components"
import "normalize.css"

export const theme = {
  palette: {
    primaryColor: "#ffa8ba",
    secondaryColor: "#fa5246",
    accentColor: "#faae2b",
    backgroundColor: "#f2f7f5",
    textColor: "#00473e"
  },
  breakpoints: {
    desktop: "(min-width: 768px)"
  }
}

export const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Balsamiq+Sans:wght@700&family=Karla&display=swap');

  :root {
    --color-primary: ${theme.palette.primaryColor};
    --color-secondary: ${theme.palette.secondaryColor};
    --color-accent: ${theme.palette.accentColor};
    --color-bg: ${theme.palette.backgroundColor};
    --color-text: ${theme.palette.textColor};
    --font-primary: 'Karla', sans-serif;
    --font-secondary: 'Balsamiq Sans', cursive;
  }

  body {
    font-family: var(--font-primary);
    font-weight: 400;
    background: var(--color-bg);
    color: var(--color-text);
    min-height: 100vh;
  }
  
  h1,h2,h3,h4,h5,h6 {
    font-family: var(--color-secondary);
    font-weight: 700;
    margin: 0;
  }
  
  p {
    margin: 0;
    line-height: 1.35rem;
  }
`