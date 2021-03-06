export default function formatBlock(block) {
  return block.map(d => ({...d, markDefs: [], children: d.children.map(c => ({...c, markDefs: c.marks}))}))
}