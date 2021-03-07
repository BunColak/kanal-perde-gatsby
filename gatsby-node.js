const path = require("path")
const slugify = require("slugify")

exports.createResolvers = ({createResolvers}) => {
  createResolvers({
    SanityAnnouncement: {
      slug: {
        type: 'String',
        resolve(source, args, context, info) {
          return slugify(source.title.toLowerCase().replace(/^\W/g,'') + Math.ceil(new Date(source.date).getDate()))
        }
      }
    },
    SanityStory: {
      slug: {
        type: 'String',
        resolve(source, args, context, info) {
          const lowerTitle = source.title.toLowerCase()
          return slugify(lowerTitle.replace(/^\W/g, '') + Math.ceil(new Date(source._createdAt).getDate()))
        }
      }
    },
    SanityStoryCategory: {
      slug: {
        type: 'String',
        resolve(source, args, context, info) {
          const lowerTitle = source.title.toLowerCase()
          return slugify(lowerTitle.replace(/^\W/g, ''))
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
          slug
        }
      }
    }
    allSanityStory {
      edges {
        node {
          id
          slug
        }
      }
    }
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

  results.data.allSanityStoryCategory.edges.forEach(({ node }) => {
    createPage({
      path: `/hikayeler/${node.slug}`,
      component: path.resolve(`./src/layouts/StoryCategoryLayout.js`),
      context: {
        id: node.id,
      }
    })
  })

}