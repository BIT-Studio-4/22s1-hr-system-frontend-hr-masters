import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, BrowserRouter as Router } from "react-router-dom";

import Api from "./components/Api";
import Tables from "./components/Tables";
import DeleteModal from "./components/Modal/DeleteModal";
import UpdateModal from "./components/Modal/UpdateModal";
import Navigation from "./components/Navigation";
import Login from "./components/Login";


import './App.css';
import { Button } from "reactstrap";
import PerformancePlanModal from "./components/Modal/PerformancePlanModal";

const App = () => {
  const [responseData, setResponseData] = useState(""); //stores the data of the api request
  const [location, setLocation] = useState("employee"); //tells the system what table to use... future plans
  const [fetchTrigger, setFetchTrigger] = useState(true); //lets the system know if it needs to fetch the data again
  const [mainMessage, setMainMessage] = useState(""); //main message system, to let the user know if it was successful
  const [selectedData, setSelectedData] = useState(""); //gives data of the current selected object from the table
  const [formType, setFormType] = useState(""); //future use if we want create and update to be both modal
  const [showDelete, setShowDelete] = useState(false); //toggle to show delete modal
  const [showForm, setShowForm] = useState(false); // toggle to show update form
  const [loggedIn, setLoggedIn] = useState(false); // status of if the user is logged in
  const [showPerformance, setShowPerformance] = useState(false);//toggle to show performance modal 
  const [performanceData, setPerformanceData] = useState("");//stores the data of performancePlan
  const [employeeNamePerformance, SetEmployeeNamePerformance] = useState("");//stores the name or employee of performancePlan
  const [employeeId, SetEmployeeId] = useState();
  const tableHeaders = {
    employee: [
      "first_name",
      "last_name",
      "username",
      "email",
    ]
  }

  // Checks if the user is loggedIn based on the localStorage
  useEffect(() => {
    //NOTE: bool in localstorage doesn't behave for if statements.
    let deletestorage = localStorage.delete === 'true';

    if (deletestorage) {
      sessionStorage.clear();
    }

    if (localStorage.auth_name != null && sessionStorage.auth_name == null) {// Is that close brower it will still store the data?
      sessionStorage.auth_name = localStorage.auth_name;
      sessionStorage.auth_token = localStorage.auth_token;
    }

    let auth_name = sessionStorage.auth_name;
    let auth_token = sessionStorage.auth_token;

    if (auth_name != null && auth_token != null) {
      setLoggedIn(true);
    }
    else {
      setLoggedIn(false);
      if (window.location.pathname.substr(1) !== 'login') {// unclear
        window.location.href = '/login';
      }
    }

  });

  //Fetches data when triggered
  useEffect(() => {
    if (fetchTrigger) {
      fetchData();  
    }
  });

  //Fetches the data
  function fetchData() {
    let url = location.toLowerCase();
    Api.getData(url)
      .then((response) => {
        setFetchTrigger(false);
        if (showPerformance) {
          setPerformanceData(response);
          setLocation('employee');
        }
        else { 
          setResponseData(response);
        }    
        console.log(response)
      })
      .catch((error) => {
        console.log(error);
      });
  }


  //Handles the delete status
  function handleDeleteStatus(data, deleteStatus) {
    setLocation("employee");
    setSelectedData(data);
    setShowDelete(deleteStatus);
  }

  //request to delete id
  function handleDeleteData(id) {
    let url = location.toLowerCase() + "/" + id;
    Api.deleteData(url)
      .then((response) => {
        //Need a better message from the api
        setMainMessage(`Delete "${selectedData.first_name} ${selectedData.last_name}": ${response.statusText}`);
        setShowDelete(false);
        fetchData();
      });
  }

  //handles formModal status
  function handleShowForm(type, data, formStatus) {
    setSelectedData(data);
    setFormType(type);
    setShowForm(formStatus);
  }

  //location could not be reset yet 
  function handlePerformanceForm(id, name, performanceStatus) {
    setShowPerformance(performanceStatus);
    if (performanceStatus) {
      setLocation(`performance?employee_id=${id}`); 
      setFetchTrigger(true);
      SetEmployeeNamePerformance(name)
      SetEmployeeId(id)
    }
  }

  return (
    <div className="App">
      <Navigation
        setLoggedIn={(status) => setLoggedIn(status)}
        loggedIn={loggedIn}
      />
      {loggedIn ? (
        <Router>
          <Route path="/employees">
            <section className="mainContent">

              <p id="mainMessage">{mainMessage}</p>
              {responseData ? (
                <>
                <section className="tableSection">
                  <Tables
                    data={responseData.data}
                    update={(data, updateStatus) => handleShowForm("update", data, updateStatus)}
                    delete={(data, deleteStatus) => handleDeleteStatus(data, deleteStatus)}
                    //pass props to performancePlan
                    performancePlan={(id, name, performanceStatus) => handlePerformanceForm(id, name,performanceStatus)}
                  />
                </section>
                  <Button className="createButton" id="create_button" onClick={() => handleShowForm("create", selectedData, true)}>
                  Create
                </Button>
                </>
              ) : (
                <h3>loading</h3>
              )}

            </section>
          </Route>
        </Router>
      ) : (
        <Router>
          <Route path="/login">
            <Login
              loggedIn={(status) => setLoggedIn(status)} />
          </Route>
        </Router>
      )}
      {showPerformance ? (
        <PerformancePlanModal
          selectedDatas={performanceData}
          showPerformance={showPerformance}
          setShowPerformance={setShowPerformance}
          setMainMessage={setMainMessage}
          employeeNamePerformance={employeeNamePerformance}
          employeeId={employeeId}
        />
      ) : null}
      {showForm ? (
        <UpdateModal
          selectedDatas={selectedData}
          showForm={showForm}
          tableHeaders={tableHeaders[location]}
          location={location}
          formType={formType}
          setFetchTrigger={setFetchTrigger}
          setMainMessage={setMainMessage}
          handleShowForm={(updateStatus) =>
            handleShowForm("", {}, updateStatus)
          }
        />
      ) : null}

      {showDelete ? (
        <DeleteModal
          location={location}
          selectedDatas={selectedData}
          showDelete={showDelete}
          delete={(deleteStatus) => handleDeleteStatus({}, deleteStatus)}
          deleteData={(id) => handleDeleteData(id)}
        />
      ) : null}
    </div>
  );
};

export default App;
