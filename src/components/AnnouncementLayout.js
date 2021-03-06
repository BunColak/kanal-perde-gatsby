import React from "react"
import Layout from "./Layout"
import { graphql } from "gatsby"
import styled from "styled-components"
import BlockContent from "@sanity/block-content-to-react"
import formatBlock from "../utils/formatBlock"
import SmallDate from "./SmallDate"

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 3rem;
  text-align: center;

  img {
    width: 75%;
    border-radius: 4px;
  }
  
  h2 {
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
  }
`

const AnnouncementLayout = ({ data: { sanityAnnouncement: announcement } }) => {
  return (
    <Layout>
      <Container>
        <img src={announcement.photo.asset.url} alt={announcement.title} />
        <h2>{announcement.title}</h2>
        <SmallDate>{new Intl.DateTimeFormat("tr").format(new Date(announcement.date))}</SmallDate>
        <BlockContent blocks={formatBlock(announcement.description)} />
      </Container>
    </Layout>
  )
}

export const query = graphql`
  query GetAnnouncement($id: String!) {
    sanityAnnouncement(id: {eq: $id}) {
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
`

export default AnnouncementLayout