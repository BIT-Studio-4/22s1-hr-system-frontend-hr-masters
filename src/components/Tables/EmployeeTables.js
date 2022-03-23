import { Link } from 'react-router-dom'
import { Table, Button } from 'reactstrap'
import Modal from '../Modals/Modal'
import { useParams } from 'react-router'
import { useState } from 'react'


const EmployeeTables = (props) => {
  const BASE_URL = props.BASE_URL
  const { id } = useParams()
  const [SUB_URL] = useState('api/employee')
  const sub = id? `${SUB_URL}/${id}`: `${SUB_URL}`//check if there is a id will change sub-url

 //check if it is a list(array) otherwith will display a single foodie
 const employeeRender = Array.isArray(props.items) ? (
  <Table hover>
    <thead>
      <tr>
        <th>ID</th>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Username</th>
        <th>Email</th>
      </tr>
    </thead>
    <tbody>
      {props.items.map((employee) => (
        <tr key={employee.id}>
          <td>
            <Link to={`/employee/${employee.id}`}>
              <Button
                outline
                color='secondary'
                size='sm'
                style={{ width: '40px' }}
              >
                {employee.id}
              </Button>
            </Link>
          </td>
          <td>{employee.first_name}</td>
          <td>{employee.last_name}</td>
          <td>{employee.username}</td>
          <td>{employee.email || 'None'}</td>
          <td>
            <div style={{ width: '120px' }}>
              {/* call create/edit foodie modal */}
              <Modal
                buttonLabel='Edit'
                employee={employee}
                updateState={props.updateState}
                BASE_URL={BASE_URL}
                SUB_URL={SUB_URL}
              />
              {/* delte button */}
              <Button
                color='danger'
                onClick={() => props.deleteItem(employee.id, SUB_URL)}
              >
                Del
              </Button>
            </div>
          </td>
        </tr>
      ))}
      <tr>
        {!props.isLoading && (
          <Modal
            buttonLabel='Add Employee'
            addItemToState={props.addItemToState}
            BASE_URL={BASE_URL}
            SUB_URL={sub}
          />
        )}
      </tr>
    </tbody>
  </Table>
) : (
  <div>
    <Table>
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>User Name</th>
          <th>Performance Plans</th>
        </tr>
      </thead>
      <tr key={props.items.id}>
        <td>{props.items.first_name}</td>
        <td>{props.items.last_name}</td>
        <td>{props.items.email}</td>
        <td>{props.items.username || 'None'}</td>
        <ul>
          {props.items.performance_plan.map((plan, idx) => (
            <li key={idx}>
              <a href='#'>{plan.name}</a>
            </li>
          ))}
        </ul>
      </tr>
      {/* go back link when access a single id */}
      <Link to={`/employee`}>
        {' '}
        <Button color='success' style={{ marginTop: '20px' }}>
          Go Back
        </Button>
      </Link>
    </Table>
  </div>
)

return employeeRender
}

export default EmployeeTables;
