import React from "react"
import styled from "styled-components"
import Header from "../components/Header"
import { theme } from "../theme"

const Container = styled.div`
  padding: 1rem 1rem 4rem;
  min-height: calc(100vh - 2rem);

  @media ${theme.breakpoints.desktop} {
    max-width: 968px;
    margin: 0 auto;
  }
`

const Layout = ({children}) => {
  return <Container>
    <Header />
    {children}
  </Container>
}

export default Layout