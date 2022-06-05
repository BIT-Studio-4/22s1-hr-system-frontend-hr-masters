import {
    React,
    useState,
    useEffect
} from 'react'
import {
    Form,
    FormGroup,
    Button,
    Input,
    Label,
    Spinner
} from 'reactstrap'

import Api from "../Api";

const NoteForm = (props) => {
    const defaultData = { employeeID: props.employeeID, notesTitle: "", notesDescription: "" };

    const [noteID, setNoteID] = useState("")
    const [data, setData] = useState(defaultData)
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (props.noteID !== "") {
            setIsLoading(true);
            Api.getData('notes/' + props.noteID)
                .then((response) => {
                    let tempData = { employeeID: props.employeeID, notesTitle: "", notesDescription: "" };
                    tempData.notesTitle = response.data.notesTitle;
                    tempData.notesDescription = response.data.notesDescription;
                    setData(tempData);
                    setNoteID(props.noteID);
                    setIsLoading(false);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [props.noteID, props.employeeID])

    //Update the form field
    const handleInputChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        let tempData = data;
        tempData[name] = value;
        setData(tempData);
    }

    const submit = () => {
        let url = "notes";
        setIsLoading(true);

        if (noteID !== "") {
            url += "/" + props.noteID;
            put(url);
            return;
        }

        post(url);
    }

    const put = (url) => {
        Api.putData(url, data)
            .then((response) => {
                setData(defaultData);
                setNoteID("");
                props.setFetchTrigger(true);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setIsLoading(false);
            });
    }

    const post = (url) => {
        Api.postData(url, data)
            .then((response) => {
                setData(defaultData);
                props.setFetchTrigger(true);
                setIsLoading(false);
            })
            .catch((error) => {
                console.log(error.response.data);
                setIsLoading(false);
            });
    }

    return (
        <>
            {isLoading ? (
                <Spinner>
                    &nbsp;
                </Spinner>
            ) : (
                <Form>
                    <FormGroup>
                        <Label for="notesTitle">
                            Title
                        </Label>
                        <Input
                            id="notesTitle"
                            name="notesTitle"
                            type="text"
                            defaultValue={data.notesTitle || ""}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </FormGroup>
                    <br />
                    <FormGroup>
                        <Label for="notesDescription">
                            Body
                        </Label>
                        <Input
                            id="notesDescription"
                            name="notesDescription"
                            type="textarea"
                            defaultValue={data.notesDescription || ""}
                            onChange={(e) => handleInputChange(e)}
                        />
                    </FormGroup>
                    <br />
                    <Button onClick={submit}>
                        Submit
                    </Button>
                </Form>
            )}
            <hr />
        </>
    )
}

export default NoteForm;