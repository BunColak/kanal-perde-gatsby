import React from "react"
import Layout from "./Layout"
import { graphql, Link } from "gatsby"
import AnnouncementListItem from "../components/AnnouncementListItem"
import styled from "styled-components"
import Pagination from "../components/Pagination"

const Title = styled.h2`
  margin-top: 4rem;
  text-align: center;
`

const AnnouncementListLayout = ({ data: { allSanityAnnouncement }, pageContext }) => {
  console.log(pageContext)
  return (
    <Layout>
      <Title>Duyurular</Title>
      <div>
        {allSanityAnnouncement.edges.map(({ node: announcement }, index) => (
          <AnnouncementListItem key={announcement.id} announcement={announcement} odd={index % 2 === 1} />
        ))}
      </div>
      <Pagination pageContext={pageContext} resource="duyurular" />
    </Layout>
  )
}

export const query = graphql`
query GetAnnouncementList($skip: Int!, $limit: Int!) {
  allSanityAnnouncement(skip: $skip, limit: $limit, sort: {fields:date, order:DESC}) {
    edges {
      node {
        id
        title
        date
        photo {
          asset {
            url
          }
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
      }
    }
  }
}
`

export default AnnouncementListLayout