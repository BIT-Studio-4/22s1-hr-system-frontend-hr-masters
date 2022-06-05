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
    const [showConfirm, setShowConfirm] = useState(false)
    const [deleteNoteData, setDeleteNoteData] = useState({})

    const handleClickOpen = (e, note) => {
        e.stopPropagation();
        setDeleteNoteData(note);
        setShowConfirm(true);
    };

    const handleClose = () => {
        setShowConfirm(false);
    };

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
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const editNote = (noteID) => {
        setNoteID(noteID)
    }

    function changeBackground(e, color) {
        e.currentTarget.style.background = color;
    }

    const deleteNote = (noteID) => {
        let url = "notes/" + noteID;
        Api.deleteData(url)
            .then((response) => {
                handleClose()
                setFetchTrigger(true);
            });
    }

    const notes = () => {
        return (
            data.map((listValue, index) => {
                return (
                    <>
                        <Card
                            key={listValue.id}
                            id={"Card" + index}
                        >
                            <CardBody
                                onClick={() => editNote(listValue.id)}
                                onMouseEnter={(e) => changeBackground(e, "grey")}
                                onMouseLeave={(e) => changeBackground(e, "white")}
                            >
                                <Button
                                    style={{ marginLeft: "90%" }}
                                    color="secondary"
                                    onClick={(e) => { handleClickOpen(e, listValue) }}
                                >
                                    X
                                </Button>
                                <CardTitle tag="h5">{listValue.notesTitle}</CardTitle>
                                <CardText>
                                    {listValue.notesDescription}
                                </CardText>
                            </CardBody>
                        </Card>
                    </>
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
                        setFetchTrigger={setFetchTrigger}
                        employeeID={props.id}
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
                {showConfirm ? (
                    <Modal isOpen={showConfirm} toggle={() => handleClose()}>
                        <ModalHeader>{`Delete ${deleteNoteData.notesTitle}`}</ModalHeader>
                        <ModalBody>
                            <div>{`Are you sure want to delete ${deleteNoteData.notesTitle} ?`}</div>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                className="yesButton"
                                id="delete_confirm"
                                onClick={() => deleteNote(deleteNoteData.id)}
                            >
                                Yes
                            </Button>
                            <Button
                                className="noButton"
                                onClick={() => handleClose()}
                            >
                                No
                            </Button>
                        </ModalFooter>
                    </Modal>
                ) : null}
            </Modal>
        </>
    )
}

export default NotesModal;