import React, { useState } from "react";

import {
  Button,
  Form,
  Label,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";

import Humanize from "../Humanize";
import Api from "../Api";
import "../css/UpdateModal.css";

const FormModal = (props) => {
  const [error, setError] = useState({});
  const [newSelectedData, setNewSelectedData] = useState({});
  const tableHeaders = props.tableHeaders;
  let selectedDatas = props.selectedDatas;

  //Clears the form
  function clearForm() {
    setNewSelectedData({});
  }

  //Update the form field
  function handleInputChange(e) {
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    const name = e.target.name;
    resetError(name)

    let copySelectedData = Object.assign({}, newSelectedData);
    copySelectedData[name] = value;
    setNewSelectedData(copySelectedData);
  }

  //resets the error message when typing in that field
  const resetError = (name) => {
    let errors = error;
    errors[name] = '';
    let counter = 0;

    for (const [key, val] of Object.entries(errors)) {
      if ((val !== "") && (key !== "main")) {
        counter++;
      }
    }

    if (counter === 0) {
      errors.main = "";
    }
    setError(errors);
  }

  //Creates the form layout
  const form = () => {
    if (props.formType === 'create') {
      selectedDatas = {};
    }
    if (tableHeaders !== undefined) {
      let labels = tableHeaders.map((header) => {
        return (
          <Label key={header}>
            {Humanize(header)}
            <Input
              name={header}
              type="text"
              id={header + "_textbox"}
              value={newSelectedData[header] || ""}
              placeholder={selectedDatas[header]}
              onChange={(e) => handleInputChange(e)}
              validations="required"
            />
            <p id={"error_" + header} style={{ color: "red" }}>
              {error[header]}
            </p>
          </Label>
        );
      });
      return <Form>{labels}</Form>;
    }
  };

  //close the form modal
  function closeForm() {
    props.handleShowForm(false);
    setError({});
  }

  //setup the data and checks if anything has changed
  function prepareData() {
    let copyError = {};
    let sendData = {};

    for (const [key, value] of Object.entries(newSelectedData)) {
      if (value !== "") {
        sendData[key] = value;
      }
    }

    if (Object.keys(sendData).length === 0) {
      copyError.main = "Nothing has been changed on this form.";
      setError(copyError);
    }
    else {
      put(selectedDatas.id, sendData)
    }
  }

  //Send a put request to the API
  function put(id, sendData) {
    let url = props.location.toLowerCase();
    url += "/" + id;

    Api.putData(url, sendData)
      .then((response) => {
        console.log(response);
        props.setMainMessage(`Update: ${response.status} ${response.statusText}`);
        closeForm();
        //props.setFetchTrigger(true);
      })
      .catch((error) => {
        let copyError = {};
        copyError.main = error.toString();
        setError(copyError);
      });
  }

  function postData() {
    let sendData = {};

    for (const [key, value] of Object.entries(newSelectedData)) {
      if (value !== "") {
        sendData[key] = value;
      }
    }
    Api.postData(props.location.toLowerCase(), sendData)
      .then((response) => {
        console.log(response);
        props.setMainMessage(`Update: ${response.status} ${response.statusText}`);
        closeForm();
        //props.setFetchTrigger(true);
      })
      .catch((error) => {
        console.log(error.response.data.errors);
        let copyError = {};
        for(const [key, val] of Object.entries(error.response.data.errors)) {
          copyError[key] = val.toString()
        }
        //error.response.data.error.toString();

        copyError.main = error.response.data.message.toString();
        setError(copyError);
      });
  }


  return (
    <Modal isOpen={props.showForm} toggle={() => closeForm()}>
      {props.formType === 'update' ?
        <ModalHeader>{`Update ${selectedDatas.first_name} ${selectedDatas.last_name}`}</ModalHeader>
        :
        <ModalHeader>{`Create new employee`}</ModalHeader>
      }
      <ModalBody>
        <Button outline className="resetButton" onClick={() => clearForm()}>
          Reset form
        </Button>
        {form()}
        <p id="error_main" style={{ color: "red" }}>
          {error.main}
        </p>
      </ModalBody>
      <ModalFooter>
        {props.formType === 'update' ?
          <Button className="saveButton" id="save_button" onClick={() => prepareData()}>
            Save Changes
          </Button>
          :
          <Button className="saveButton" id="save_button" onClick={() => postData()}>
            Save Changes
          </Button>
        }
        <Button className="cancelButton" id="cancel_button" onClick={() => closeForm()}>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default FormModal;
