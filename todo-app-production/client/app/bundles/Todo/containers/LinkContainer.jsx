import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { setVisibilityFilter } from '../actions/actionCreators'

type Props = {
  active: boolean,
  children?: React.Element<*>,
  onClick: Function,
}

const Link = ({ active, children, onClick }) => {
  if (active) {
    return <span>{children}</span>
  }

  return (
    <a href="#"
       onClick={e => {
         e.preventDefault()
         onClick()
       }}
    >
      {children}
    </a>
  )
}

const mapStateToProps = (state, ownProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter))
    }
  }
}

const LinkContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)

export default LinkContainer
