import React, { Component } from "react";
import { Card, CardTitle, CardBody } from "reactstrap";

import CanvasJSReact from "../canvasjs.react";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class Status extends Component {
  render() {
    const { tickets } = this.props;
    const OpenTickets = tickets.filter(({ status }) => status === "Open");
    const ClosedTickets = tickets.filter(({ status }) => status === "Closed");
    const options = {
      data: [
        {
          type: "column",
          dataPoints: [
            { label: "Total Bugs", y: OpenTickets.length, color: "#3483B3" },
            { label: "Open Bugs", y: tickets.length, color: "#88DD45" },
            { label: "Closed Bugs", y: ClosedTickets.length, color: "#DD4545" },
          ],
        },
      ],
    };
    const TaskTickets = tickets.filter(({ type }) => type === "Task");
    const BugsTickets = tickets.filter(({ type }) => type === "Bug / Errors");
    const options2 = {
      data: [
        {
          type: "column",
          dataPoints: [
            { label: "Bug / Errors", y: BugsTickets.length, color: "#3483B3" },
            { label: "Task", y: TaskTickets.length, color: "#88DD45" },
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
        <Card>
          <CardBody>
            <div className="d-flex align-items-center">
              <div className="">
                <CardTitle>Bugs by type</CardTitle>
              </div>
            </div>
            <CanvasJSChart options={options2} />
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Status;
