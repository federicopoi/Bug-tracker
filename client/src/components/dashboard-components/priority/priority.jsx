import React, { Component } from "react";
import { Card, CardTitle, CardBody } from "reactstrap";

import CanvasJSReact from "../canvasjs.react";

var CanvasJSChart = CanvasJSReact.CanvasJSChart;
class Priority extends Component {
  render() {
    const { tickets } = this.props;
    const UrgentTickets = tickets.filter(
      ({ priority }) => priority === "Urgent"
    );
    const HighTickets = tickets.filter(({ priority }) => priority === "High");
    const MediumTickets = tickets.filter(
      ({ priority }) => priority === "Medium"
    );
    const LowTickets = tickets.filter(({ priority }) => priority === "Low");

    const options = {
      data: [
        {
          type: "bar",
          dataPoints: [
            { label: "Low Priority", y: LowTickets.length, color: "#88DD45" },
            {
              label: "Medium Priority",
              y: MediumTickets.length,
              color: "#DDB445",
            },
            { label: "High Priority", y: HighTickets.length, color: "#DD7F45" },
            {
              label: "Urgent Priority",
              y: UrgentTickets.length,
              color: "#DD4E45",
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
                <CardTitle>Bugs by priority</CardTitle>
              </div>
            </div>
            <CanvasJSChart options={options} />
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default Priority;
