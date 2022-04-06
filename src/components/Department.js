import React, { useState } from "react";
import DeptTable from "./DeptTable";

import { Route, Routes, Outlet } from "react-router-dom";

const Department = () => {
    const [deptData, setDeptData] = useState({}); //stores the data of the api request

    function dataForRoute(data) {
        setDeptData(data);
    }

    return (
        <div>
            <Routes>
                <Route index element={<DeptTable dataForRoute={(data) => dataForRoute(data)} />} />
            </Routes>
            <Outlet />
        </div>
    )
};

export default Department;