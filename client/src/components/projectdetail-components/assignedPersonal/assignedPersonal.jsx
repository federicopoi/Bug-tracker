import React from "react";

import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Input,
  Table,
} from "reactstrap";

const AssignedPersonal = (props) => {
  const { personal } = props.props;
  console.log(personal);
  return (
    <Card>
      <CardBody>
        <div className="d-flex align-items-center">
          <div className="">
            <CardTitle>Your Personal</CardTitle>
            <CardSubtitle>Personal assigned to this project</CardSubtitle>
          </div>
        </div>
        <Table className="no-wrap v-middle" responsive>
          <thead>
            <tr className="border-0">
              <th className="border-0">User Name</th>

              <th className="border-0">Role</th>
            </tr>
          </thead>
          {personal[0].map(({ role, name, _id }) => {
            return (
              <tbody key={_id}>
                <tr>
                  <td>
                    <div className="d-flex no-block align-items-center">
                      <div className="">
                        <h5 className="mb-0 font-16 font-medium">{name}</h5>
                      </div>
                    </div>
                  </td>

                  <td>{role}</td>
                </tr>
              </tbody>
            );
          })}
        </Table>
      </CardBody>
    </Card>
  );
};

export default AssignedPersonal;
