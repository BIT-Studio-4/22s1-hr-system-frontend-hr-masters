/*
 * Main modal will provide a pop up window when each table click create or edit button
 */
import React, { useState } from 'react'
import { Button, Modal, ModalHeader, ModalBody } from 'reactstrap'
import EmployeeUpdateModal from './EmployeeUpdateModal'

function ModalForm(props) {
  const [modal, setModal] = useState(false)
  const toggle = () => {
    setModal(!modal)
  }

  const closeBtn = (
    <Button className='close' onClick={toggle}>
      &times;
    </Button>
  )

  const label = props.buttonLabel

  let button = ''
  let title = ''
  let subForm = ''

  //customise props
  const customProps = {
    toggle: toggle,
    label: label,
    BASE_URL: props.BASE_URL,
    SUB_URL: props.SUB_URL,
  }

  //check lable and props for calling sub form
  if (label === 'Edit') {
    button = (
      <Button
        color='warning'
        onClick={toggle}
        style={{ float: 'left', marginRight: '10px' }}
      >
        {label}
      </Button>
    )
    title = 'Edit Item'
    if (props.employee) {
      subForm = (
        <EmployeeUpdateModal
          updateState={props.updateState}
          foodie={props.employee}
          {...customProps}
        />
      )
    }
    
  } else {
    button = (
      <Button
        color='success'
        onClick={toggle}
        style={{ float: 'left', marginRight: '10px' }}
      >
        {label}
      </Button>
    )
    if (label === 'Add Employee') {
      title = 'Add New Employee'
      subForm = (
        <EmployeeUpdateModal
          addItemToState={props.addItemToState}
          {...customProps}
        />
      )
    }

  }
  return (
    <div>
      {button}
      <Modal isOpen={modal} toggle={toggle} className={props.className}>
        <ModalHeader toggle={toggle} close={closeBtn}>
          {title}
        </ModalHeader>
        <ModalBody>{subForm}</ModalBody>
      </Modal>
    </div>
  )
}

export default ModalForm
