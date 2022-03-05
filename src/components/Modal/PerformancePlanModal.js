import  { React, useState } from 'react'
import {
    Button,
    Form,
    Label,
    Input,
    Modal,
    ModalHeader,
    ModalBody,
  ModalFooter,
    FormText
} from "reactstrap";
  
import Humanize from "../Humanize";
import Api from "../Api";

const PerformancePlanModal = (props) => {
  const [error, setError] = useState({});
  const [newSelectedData, setNewSelectedData] = useState({});
  const planHeaders = props.planHeaders;
  let selectedDatas = props.selectedDatas;
  let buttonLable = '';
  const description = {
    "initial_goal": "The first field should be a changeable initial goal.",
    "specific": "What do you want to accomplish? Who can help you get there? When do you want this? Why is this your goal?",
    "measureable": "How can you measure progress and know if you've successfully met your goal?",
    "achievable": "Do you have the required skills to achieve this goal? If not can you obtain them? Is the amount of effort required on par with what this goal will achieve?",
    "relevant": "Why am I setting this goal now? Is it aligned with overall objectives?",
    "time_bound": "What the deadline and is it realistic?",
    "goal_statement": "Based on what their answers have revealed in the answers above."  
  }

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
    if (selectedDatas === {}) {//deos it correct?
      buttonLable = "create";
    }
      if (planHeaders !== undefined) {
          let labels = planHeaders.map((header) => {
              return (
                  <Label key={header}>
                  {Humanize(header)}
                  <br/>
                  <FormText>
                    {description[header]}
                  </FormText>
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
    props.handlePerformanceForm(false);
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
    //let url = props.location.toLowerCase();
    let url = "performance";
    url += "/" + id;

    Api.putData(url, sendData)
      .then((response) => {
        console.log(response);
        props.setMainMessage(`Update: ${response.status} ${response.statusText}`);
        closeForm();
        props.setFetchTrigger(true);
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
        props.setFetchTrigger(true);
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
    <Modal isOpen={props.showPerformance} toggle={() => closeForm()}>
        <ModalHeader>"Performance Plan"</ModalHeader>
 
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
        {buttonLable === 'create' ?
          <Button className="saveButton" id="save_button" onClick={() => postData()}>
            Save Changes
          </Button>
          :
          <Button className="saveButton" id="save_button" onClick={() => prepareData()}>
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
     

export default PerformancePlanModal;