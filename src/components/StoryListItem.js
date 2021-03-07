import React from "react"
import styled from "styled-components"
import { StaticImage } from "gatsby-plugin-image"
import BlockText from "./BlockText"
import SmallDate from "./SmallDate"
import { Link } from "gatsby"

const Container = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    text-align: center;
    margin-top: 0.5rem;
  }

`

const StoryImage = styled.div`
  width: 75%;
  display: flex;
  justify-content: center;

  img {
    width: 100%;
  }
`


const StoryTitle = styled.h3`
  margin-top: 0.5rem;
  color: var(--color-secondary);
`


const StoryListItem = ({ story }) => {
  const hasExternalImage = !!story.photo

  return (
    <Container>
      <StoryImage>
        {hasExternalImage ?
          <img src={story.photo.asset.url} alt={story.title} />
          :
          <StaticImage src="../images/placeholderStory.png" alt={story.title} />
        }
      </StoryImage>
      <Link to={`/hikayeler/${story.storyCategory.slug}/${story.slug}`}>
        <StoryTitle>{story.title}</StoryTitle>
      </Link>
      <SmallDate>{new Intl.DateTimeFormat("tr").format(new Date(story._createdAt))} - <Link
        to={`/hikayeler/${story.storyCategory.slug}`}>{story.storyCategory.title}</Link> </SmallDate>
      <BlockText block={story.description} />
    </Container>
  )
}


export default StoryListItem