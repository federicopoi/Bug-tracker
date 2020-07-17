import React, { Component } from "react";
import { Card, CardBody, CardTitle, CardSubtitle, Table } from "reactstrap";
import moment from "moment";
import { connect } from "react-redux";
import { getTickets } from "../../../store/actions/ticketsActions";
export class TicketHistory extends Component {
  componentDidMount() {
    this.props.getTickets();
  }
  render() {
    const { tickets } = this.props.tickets;
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
                  <th className="border-0">Property</th>
                  <th className="border-0">Old Value</th>
                  <th className="border-0">New Value</th>
                  <th className="border-0">Date</th>
                </tr>
              </thead>
              {tickets &&
                tickets
                  .filter(({ summary }) => summary === this.props.props.summary)
                  .map(({ history }) => {
                    return (
                      history &&
                      history.map(({ property, oldValue, newValue, date }) => {
                        return (
                          <tbody>
                            <tr>
                              <td>
                                <div className="d-flex no-block align-items-center">
                                  <div className="">
                                    <h5 className="mb-0 font-16 font-medium">
                                      {property}
                                    </h5>
                                  </div>
                                </div>
                              </td>

                              <td>{oldValue}</td>
                              <td>{newValue}</td>
                              <td>{moment(date).fromNow()}</td>
                            </tr>
                          </tbody>
                        );
                      })
                    );
                  })}
            </Table>
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tickets: state.tickets,
  };
};
export default connect(mapStateToProps, { getTickets })(TicketHistory);
