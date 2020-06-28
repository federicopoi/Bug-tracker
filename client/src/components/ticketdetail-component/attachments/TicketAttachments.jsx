import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Table,
  Button,
} from "reactstrap";
import UploadFileModal from "./UploadFileModal";
export class TicketAttachments extends Component {
  render() {
    return (
      <div>
        <Card>
          <CardBody>
            <div className="d-flex align-items-center">
              <div className="">
                <CardTitle>Ticket Attachments</CardTitle>
                <CardSubtitle>All files attached to this ticket</CardSubtitle>
              </div>
              <div className="ml-auto d-flex no-block align-items-center">
                <div className="dl">
                  <UploadFileModal></UploadFileModal>
                </div>
              </div>
            </div>
            <Table className="no-wrap v-middle" responsive>
              <thead>
                <tr className="border-0">
                  <th className="border-0">File</th>
                  <th className="border-0">Notes</th>
                  <th className="border-0">Uploader</th>
                  <th className="border-0">Created</th>
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

export default TicketAttachments;
