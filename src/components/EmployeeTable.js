import React from "react";
import { Table } from "reactstrap";
import Humanize from "./Humanize";

const Tables = (props) => {
  const tableHeader = ["first_name", "last_name", "username", "email"];

  return (
    <>
      <Table hover bordered>
        <thead>
          <tr className="title" key="tableHeader">
            {tableHeader.map((header) => {
              return <td key={header}>{Humanize(header)}</td>;
            })}
          </tr>
        </thead>
        <tbody>
          {props.data.map((data) => {
            let tableValues = tableHeader.map((value) => {
              return (
                <td key={value + data[value] + data.id}>
                  {data[value]}
                </td>
              );
            });
            return (
              <tr key={data[tableHeader[0]] + data.id}>
                {tableValues}
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default Tables;
