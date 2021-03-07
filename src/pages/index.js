import * as React from "react"
import { graphql } from "gatsby"
import BlockContent from "@sanity/block-content-to-react"

import Layout from "../layouts/Layout"
import SEO from "../components/seo"
import styled from "styled-components"
import formatBlock from "../utils/formatBlock"
import { theme } from "../theme"
import AnnouncementListItem from "../components/AnnouncementListItem"
import FancyLink from "../components/FancyLink"

const AboutSection = styled.section`
  margin-top: 4rem;
  display: grid;
  grid-gap: 1rem;

  img {
    max-height: 200px;
    margin: 0 auto;
    border-radius: 10px;
  }

  h2 {
    margin-bottom: 1.25rem;
  }

  & > * {
    text-align: center;
  }

  @media screen and ${theme.breakpoints.desktop} {
    grid-template-columns: 1fr 2fr;

    img {
      margin: 0;
      max-height: none;
      width: 100%;
    }

    & > * {
      text-align: start;
    }
  }
`

const AnnouncementSection = styled.section`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;

  h2 {
    text-align: center;
  }
`

const AnnouncementLink = styled(FancyLink)`
  margin: 4rem auto 0;
`

const IndexPage = ({ data }) => {
  console.log(data)

  return <Layout>
    <SEO title="Ana Sayfa" />
    <AnnouncementSection>
      <h2>Duyurular</h2>
      {data.allSanityAnnouncement.edges.map(({node}, index) => (
        <AnnouncementListItem key={node.id} announcement={node} odd={index % 2 === 1} />
      ))}
      <AnnouncementLink to="/duyurular">Bütün Duyurular</AnnouncementLink>
    </AnnouncementSection>
    <AboutSection>
      <img src={data.sanityAbout.photo.asset.url} alt="Burkay" />
      <div>
        <h2>{data.sanityAbout.title}</h2>
        <BlockContent blocks={formatBlock(data.sanityAbout.description)} />
      </div>
    </AboutSection>
  </Layout>
}

export const query = graphql`
{
  sanityAbout(_id: {eq: "about"}) {
    title
    description {
      _key
      _type
      style
      list
      children {
        _type
        marks
        text
      }
    }
    photo {
      asset {
        id
        url
      }
    }
  }
  allSanityAnnouncement(limit: 5, sort: {fields: date, order: DESC}) {
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
}

`

export default IndexPage
