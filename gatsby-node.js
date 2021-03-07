const path = require("path")
const slugify = require("slugify")

const createPaginatedPages = ({ numberOfElements, perPage, resource, layout, createPage }) => {
  const numberOfPages = Math.ceil(numberOfElements / perPage)

  Array.from({ length: numberOfPages }).forEach((_, i) => {
    createPage({
      path: i === 0 ? `/${resource}` : `/${resource}/${i + 1}`,
      component: path.resolve(layout),
      context: {
        limit: perPage,
        skip: i * perPage,
        pageCount: numberOfPages,
        currentPage: i + 1
      }
    })
  })
}

exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    SanityAnnouncement: {
      slug: {
        type: "String",
        resolve(source, args, context, info) {
          return slugify(source.title.toLowerCase().replace(/^\W/g, "") + Math.ceil(new Date(source.date).getDate()))
        }
      }
    },
    SanityStory: {
      slug: {
        type: "String",
        resolve(source, args, context, info) {
          const lowerTitle = source.title.toLowerCase()
          return slugify(lowerTitle.replace(/^\W/g, "") + Math.ceil(new Date(source._createdAt).getDate()))
        }
      }
    },
    SanityStoryCategory: {
      slug: {
        type: "String",
        resolve(source, args, context, info) {
          const lowerTitle = source.title.toLowerCase()
          return slugify(lowerTitle.replace(/^\W/g, ""))
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
          storyCategory {
            slug
          }
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

  const announcementPerPage = 5
  createPaginatedPages({
    numberOfElements: results.data.allSanityAnnouncement.edges.length,
    layout: "./src/layouts/AnnouncementListLayout.js",
    createPage,
    perPage: announcementPerPage,
    resource: "duyurular"
  })

  results.data.allSanityAnnouncement.edges.forEach(({ node }) => {
    createPage({
      path: `/duyurular/${node.slug}`,
      component: path.resolve(`./src/layouts/AnnouncementLayout.js`),
      context: {
        id: node.id
      }
    })
  })

  results.data.allSanityStoryCategory.edges.forEach(({ node }) => {
    createPage({
      path: `/hikayeler/${node.slug}`,
      component: path.resolve(`./src/layouts/StoryCategoryLayout.js`),
      context: {
        id: node.id
      }
    })
  })

   results.data.allSanityStory.edges.forEach(({ node }) => {
    createPage({
      path: `/hikayeler/${node.storyCategory.slug}/${node.slug}`,
      component: path.resolve(`./src/layouts/StoryLayout.js`),
      context: {
        id: node.id
      }
    })
  })
}