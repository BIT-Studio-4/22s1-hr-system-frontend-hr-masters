/*
 * loading message and animation
 */
import React, { Fragment } from 'react'
import { DotLoader } from 'react-spinners'

const Loader = () => {
  return (
    <Fragment>
      <h2>
        Loading.... <DotLoader size={50} color={'black'} loading={true} />
      </h2>
    </Fragment>
  )
}

export default Loader
