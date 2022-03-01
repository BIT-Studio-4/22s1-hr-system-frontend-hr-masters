import  { React, useState } from 'react'
import { Modal, Button, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

import Api from "./Api";

const PerformancePlanModal = (props) => {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => setIsOpen(!isOpen)
    const [data, setData] = useState()
    const [fetchTrigger, setFetchTrigger] = useState(true)

    let button = <td><Button
        outline color='dark'
        onClick={toggle}><img src="https://cdn.discordapp.com/attachments/866914474140237857/907056265618944020/icons8-note-24.png"/>
        </Button>
    </td>

    const get_data = () => {
        let url = 'notes'
        Api.getData(url + '?filter[employeeID]=' + props.id)
        .then((response) => {
            setFetchTrigger(false);
            setData(response.data);
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const notes = () => {
        return (
            data.map((listValue, index) => {
                return (
                    <ModalBody>
                    <p><b>No. {index + 1}: </b></p>
                    <br/>
                    </ModalBody>
                )
            })
        )
    }

    return (
        <>
        {button}
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader>
            Performance Plan
            </ModalHeader>
            
                {isOpen && fetchTrigger ? (
                get_data()
                ) : null}

                {data ? (
                notes()
                ) : null}
            
            <ModalFooter>
                <Button color="dark" onClick={toggle}>Cancel</Button>
            </ModalFooter>
        </Modal>
        </>
    )
}

export default PerformancePlanModal;