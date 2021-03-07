import React from "react"
import formatBlock from "../utils/formatBlock"
import BlockContent from "@sanity/block-content-to-react"

const BlockText = ({block, className}) => {
  return (
    <BlockContent className={className} blocks={formatBlock(block)} />
  )
}

export default BlockText