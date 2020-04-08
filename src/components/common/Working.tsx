import React from 'react'
import {Dialog, Spinner, Intent} from '@blueprintjs/core'

import './Working.scss'

interface WorkingProps {
  show: boolean
}

const Working = ({show}: WorkingProps) => {
  return (
    // TODO: Using Overlay with proper CSS would be better
    <Dialog
      isOpen={show}
      canEscapeKeyClose={false}
      canOutsideClickClose={false}
      className="working"
      portalClassName="working-portal"
    >
      <Spinner size={Spinner.SIZE_LARGE} intent={Intent.PRIMARY} />
    </Dialog>
  )
}

export default Working
