import { React, useState } from 'react'
import {
    Modal,
    Button,
    Card,
    CardBody,
    CardText,
    CardTitle,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap'

import Api from "../Api";
import NoteForm from './NoteForm';

const NotesModal = (props) => {
    const [isOpen, setIsOpen] = useState(false)
    const toggle = () => setIsOpen(!isOpen)
    const [data, setData] = useState()
    const [fetchTrigger, setFetchTrigger] = useState(true)
    const [noteID, setNoteID] = useState("")

    let button = <td><Button
        outline color='dark'
        onClick={toggle}><img alt="note icon" src="https://cdn.discordapp.com/attachments/866914474140237857/907056265618944020/icons8-note-24.png" />
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

    const editNote = (noteID) => {
        console.log("edit:", noteID)
        setNoteID(noteID)
    }

    function changeBackground(e, color) {
        e.currentTarget.style.background = color;
    }

    const notes = () => {
        return (
            data.map((listValue, index) => {
                return (
                    <Card
                        onClick={(id) => editNote(listValue.id)}
                        key={listValue.id}
                        id={"Card" + index}
                        onMouseEnter={(e) => changeBackground(e, "grey")}
                        onMouseLeave={(e) => changeBackground(e, "white")}
                    >
                        <CardBody>
                            <CardTitle tag="h5">{listValue.notesTitle}</CardTitle>
                            <CardText>
                                {listValue.notesDescription}
                            </CardText>
                        </CardBody>
                        <br />
                    </Card>
                )
            })
        )
    }

    return (
        <>
            {button}
            <Modal isOpen={isOpen} toggle={toggle}>
                <ModalHeader>
                    Notes
                </ModalHeader>
                <ModalBody>
                    <NoteForm
                        noteID={noteID}
                    />
                    {isOpen && fetchTrigger ? (
                        get_data()
                    ) : null}

                    {data ? (
                        <section style={{ height: "20rem", overflowY: "scroll" }}>
                            {notes()}
                        </section>
                    ) : null}

                </ModalBody>
                <ModalFooter>
                    <Button color="dark" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

export default NotesModal;