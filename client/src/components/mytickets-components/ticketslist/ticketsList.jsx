import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import moment from "moment";
import { getTickets } from "../../../store/actions/ticketsActions";
import "./TicketlistStyle.css";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Table,
  Col,
  Row,
  Container,
  Button,
} from "reactstrap";

const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

export const TicketsTable = (props) => {
  const { items, requestSort, sortConfig } = useSortableData(props.tickets);
  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : undefined;
  };

  return (
    <div>
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
                <th className="border-0">
                  Summary
                  <Button
                    type="button"
                    onClick={() => requestSort("summary")}
                    className={getClassNamesFor("summary")}
                    color="link"
                  ></Button>
                </th>
                <th className="border-0">
                  Description
                  <Button
                    type="button"
                    onClick={() => requestSort("description")}
                    className={getClassNamesFor("description")}
                    color="link"
                  ></Button>
                </th>
                <th className="border-0">
                  Status
                  <Button
                    type="button"
                    onClick={() => requestSort("status")}
                    className={getClassNamesFor("status")}
                    color="link"
                  ></Button>
                </th>
                <th className="border-0">
                  Priority
                  <Button
                    type="button"
                    onClick={() => requestSort("priority")}
                    className={getClassNamesFor("priority")}
                    color="link"
                  ></Button>
                </th>

                <th className="border-0">
                  Created
                  <Button
                    type="button"
                    onClick={() => requestSort("created")}
                    color="link"
                    className={getClassNamesFor("created")}
                  ></Button>
                </th>
              </tr>
            </thead>
            {props.role === "Updater"
              ? items &&
                items
                  .filter(({ assignedTo }) => assignedTo === props.name)
                  .map(
                    ({
                      summary,
                      description,
                      status,
                      priority,
                      assignedTo,
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
                                        assignedTo,
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
                            <td>{description}</td>
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
                  )
              : items &&
                items.map(
                  ({
                    summary,
                    description,
                    status,
                    priority,

                    assignedTo,
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
                                      assignedTo,
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
                          <td>{description}</td>
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
    </div>
  );
};

class TicketsList extends Component {
  componentDidMount() {
    this.props.getTickets();
  }
  render() {
    const { tickets } = this.props.tickets;
    const { role, name } = this.props.user;
    return (
      <div>
        <TicketsTable tickets={tickets} role={role} name={name} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tickets: state.tickets,
    user: state.auth.user,
  };
};
export default connect(mapStateToProps, { getTickets })(TicketsList);
