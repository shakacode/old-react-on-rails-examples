import React from 'react'
import LinkContainer from '../containers/LinkContainer'

const Footer = () => (
  <p>
    Show:
    {" "}
    <LinkContainer filter="SHOW_ALL">
      All
    </LinkContainer>
    {", "}
    <LinkContainer filter="SHOW_ACTIVE">
      Active
    </LinkContainer>
    {", "}
    <LinkContainer filter="SHOW_COMPLETED">
      Completed
    </LinkContainer>
  </p>
)

export default Footer
