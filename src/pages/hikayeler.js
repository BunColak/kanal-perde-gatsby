import React from "react"
import Layout from "../layouts/Layout"
import { graphql } from "gatsby"
import SectionTitle from "../components/SectionTitle"

const Hikayeler = ({data: { allSanityStoryCategory}}) => {
  return (
    <Layout>
      <SectionTitle>Hikayeler</SectionTitle>
      {allSanityStoryCategory.edges.map(({ node: c }) => (
        <div key={c.id}>{c.title}</div>
      ))}
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
      }
    }
  }
}
`

export default Hikayeler