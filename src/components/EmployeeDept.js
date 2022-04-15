import React, { useState, useEffect } from "react";
import EmployeeTable from "./EmployeeTable"
import Api from "./Api"

const EmployeeDept = (props) => {
    const [employeeData, setEmployeeData] = useState([]); //stores the data of the api request

    useEffect(() => {
        Api.getData(`employee?filter[department_id]=${props.deptData.id}`)
        .then((response) => {
            setEmployeeData(response.data);
            console.log(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [props.deptData.id]);


    return (
        <div>
            <h1>Employees in {props.deptData.name}</h1>
            {employeeData ? (
                <EmployeeTable data={employeeData} />
            ) : (null)}
        </div>
    )
};

export default EmployeeDept;