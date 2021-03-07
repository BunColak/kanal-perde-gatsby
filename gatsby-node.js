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

  const announcementPerPage = 5;
  const numberOfAnnouncementPages = Math.ceil(results.data.allSanityAnnouncement.edges.length / announcementPerPage)
  Array.from({length: numberOfAnnouncementPages}).forEach((_, i) => {
    createPage({
      path: i === 0 ? '/duyurular' : `/duyurular/${i+1}`,
      component: path.resolve('./src/layouts/AnnouncementListLayout.js'),
      context: {
        limit: announcementPerPage,
        skip: i * announcementPerPage,
        pageCount: numberOfAnnouncementPages,
        currentPage: i + 1
      }
    })
  })

  results.data.allSanityAnnouncement.edges.forEach(({ node }) => {
    createPage({
      path: `/duyurular/${node.slug}`,
      component: path.resolve(`./src/layouts/AnnouncementLayout.js`),
      context: {
        id: node.id,
      }
    })
  })

}