import React from "react";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import "../css/DeleteModal.css"

const DeleteModal = (props) => {
  const showDelete = props.showDelete;

  return (
    <Modal isOpen={showDelete} toggle={() => props.delete(false)}>
      <ModalHeader>{`Delete ${props.selectedDatas.first_name}`}</ModalHeader>
      <ModalBody>
        <div>{`Are you sure want to delete ${props.selectedDatas.first_name} ${props.selectedDatas.last_name} ?`}</div>
      </ModalBody>
      <ModalFooter>
        <Button
          className="yesButton"
          id="delete_confirm"
          onClick={() => props.deleteData([props.selectedDatas.id])}
        >
          Yes
        </Button>
        <Button
          className="noButton"
          id="delete_deny"
          onClick={() => props.delete(false)}
        >
          No
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteModal;
