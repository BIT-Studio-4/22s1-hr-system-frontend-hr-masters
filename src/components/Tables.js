import React from "react";
import { Button, Table } from "reactstrap";

// Will use these once the features work
// import NotesModal from "./Modal/NotesModal";
// import FilesModal from "./Modal/FilesModal"

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
  
  return (
    <>
    <h2>Employees</h2>
    <Table hover bordered>
      <thead>
        <tr className="title" key="tableHeader">
          {tableHeader.map((header) => {
            return <td key={header}>{humanize(header)}</td>;
          })}
          <td className="title" key="performance_plan">Performance Plan</td>
{/*       Will implement these back when the features work   
          <td className="title" key="notes_header">Notes</td>
          <td className="title" key="file_header">Files</td> */}
          <td className="title" key="update_header">Update</td>
          <td className="title" key="delete_header">Delete</td>

        </tr>
      </thead>
      <tbody>
        {props.data.map((data) => {
          let tableValues = tableHeader.map((value) => {
            return (
              <td
                key={value + data[value] + data.id}
              >
                {data[value]}
              </td>
            );
          });
          return (
            <tr key={data[tableHeader[0]] + data.id}>
              {tableValues}
              {performanceButton(data)}
              {/*               <NotesModal
              id={data.id} />
              <FilesModal 
                id={data.id} /> */}
              {updateButton(data)}
              {deleteButton(data)}
            </tr>
          );
        })}
      </tbody>
    </Table>
    </>
  );
};

export default Tables;
