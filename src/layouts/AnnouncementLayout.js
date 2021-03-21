import React from "react"
import Layout from "./Layout"
import { graphql } from "gatsby"
import styled from "styled-components"
import SmallDate from "../components/SmallDate"
import BlockText from "../components/BlockText"
import IframeResizer from "iframe-resizer-react"

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

const YoutubeContainer = styled(IframeResizer)`
  margin-top: 1rem;
`

const AnnouncementLayout = ({ data: { sanityAnnouncement: announcement } }) => {
  return (
    <Layout>
      <Container>
        <img src={announcement.photo.asset.url} alt={announcement.title} />
        <h2>{announcement.title}</h2>
        <SmallDate>{new Intl.DateTimeFormat("tr").format(new Date(announcement.date))}</SmallDate>
        <BlockText block={announcement.description} />
        {announcement.link &&
        <YoutubeContainer
          log
          src={`https://www.youtube.com/embed/${announcement.link}`}
          style={{
            width: "1px",
            minWidth: "100%",
            minHeight: "100%",
            height: window.innerWidth > 1000 ? "450px" : "200px"
          }}
        />}
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
      link
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