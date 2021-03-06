import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

const FancyLink = styled(({ children, ...props }) => <Link {...props}>{children} <i
  className="material-icons">arrow_right_alt</i></Link>)`
  border-bottom: 4px solid var(--color-accent);
  font-weight: bold;
  font-family: var(--font-secondary);
`

export default FancyLink