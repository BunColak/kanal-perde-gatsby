import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import styled from "styled-components"
import { Link } from "gatsby"
import { theme } from "../theme"

const Container = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  img {
    border: none !important;
  }
`

const NavLinks = styled.div`
  ul {
    list-style: none;
    display: flex;

    li {
      margin-left: 0.75rem;
      font-size: 0.875rem;
      
      a {
        text-decoration: none;
        color: var(--color-text);
      }
    }
  }
  
  @media ${theme.breakpoints.desktop} {
    ul {
      li {
        margin-left: 1.5rem;
        font-size: 1rem;
      }
    }
  }
`

const Header = () => {
  return (
    <Container>
      <Link to="/">
        <StaticImage alt="Kanal Perde Logo" width={75} src="../images/logo.png" />
      </Link>
      <NavLinks>
        <ul>
          <li>
            <Link to="/hikayeler">Sesli Hikayeler</Link>
          </li>
          <li>
            <Link to="/hakkimizda">Hakkimizda</Link>
          </li>
        </ul>
      </NavLinks>
    </Container>
  )
}

export default Header