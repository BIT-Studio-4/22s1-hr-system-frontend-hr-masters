// import { Button } from "bootstrap";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Button } from "reactstrap";
import Api from "./Api";

const DeptTable = (props) => {
    const [deptData, setDeptData] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        fetchData()
    }, []);

    function fetchData() {
        Api.getData("department")
            .then((response) => {
                setDeptData(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    function goToRoute(data) {
        props.dataForRoute(data);
        navigate(data.name);
    }

    return (
        <div>
            <h1>Departments</h1>
            {deptData ? (
                <Table hover bordered>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {deptData.map((data) => {
                            return (
                                <tr key={"tr_" + data.id} >
                                    <td>{data.id}</td>
                                    <td>{data.name}</td>
                                    <td>
                                        <Button onClick={() => goToRoute(data)}>
                                            go to {data.name}
                                        </Button>
                                    </td>
                                </tr>
                            );
                        })
                        }
                    </tbody>
                </Table>
            ) : (null)}
        </div>
    )
};

export default DeptTable;