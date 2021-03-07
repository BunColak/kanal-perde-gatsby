import React from "react"
import Layout from "../layouts/Layout"
import { graphql, Link } from "gatsby"
import SectionTitle from "../components/SectionTitle"
import styled from "styled-components"
import { theme } from "../theme"

const StoryContainer = styled.div`
  display: grid;
  margin-top: 4rem;
  
  @media screen and ${theme.breakpoints.desktop} {
    grid-template-columns: repeat(3, 1fr);
  }
`

const StoryCategoryImage = styled.img`
  width: 70%;
  margin: 0 auto;
`

const StoryCategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  
  a {
    margin-top: 0.5rem;
  }
`

const Hikayeler = ({ data: { allSanityStoryCategory } }) => {
  return (
    <Layout>
      <SectionTitle>Hikayeler</SectionTitle>
      <StoryContainer>
        {allSanityStoryCategory.edges.map(({ node: c }) => (
          <StoryCategoryContainer key={c.id}>
            <StoryCategoryImage src={c.photo.asset.url} alt={c.title} />
            <Link to={`/hikayeler/${c.slug}`}><h3>{c.title}</h3></Link>
          </StoryCategoryContainer>
        ))}
      </StoryContainer>
    </Layout>
  )
}

export const query = graphql`
{
  allSanityStoryCategory {
    edges {
      node {
        id
        title
        slug
        photo {
          asset {
            url
          }
        }
      }
    }
  }
}
`

export default Hikayeler