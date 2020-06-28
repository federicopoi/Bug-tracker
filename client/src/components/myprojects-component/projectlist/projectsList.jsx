import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Row,
  Col,
  Table,
  Button,
} from "reactstrap";
import { getProjects } from "../../../store/actions/projectActions";
import moment from "moment";
import CreateProjectModal from ".././createProject/CreateProjectModal";

class ProjectList extends Component {
  componentDidMount() {
    this.props.getProjects();
  }
  render() {
    const { projects } = this.props.projects;
    const { role, name } = this.props.user;
    // const toConos = projects.filter(({ submitters }) =>
    //   submitters.map((item) => item[0] !== "Submitter 1")
    // );
    return (
      <Card>
        <CardBody>
          <div className="d-flex align-items-center">
            <div className="">
              <CardTitle>Projects</CardTitle>
              {role === "Admin" ? (
                <CardSubtitle>All projects in your database</CardSubtitle>
              ) : (
                <CardSubtitle>All projects assign to you</CardSubtitle>
              )}
            </div>
            {role === "Admin" ? (
              <div className="ml-auto d-flex no-block align-items-center">
                <div className="dl">
                  <CreateProjectModal></CreateProjectModal>
                </div>
              </div>
            ) : null}
          </div>

          <Table className="no-wrap v-middle" responsive>
            <thead>
              <tr className="border-0">
                <th className="border-0">Project Name</th>
                <th className="border-0">Project Manager</th>
                <th className="border-0">Created</th>
              </tr>
            </thead>
            {role === "Admin"
              ? projects &&
                projects.map(
                  ({
                    created,
                    name,
                    manager,
                    teams,
                    submitters,
                    updaters,
                    _id,
                  }) => {
                    return (
                      <tbody key={_id}>
                        <tr>
                          <td>
                            <div className="d-flex no-block align-items-center">
                              <div className="">
                                <Link
                                  to={{
                                    pathname: `/projectdetail/${_id}`,
                                    state: {
                                      created,
                                      name,
                                      teams,
                                      manager,
                                      submitters,
                                      updaters,
                                      _id,
                                    },
                                  }}
                                >
                                  <h5 className="mb-0 font-16 font-medium">
                                    {name}
                                  </h5>
                                </Link>
                              </div>
                            </div>
                          </td>
                          <td>{manager}</td>
                          <td> {moment(created).fromNow()}</td>
                        </tr>
                      </tbody>
                    );
                  }
                )
              : null}
            {role === "Project Manager"
              ? projects &&
                projects
                  .filter(({ manager }) => manager === name)
                  .map(
                    ({
                      created,
                      name,
                      manager,
                      teams,
                      submitters,
                      updaters,
                      _id,
                    }) => {
                      return (
                        <tbody key={_id}>
                          <tr>
                            <td>
                              <div className="d-flex no-block align-items-center">
                                <div className="">
                                  <Link
                                    to={{
                                      pathname: `/projectdetail/${_id}`,
                                      state: {
                                        created,
                                        name,
                                        teams,
                                        manager,
                                        submitters,
                                        updaters,
                                        _id,
                                      },
                                    }}
                                  >
                                    <h5 className="mb-0 font-16 font-medium">
                                      {name}
                                    </h5>
                                  </Link>
                                </div>
                              </div>
                            </td>
                            <td>{manager}</td>
                            <td> {moment(created).fromNow()}</td>
                          </tr>
                        </tbody>
                      );
                    }
                  )
              : null}

            {role === "Submitter"
              ? projects &&
                projects.map(
                  ({
                    created,
                    name,
                    manager,
                    teams,
                    submitters,
                    updaters,
                    _id,
                  }) => {
                    return (
                      submitters &&
                      submitters
                        .filter((item) => item[0] === this.props.user.name)
                        .map((item, index) => {
                          return (
                            <tbody key={_id}>
                              <tr>
                                <td>
                                  <div className="d-flex no-block align-items-center">
                                    <div className="">
                                      <Link
                                        to={{
                                          pathname: `/projectdetail/${_id}`,
                                          state: {
                                            created,
                                            name,
                                            teams,
                                            manager,
                                            submitters,
                                            updaters,
                                            _id,
                                          },
                                        }}
                                      >
                                        <h5 className="mb-0 font-16 font-medium">
                                          {name}
                                        </h5>
                                      </Link>
                                    </div>
                                  </div>
                                </td>
                                <td>{manager}</td>
                                <td> {moment(created).fromNow()}</td>
                              </tr>
                            </tbody>
                          );
                        })
                    );
                  }
                )
              : null}
          </Table>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    projects: state.projects,
    user: state.auth.user,
  };
};
export default connect(mapStateToProps, { getProjects })(ProjectList);
