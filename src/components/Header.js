import React from "react"
import { StaticImage } from "gatsby-plugin-image"
import styled from "styled-components"
import { Link } from "gatsby"
import { theme } from "../theme"

const Container = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const NavLinks = styled.div`
  ul {
    list-style: none;
    display: flex;

    li {
      margin-left: 0.75rem;
      
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
            <Link to="/iletisim">İletisim</Link>
          </li>
        </ul>
      </NavLinks>
    </Container>
  )
}

export default Header