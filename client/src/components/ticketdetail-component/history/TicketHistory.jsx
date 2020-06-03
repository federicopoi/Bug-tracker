import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Input,
  Table,
  Col,
  Row,
  Button,
  Form,
  FormGroup,
} from "reactstrap";
export class TicketHistory extends Component {
  render() {
    return (
      <div>
        <Card>
          <CardBody>
            <div className="d-flex align-items-center">
              <div className="">
                <CardTitle>History</CardTitle>
                <CardSubtitle>Keep track of any movement</CardSubtitle>
              </div>
            </div>
            <Table className="no-wrap v-middle" responsive>
              <thead>
                <tr className="border-0">
                  <th className="border-0">Propety</th>
                  <th className="border-0">Old Value</th>
                  <th className="border-0">New Value</th>
                  <th className="border-0">Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div className="d-flex no-block align-items-center">
                      <div className="">
                        <h5 className="mb-0 font-16 font-medium"></h5>
                      </div>
                    </div>
                  </td>

                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default TicketHistory;
