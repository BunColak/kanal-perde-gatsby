import React from "react"
import Layout from "./Layout"
import { graphql } from "gatsby"
import SectionTitle from "../components/SectionTitle"
import StoryListItem from "../components/StoryListItem"
import styled from "styled-components"
import { theme } from "../theme"

const StoryContainer = styled.div`
  display: grid;
  
  @media screen and ${theme.breakpoints.desktop} {
    grid-template-columns: repeat(3, 1fr);
  }
`

const StoryCategoryLayout = ({ data: { allSanityStory, sanityStoryCategory } }) => {
  return (
    <Layout>
      <SectionTitle style={{marginTop: '4rem'}}>{sanityStoryCategory.title}</SectionTitle>
      <StoryContainer>
        {allSanityStory.edges.map(({ node: story }) => <StoryListItem key={story.id} story={story} />)}
      </StoryContainer>
    </Layout>
  )
}

export const query = graphql`
query GetStories($id: String!) {
  sanityStoryCategory(id: {eq: $id}) {
    title
  }
  allSanityStory(filter: {storyCategory: {id: {eq: $id}}}) {
    edges {
      node {
        id
        title
        slug
        _createdAt
        storyCategory {
          title
          slug
        }
        description {
          _key
          _type
          style
          list
          children {
            _key
            _type
            marks
            text
          }
        }
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

export default StoryCategoryLayout