import * as React from "react"
import { graphql } from "gatsby"

import Layout from "../layouts/Layout"
import SEO from "../components/seo"
import styled from "styled-components"
import AnnouncementListItem from "../components/AnnouncementListItem"
import FancyLink from "../components/FancyLink"
import { theme } from "../theme"
import StoryListItem from "../components/StoryListItem"
import SectionTitle from "../components/SectionTitle"

const AnnouncementSection = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
`

const SpacedLink = styled(FancyLink)`
  margin: 4rem auto 0;
`

const StorySection = styled.section`
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
`

const StoryList = styled.div`
  display: grid;
  grid-gap: 2rem;
  place-items: center;

  @media screen and ${theme.breakpoints.desktop} {
    grid-template-columns: repeat(3, 1fr);
  }
`

const IndexPage = ({ data }) => {
  return <Layout>
    <SEO title="Ana Sayfa" />
    <AnnouncementSection>
      <SectionTitle>Duyurular</SectionTitle>
      {data.allSanityAnnouncement.edges.map(({ node }, index) => (
        <AnnouncementListItem key={node.id} announcement={node} odd={index % 2 === 1} />
      ))}
      <SpacedLink to="/duyurular">Bütün Duyurular</SpacedLink>
    </AnnouncementSection>
    <StorySection>
      <SectionTitle>Son Sesli Hikayeler</SectionTitle>
      <StoryList>
        {data.allSanityStory.edges.map(({ node }) => (
          <StoryListItem key={node.id} story={node} />
        ))}
      </StoryList>
      <SpacedLink to="/hikayeler">Bütün Hikayeler</SpacedLink>
    </StorySection>
  </Layout>
}

export const query = graphql`
{
  allSanityAnnouncement(limit: 2, sort: {fields: date, order: DESC}) {
    edges {
      node {
        id
        title
        date
        slug
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
        photo {
          asset {
            url
          }
        }
      }
    }
  }
  allSanityStory(limit:3, sort: {fields: _createdAt, order: DESC}) {
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

export default IndexPage
