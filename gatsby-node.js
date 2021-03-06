const path = require("path")
const slugify = require("slugify")

exports.createResolvers = ({createResolvers}) => {
  createResolvers({
    // `SanityBlogPost` being the type name you want to extend
    SanityAnnouncement: {
      // `happiness` being the field name you want to add
      slug: {
        // type is the _GraphQL_ type name, so you can do `String!` for "non-null string", `Int` for integer, `SanityCategory` for a document or object of type  `SanityCategory`.
        type: 'String',
        resolve(source, args, context, info) {
          return slugify(source.title.replace(/^\W/g) + Math.ceil(new Date(source.date).getDate()))
        }
      }
    }
  })
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const results = await graphql(`
  {
    allSanityAnnouncement {
      edges {
        node {
          id
          title
          slug
        }
      }
    }
  }
  `)

  results.data.allSanityAnnouncement.edges.forEach(({ node }) => {
    createPage({
      path: `/duyurular/${node.slug}`,
      component: path.resolve(`./src/components/AnnouncementLayout.js`),
      context: {
        id: node.id,
      }
    })
  })

  console.log(results)
}