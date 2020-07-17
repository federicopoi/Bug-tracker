import React, { Component } from "react";
import { Card, CardTitle, CardBody } from "reactstrap";

import CanvasJSReact from "../canvasjs.react";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class Status extends Component {
  render() {
    const { tickets } = this.props;
    const OpenTickets = tickets.filter(({ status }) => status === "Open");
    const AssignedTickets = tickets.filter(
      ({ status }) => status === "Assigned"
    );
    const InProgressTickets = tickets.filter(
      ({ status }) => status === "In Progress"
    );
    const ClosedTickets = tickets.filter(({ status }) => status === "Closed");

    const CancelledTickets = tickets.filter(
      ({ status }) => status === "Cancelled"
    );
    const ReopenedTickets = tickets.filter(
      ({ status }) => status === "Reopened"
    );

    const options = {
      data: [
        {
          type: "column",
          dataPoints: [
            { label: "Open", y: OpenTickets.length, color: "#88DD45" },
            {
              label: "Assigned",
              y: AssignedTickets.length,
              color: "#367BDE",
            },
            {
              label: "In Progress",
              y: InProgressTickets.length,
              color: "#DEAE36",
            },
            {
              label: "Closed",
              y: ClosedTickets.length,
              color: "#DE3636",
            },
            { label: "ReOpened", y: ReopenedTickets.length, color: "#8D8483" },
            {
              label: "Cancelled",
              y: CancelledTickets.length,
              color: "#DE3636",
            },
          ],
        },
      ],
    };
    return (
      <div>
        <Card>
          <CardBody>
            <div className="d-flex align-items-center">
              <div className="">
                <CardTitle>Bugs by status</CardTitle>
              </div>
            </div>
            <CanvasJSChart options={options} />
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Status;
