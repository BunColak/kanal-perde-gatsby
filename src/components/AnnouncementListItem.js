import React from "react"
import styled from "styled-components"
import BlockContent from "@sanity/block-content-to-react"
import formatBlock from "../utils/formatBlock"
import { Link } from "gatsby"
import { theme } from "../theme"
import SmallDate from "./SmallDate"

const Container = styled.div`
  display: grid;
  margin-top: 2rem;
  text-align: center;

  @media ${theme.breakpoints.desktop} {
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-flow: dense;
    margin-top: 6rem;
    grid-gap: 1rem;
  }
`

const AnnouncementImage = styled.img`
  width: 70%;
  margin: 0 auto;
  border-radius: 4px;
  border: 2px solid var(--color-secondary);

  @media ${theme.breakpoints.desktop} {
    grid-column: ${props => !props.odd ? "1 / 2" : "3 / 4"};
    width: auto;
    max-height: 180px;
  }
`

const AnnouncementInfo = styled.div`
  margin-top: 1rem;

  h3 {
    color: var(--color-secondary);
    border-bottom: 4px solid transparent;
    transition: all;
    
    &:hover {
      border-bottom-color: var(--color-secondary);
    }
  }

  @media ${theme.breakpoints.desktop} {
    grid-column: ${props => !props.odd ? "2 / 4" : "1 / 3"};
    text-align: ${props => !props.odd ? "start" : "end" };
    margin-top: 0;
  }
`



const AnnouncementListItem = ({ announcement, odd }) => {
  return (
    <Container>
      <AnnouncementImage src={announcement.photo.asset.url} alt={announcement.title} odd={odd} />
      <AnnouncementInfo odd={odd}>
        <Link to={`/duyurular/${announcement.slug}`}>
          <h3>{announcement.title}</h3>
        </Link>
        <SmallDate>{new Intl.DateTimeFormat("tr").format(new Date(announcement.date))}</SmallDate>
        <BlockContent blocks={formatBlock(announcement.description)} />
      </AnnouncementInfo>
    </Container>
  )
}

export default AnnouncementListItem