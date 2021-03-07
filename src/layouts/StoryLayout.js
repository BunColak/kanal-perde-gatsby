import React from "react"
import Layout from "./Layout"
import { graphql } from "gatsby"
import StoryListItem from "../components/StoryListItem"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const AudioPlayer = styled.audio`
  width: 75%;
  margin: 2rem auto 0;
`

const StoryLayout = ({ data: { sanityStory: story } }) => {
  return (
    <Layout>
      <Container>
        <StoryListItem story={story} />
        <AudioPlayer controls src={story.audio.asset.url} title={"hello"} />
      </Container>
    </Layout>
  )
}

export const query = graphql`
query GetStory($id: String!) {
  sanityStory(id: {eq: $id}) {
    id
    title
    _createdAt
    slug
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
        text
        marks
      }
    }
    audio {
      asset {
        url
      }
    }
    photo {
      asset {
        url
      }
    }
  }
}
`

export default StoryLayout