import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getTickets } from "../../../store/actions/ticketsActions";
import moment from "moment";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Table,
  Button,
} from "reactstrap";
class Tickets extends Component {
  componentDidMount() {
    this.props.getTickets();
  }
  render() {
    const { tickets } = this.props.tickets;
    const { name } = this.props.props;
    console.log(tickets);
    return (
      <Card>
        <CardBody>
          <div className="d-flex align-items-center">
            <div className="">
              <CardTitle>Tickets</CardTitle>
              <CardSubtitle>All tickets assign to this team</CardSubtitle>
            </div>
          </div>
          <Table className="no-wrap v-middle" responsive>
            <thead>
              <tr className="border-0">
                <th className="border-0">Summary</th>
                <th className="border-0">Status</th>
                <th className="border-0">Priority</th>
                <th className="border-0">Created</th>
              </tr>
            </thead>
            {tickets &&
              tickets
                .filter(({ assignedTeam }) => assignedTeam === name)
                .map(
                  ({
                    summary,
                    description,
                    status,
                    priority,
                    created,
                    _id,
                    assignedTeam,
                    comments,
                    submitter,
                    project,
                    type,
                  }) => {
                    return (
                      <tbody key={_id}>
                        <tr>
                          <td>
                            <div className="d-flex no-block align-items-center">
                              <div className="">
                                <Link
                                  to={{
                                    pathname: `/ticketdetail/${_id}`,
                                    state: {
                                      summary,
                                      description,
                                      status,
                                      priority,
                                      submitter,
                                      assignedTeam,
                                      project,
                                      created,
                                      comments,
                                      type,
                                      _id,
                                    },
                                  }}
                                >
                                  <h5 className="mb-0 font-16 font-medium">
                                    {summary}
                                  </h5>
                                </Link>
                              </div>
                            </div>
                          </td>

                          {status === "Open" ? (
                            <td>
                              <li className="border-0 p-0 text-success list-inline-item">
                                <i className="fa fa-circle"></i> {status}
                              </li>
                            </td>
                          ) : null}
                          {status === "Assigned" ? (
                            <td>
                              <li className="border-0 p-0 text-info list-inline-item">
                                <i className="fa fa-circle"></i> {status}
                              </li>
                            </td>
                          ) : null}
                          {status === "In progress" ? (
                            <td>
                              <li className="border-0 p-0 text-warning list-inline-item">
                                <i className="fa fa-circle"></i> {status}
                              </li>
                            </td>
                          ) : null}
                          {status === "Reopened" ? (
                            <td>
                              <li className="border-0 p-0 text-secondary list-inline-item">
                                <i className="fa fa-circle"></i> {status}
                              </li>
                            </td>
                          ) : null}
                          {status === "Cancelled" ? (
                            <td>
                              <li className="border-0 p-0 text-danger list-inline-item">
                                <i className="fa fa-circle"></i> {status}
                              </li>
                            </td>
                          ) : null}
                          {status === "Closed" ? (
                            <td>
                              <li className="border-0 p-0 text-danger list-inline-item">
                                <i className="fa fa-circle"></i> {status}
                              </li>
                            </td>
                          ) : null}

                          {priority === "Low" ? (
                            <td>
                              <li className="border-0 p-0 text-success list-inline-item">
                                <i className="fa fa-circle"></i> {priority}
                              </li>
                            </td>
                          ) : null}

                          {priority === "Medium" ? (
                            <td>
                              <li className="border-0 p-0 text-warning list-inline-item">
                                <i className="fa fa-circle"></i> {priority}
                              </li>
                            </td>
                          ) : null}

                          {priority === "High" || priority === "Urgent" ? (
                            <td>
                              <li className="border-0 p-0 text-danger list-inline-item">
                                <i className="fa fa-circle"></i> {priority}
                              </li>
                            </td>
                          ) : null}
                          <td>{moment(created).fromNow()}</td>
                        </tr>
                      </tbody>
                    );
                  }
                )}
          </Table>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tickets: state.tickets,
  };
};
export default connect(mapStateToProps, { getTickets })(Tickets);
