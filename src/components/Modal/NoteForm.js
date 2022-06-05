import { React, useState, useEffect } from 'react'
import {
    Form,
    FormGroup,
    Button,
    Input,
    Label
} from 'reactstrap'

import Api from "../Api";

const NoteForm = (props) => {
    const [noteID, setNoteID] = useState("")
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")

    useEffect(() => {
        if (props.noteID !== "") {
            Api.getData('notes/' + props.noteID)
                .then((response) => {
                    setTitle(response.data.notesTitle);
                    setBody(response.data.notesDescription);
                    setNoteID(props.noteID);
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [props.noteID])

    const submit = () => {
        if (noteID !== "") {
            //update note
        }
        else {
            //create note
        }
    }

    return (
        <>
            <Form>
                <FormGroup>
                    <Label for="title">
                        Title
                    </Label>
                    <Input
                        id="NoteTitle"
                        name="title"
                        type="text"
                        value={title}
                        placeholder={title}
                    />
                </FormGroup>
                <br />
                <FormGroup>
                    <Label for="body">
                        Body
                    </Label>
                    <Input
                        id="noteBody"
                        name="body"
                        type="textarea"
                        value={body}
                        placeholder={body}
                    />
                </FormGroup>
                <br />
                <Button onClick={submit}>
                    Submit
                </Button>
            </Form>
            <hr />
        </>
    )
}

export default NoteForm;