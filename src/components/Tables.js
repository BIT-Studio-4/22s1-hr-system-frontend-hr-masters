import React from "react";
import { Button, Table } from "reactstrap";


// Will use these once the features work
 import NotesModal from "./Modal/NotesModal";


const Tables = (props) => {

  const tableHeader = ["first_name", "last_name", "username", "email"];
  //converts the string to be read by humans
  function humanize(str) {
    let result = str.replace(/(^\w)|(_\w)/g, (match) => match.toUpperCase());
    result = result.replace("_", " ");
    return result;
  }

  //create the update button
  const updateButton = (data) => {
    let id_name =
      data[tableHeader[0]] +
      "_" +
      data[tableHeader[1]];
      //Cameron_Ashworth
    return (
      <td>
        <Button
          key={"upButton" + data.id}
          className="updateButton"
          id={"update_" + id_name}
          onClick={() => props.update(data, true)} 
        >
          <img alt="update button" src="https://cdn.discordapp.com/attachments/866914474140237857/907053502851858452/icons8-update-24.png" />
        </Button>
      </td>
    );
  };


  //create the delete button
  const deleteButton = (data) => {
    let id_name =
      data[tableHeader[1]] +
      "_" +
      data[tableHeader[2]];
    return (
      <td>
        <Button
          key={"delButton" + data.id}
          className="deleteButton"
          id={"delete_" + id_name}
          onClick={() => props.delete(data, true)}
        >
            <img alt="delete button" src="https://cdn.discordapp.com/attachments/866914474140237857/907053365219967067/icons8-delete-24.png"/>
        </Button>
      </td>
    );
  };

    //create the update button
  const performanceButton = (data) => {
    let id_name =
    data[tableHeader[0]] +
    "_" +
    data[tableHeader[1]];
      return (
        <td>
          <Button
            key={"performance" + data.id}
            className="performanceButton"
            id={"performance_" + id_name}
            onClick={() => props.performancePlan(data,id_name,true)} 
          >
              <img alt="performance button" src="https://cdn.discordapp.com/attachments/866914474140237857/907056265618944020/icons8-note-24.png"/>
          </Button>
        </td>
      );
  };

  //change url after select an specified employee
  const changeUrl = (id) => { 
    props.addLocation(`employee/${id}`);
    props.SetShow(false);//to hide the create button on the page
  }

  const Render = Array.isArray(props.data) ?
 (
  <>
  <h2>Employees</h2>
  <Table hover bordered>
    <thead>
      <tr className="title" key="tableHeader">
        {tableHeader.map((header) => {
          return <td key={header}>{humanize(header)}</td>;
        })}
        </tr>
    </thead>
    <tbody>
      {props.data.map((data) => {
        return (
          <tr key={data.id}>
            <td><button className="btn info" onClick={() => changeUrl(data.id)} >{data.first_name}</button></td>
            <td><button className="btn info" onClick={() => changeUrl(data.id)} >{data.last_name}</button></td>   
            <td><button className="btn info" onClick={() => changeUrl(data.id)} >{data.username}</button></td>
            <td><button className="btn info" onClick={() => changeUrl(data.id)} >{data.email}</button></td>    
          </tr>
        );
      })}
    </tbody>
  </Table>
  </>
 ): (
  <>
      <h2>The Employee</h2>
      <Table hover bordered>
        <thead>
          <tr className="title" key="tableHeader">
            {tableHeader.map((header) => {
              return <td key={header}>{humanize(header)}</td>;
            })}
              {<td className ="title" key = "performance_plan" > Performance Plan</td >}
              {<td className="title" key = "notes_header">Notes</td>}
              {<td className="title" key = "update_header">Update</td>}
              {<td className="title" ke y= "delete_header">Delete</td>}
            </tr>
        </thead>
        <tbody>
          <tr key={props.data[tableHeader[0]] + props.data.id}>
          <td>{props.data.first_name}</td>
          <td>{props.data.last_name}</td>
          <td>{props.data.username}</td>
          <td>{props.data.email}</td>
            { performanceButton(props.data)}
            {<NotesModal id={props.data.id} />}
            {updateButton(props.data)}
            {deleteButton(props.data)}
          </tr>
          </tbody>
        </Table>{/*  go back function just refresh the page */}
        <Button color='success' style={{ marginTop: '20px' }} onClick={() => window.location.reload(false)} >
            Go Back
          </Button>  
      </>
    )
  return Render;
}

export default Tables;
