import React from "react"
import styled from "styled-components"
import { Link } from "gatsby"

const Container = styled.div`
  display: grid;
  place-content: center;
  margin-top: 3rem;

  & > div {
    display: flex;
    align-items: center;
  }

  i.material-icons {
    color: var(--color-accent);
  }
`

const CurrentPage = styled.p`
  color: var(--color-accent);
  font-family: var(--font-secondary);
`

const Pagination = ({ pageContext, resource }) => {
  const hasPrevPage = pageContext.currentPage > 1
  const hasNextPage = pageContext.pageCount > pageContext.currentPage
  const prevPage = pageContext.currentPage === 2 ? `/${resource}` : `/${resource}/${pageContext.currentPage - 1}`

  return (
    <Container>
      <div>
        <Link to={prevPage} style={{ visibility: hasPrevPage ? "visible" : "hidden" }}><i
          className="material-icons">chevron_left</i></Link>
        <CurrentPage>
          {pageContext.currentPage}
        </CurrentPage>
        <Link to={`/${resource}/${pageContext.currentPage + 1}`}
              style={{ visibility: hasNextPage ? "visible" : "hidden" }}><i
          className="material-icons">chevron_right</i></Link>
      </div>
    </Container>
  )
}

export default Pagination