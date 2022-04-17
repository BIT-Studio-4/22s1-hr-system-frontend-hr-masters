import { React, useState } from 'react'
import { Modal, Button, ModalHeader, Table } from 'reactstrap'

import Api from "../Api";

const FilesModal = (props) => {

  const [isOpen, setIsOpen] = useState(false)
  const toggle = () => setIsOpen(!isOpen)
  const [data, setData] = useState()
  const [fetchTrigger, setFetchTrigger] = useState(true)

  let button = <td><Button
    outline color="dark"
    onClick={toggle}> <img alt="file icon" src="https://cdn.discordapp.com/attachments/866914474140237857/907056264360640622/icons8-file-24.png" />
  </Button></td>


  // returns a better format for the timestamps
  const getTime = (timeStamp) => {
    let date = new Date(timeStamp)
    return date.toLocaleString();
  }

  // Returns the information for the table
  const table = () => {
    return (
      <Table>
        <thead>
          <tr>
            <td>File</td>
            <td>Created at</td>
            <td>Updated at</td>
          </tr>
        </thead>
        <tbody>
          {data.map((listValue, index) => {
            return (
              <tr key = {index}>
                <td>{listValue.fileLink}</td>
                <td>{getTime(listValue.created_at)}</td>
                <td>{getTime(listValue.updated_at)}</td>
              </tr>
            )
          })}
        </tbody>
      </Table>
    )
  }

  //sends a request for files the selected user has on them.
  const get_data = () => {
    let url = 'file'
    Api.getData(url + '?filter[employee_id]=' + props.id)
      .then((response) => {
        setFetchTrigger(false);
        setData(response.data);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <>
      {button}
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader>Files</ModalHeader>
        {/* Once the modal is open and fetchTrigger is active, it will ask for the data */}
        {isOpen && fetchTrigger ? (
          get_data()
        ) : null}
        {/* Once it has data, it will show the table */}
        {data ? (
          table()
        ) : null}
        {/* file elements will go here */}
        <Button color="dark" onClick={toggle}>Cancel</Button>
      </Modal>
    </>
  )
}
export default FilesModal;
