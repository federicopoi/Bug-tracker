import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import { getTickets } from "../../../store/actions/ticketsActions";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Table,
  Button,
} from "reactstrap";

class TicketsList extends Component {
  componentDidMount() {
    this.props.getTickets();
  }
  render() {
    const { tickets } = this.props.tickets;

    return (
      <Card>
        <CardBody>
          <div className="d-flex align-items-center">
            <div className="">
              <CardTitle>Tickets</CardTitle>
              <CardSubtitle>All tickets in your database.</CardSubtitle>
            </div>
          </div>
          <Table className="no-wrap v-middle" responsive>
            <thead>
              <tr className="border-0">
                <th className="border-0">Title</th>

                <th className="border-0">Status</th>
                <th className="border-0">Priority</th>
                <th className="border-0">Created</th>
              </tr>
            </thead>
            {tickets &&
              tickets.map(
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
export default connect(mapStateToProps, { getTickets })(TicketsList);
