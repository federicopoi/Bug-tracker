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
import CreateTicketModal from ".././createTicket/CreateTicketModal";
class Tickets extends Component {
  componentDidMount() {
    this.props.getTickets();
  }
  render() {
    const { tickets } = this.props.tickets;
    const { title } = this.props.props;
    console.log(tickets);
    return (
      <Card>
        <CardBody>
          <div className="d-flex align-items-center">
            <div className="">
              <CardTitle>Tickets</CardTitle>
              <CardSubtitle>All tickets assigned to Bug Tracker</CardSubtitle>
            </div>
            <div className="ml-auto d-flex no-block align-items-center">
              <div className="dl">
                <CreateTicketModal title={title}></CreateTicketModal>
              </div>
            </div>
          </div>
          <Table className="no-wrap v-middle" responsive>
            <thead>
              <tr className="border-0">
                <th className="border-0">Name</th>
                <th className="border-0">Status</th>

                <th className="border-0">Priority</th>
                <th className="border-0">Created</th>
              </tr>
            </thead>
            {tickets &&
              tickets
                .filter(({ project }) => project === title)
                .map(
                  ({
                    title,
                    description,
                    status,
                    priority,
                    created,
                    _id,
                    assignedDev,
                    comments,
                    project,
                    type,
                  }) => {
                    return (
                      <tbody key={_id}>
                        <tr>
                          <td>
                            <div className="d-flex no-block align-items-center">
                              <div className="">
                                <h5 className="mb-0 font-16 font-medium">
                                  {title}
                                </h5>
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
                          <td>
                            <Link
                              to={{
                                pathname: `/ticketdetail/${_id}`,
                                state: {
                                  title,
                                  description,
                                  status,
                                  priority,
                                  assignedDev,
                                  project,
                                  created,
                                  comments,
                                  type,
                                  _id,
                                },
                              }}
                            >
                              <Button
                                color="success"
                                className="btn bg-secondary border border-secondary"
                              >
                                Detail
                              </Button>
                            </Link>
                          </td>
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
