import  { React, useState } from 'react'
import {
    Button,Form,Label,Input,Modal,ModalHeader,ModalBody,ModalFooter,
    FormText,ButtonToolbar,ButtonGroup
} from "reactstrap";
  
import Humanize from "../Humanize";
import Api from "../Api";

const PerformancePlanModal = (props) => {
  const [error, setError] = useState({});
  const [newSelectedData, setNewSelectedData] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);
  const [isCreate, setIsCreate] = useState(false);
  const [isDisplay, setIsDisplay] = useState(false);
  let selectedDatas = props.selectedDatas.data;
  let employeeName = props.employeeNamePerformance;
  let employeeId = props.employeeId;
  let performanceId = [];
  console.log(selectedDatas);
  
  const description = {
    "initial_goal": "The first field should be a changeable initial goal.",
    "specific": "What do you want to accomplish? Who can help you get there? When do you want this? Why is this your goal?",
    "measureable": "How can you measure progress and know if you've successfully met your goal?",
    "achievable": "Do you have the required skills to achieve this goal? If not can you obtain them? Is the amount of effort required on par with what this goal will achieve?",
    "relevant": "Why am I setting this goal now? Is it aligned with overall objectives?",
    "time_bound": "What the deadline and is it realistic?",
    "goal_statement": "Based on what their answers have revealed in the answers above."  
  }

  const storeId = () => { 
    if (selectedDatas) { 
      performanceId.push(selectedDatas.id)
      console.log("performanceId"+performanceId)
    }   
  }
  storeId() 
  
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
    if (isCreate) {
      selectedDatas = {};
    }
    if (selectedDatas !== undefined) {
      let labels = [];
      for (const [key, val] of Object.entries(description)) {          
              labels.push (
                <Label key={key}>
                  {Humanize(key)}
                  <br />               
                  <FormText>
                    {val}
                  </FormText>
                      <Input
                          name={key}
                          type="text"
                          id={key + "_textbox"}
                          value={newSelectedData[key] || ""}
                          placeholder={selectedDatas[key]}                       
                          onChange={(e) => handleInputChange(e)}
                          validations="required"
                      />
                      <p id={"error_" + key} style={{ color: "red" }}>
                          {error[key]}
                      </p>
                  </Label>
              );
          };
          return <Form>{labels}</Form>;
      }
  };
   
  const performance_detail = () => {
    if (selectedDatas !== undefined) {
      let labels = [];
      for (const [key, val] of Object.entries(description)) {          
              labels.push (
                <Label key={key}>
                 {Humanize(key)}
                  <br />               
                  <p>{val}</p>
                  <br /> 
                  <p id={key + "_textbox"}>{selectedDatas[key]} </p>
                  <p id={"error_" + key} style={{ color: "red" }}>
                          {error[key]}
                      </p>
                  </Label>
              );
          };
          return <ModalBody>{labels}</ModalBody>;
      }
  }

  //close the form modal
  function closeForm() { 
    props.setShowPerformance(false);
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
    let url = "performance";
    url += "/" + id;
    console.log(url)

    Api.putData(url, sendData)
      .then((response) => {
        console.log(response);
        props.setMainMessage(`Update: ${response.status} ${response.statusText}`);
        closeForm();
      })
      .catch((error) => {
        let copyError = {};
        copyError.main = error.toString();
        setError(copyError);
      });
  }

  function postData() {
    let sendData = {};
    let url = "performance";
    for (const [key, value] of Object.entries(newSelectedData)) {
      if (value !== "") {
        sendData[key] = value;
      sendData.employee_id = employeeId;
      }
    }
    Api.postData(url, sendData)
      .then((response) => {
        console.log(response);
        props.setMainMessage(`Update: ${response.status} ${response.statusText}`);
        closeForm();
        props.setFetchTrigger(true);
      })
      .catch((error) => {
/*         console.log(error.response.data.errors);
        let copyError = {};
        for(const [key, val] of Object.entries(error.response.data.errors)) {
          copyError[key] = val.toString()
        }
        copyError.main = error.response.data.message.toString();
        setError(copyError); */
      });
  }

  const updatePerformance = () => {
    setIsUpdate(true);
  }
  const createNewForm = () => { 
    setIsCreate(true);
    setIsUpdate(true);
  }
  const displayPerformance = () => { 
    setIsDisplay(true);
  }
  const notDisplayPerformance = () => { 
    setIsDisplay(false);
  }
  return (
    <Modal isOpen={props.showPerformance} toggle={() => closeForm()}>
      <ModalHeader>{"Performance Plan  ----" + Humanize(employeeName)}</ModalHeader>
      <ModalBody>
        {!isUpdate ? 
          <>
          <Button outline className="createButton" onClick={() => createNewForm()}>
          Create a new
            </Button>
            <br />
            <br />
            <ButtonToolbar aria-label="Toolbar with button groups">
            <ButtonGroup className="me-2" aria-label="First group">
                <Button onClick={() => displayPerformance()}>1</Button>
                <Button onClick={() => notDisplayPerformance()}>2</Button>
                <Button>3</Button> 
            </ButtonGroup>

          </ButtonToolbar>
            {isDisplay ?
              <> {performance_detail()}</>
            :null 
            }
            
          </>
         :
          <>
            <Button outline className="resetButton" onClick={() => clearForm()}>
            Reset new input
            </Button>
            {form()}
         </>
          
        }
        <p id="error_main" style={{ color: "red" }}>
          {error.main}
        </p>
      </ModalBody>
      <ModalFooter>  
        {!isUpdate ? 
          <>
          <Button className="updateButton" id="update_button" onClick={() => updatePerformance()}>
            Update
          </Button>
          </> 
          : 
          <>
            { isCreate ? (
              <>
                  <Button className="saveButton" id="save_button" onClick={() => postData()}>
                  Save Changes
                </Button>     
                </>
            ) :
              <Button className="saveButton" id="save_button" onClick={() => prepareData()}>
                  Save Changes
                </Button>}
              
            </>            
        }
        <Button className="cancelButton" id="cancel_button" onClick={() => closeForm()}>
                  Cancel
       </Button>
      </ModalFooter>
    </Modal>
  );
};
     

export default PerformancePlanModal;