import * as React from "react"
import { graphql } from "gatsby"
import BlockContent from "@sanity/block-content-to-react"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import styled from "styled-components"
import formatBlock from "../utils/formatBlock"
import { theme } from "../theme"

const AboutSection = styled.div`
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
  
  @media ${theme.breakpoints.desktop} {
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

const IndexPage = ({ data }) => {
  console.log(data)

  return <Layout>
    <SEO title="Ana Sayfa" />
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
}

`

export default IndexPage
