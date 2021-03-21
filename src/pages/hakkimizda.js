import React from "react"
import styled from "styled-components"
import Layout from "../layouts/Layout"
import { graphql } from "gatsby"
import SectionTitle from "../components/SectionTitle"
import BlockText from "../components/BlockText"

const Container = styled.div`
  margin-top: 3rem;
  text-align: center;
  
  img {
    display: block;
    width: 70%;
    margin: 1rem auto;
  }
`

const About = ({ data: { sanityAbout: about } }) => {
  return (
    <Layout>
      <Container>
        <SectionTitle>{about.title}</SectionTitle>
        <img src={about.photo.asset.url} alt={about.title}/>
        <BlockText block={about.description} />
      </Container>
    </Layout>
  )
}

export const query = graphql`
  {
    sanityAbout(_id: {eq: "about"}) {
      _id
      title
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
`

export default About