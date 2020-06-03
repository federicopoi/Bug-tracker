import React, { Component } from "react";
import { connect } from "react-redux";
import { getProjects } from "../../../store/actions/projectActions";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Table,
} from "reactstrap";
import UpdateProjectModal from "../updateProject/UpdateProjectModal";
class AssignedPersonal extends Component {
  componentDidMount() {
    this.props.getProjects();
  }
  render() {
    const { projects } = this.props.projects;

    return (
      <Card>
        <CardBody>
          <div className="d-flex align-items-center">
            <div className="">
              <CardTitle>Your Staff</CardTitle>
              <CardSubtitle>Assigned to this project</CardSubtitle>
            </div>
            <div className="ml-auto d-flex no-block align-items-center">
              <div className="dl">
                <UpdateProjectModal
                  name={this.props.props.name}
                ></UpdateProjectModal>
              </div>
            </div>
          </div>
          <Table className="no-wrap v-middle" responsive>
            <thead>
              <tr className="border-0">
                <th className="border-0">Role</th>
                <th className="border-0">Name</th>
              </tr>
            </thead>
            {projects &&
              projects
                .filter(({ name }) => name === this.props.props.name)
                .map(({ teams, submitters, manager, name, _id }) => {
                  return (
                    <tbody key={_id}>
                      <tr>
                        <td>
                          <div className="d-flex no-block align-items-center">
                            <div className="">
                              <h5 className="mb-0 font-16 font-medium">
                                Project Manager
                              </h5>
                            </div>
                          </div>
                        </td>
                        <td>{manager}</td>
                      </tr>
                      {teams.map((item, index) => {
                        return (
                          <tr>
                            <td>
                              <div className="d-flex no-block align-items-center">
                                <div className="">
                                  <h5 className="mb-0 font-16 font-medium">
                                    Solving Team
                                  </h5>
                                </div>
                              </div>
                            </td>
                            <td>{item}</td>
                          </tr>
                        );
                      })}
                      {submitters.map((item, index) => {
                        return (
                          <tr>
                            <td>
                              <div className="d-flex no-block align-items-center">
                                <div className="">
                                  <h5 className="mb-0 font-16 font-medium">
                                    Submitters
                                  </h5>
                                </div>
                              </div>
                            </td>
                            <td>{item}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  );
                })}
          </Table>
        </CardBody>
      </Card>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    projects: state.projects,
  };
};
export default connect(mapStateToProps, { getProjects })(AssignedPersonal);
