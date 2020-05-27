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

    return (
      <Card>
        <CardBody>
          <div className="d-flex align-items-center">
            <div className="">
              <CardTitle>Projects</CardTitle>
              <CardSubtitle>All projects in your database</CardSubtitle>
            </div>
            <div className="ml-auto d-flex no-block align-items-center">
              <div className="dl">
                <CreateProjectModal></CreateProjectModal>
              </div>
            </div>
          </div>

          <Table className="no-wrap v-middle" responsive>
            <thead>
              <tr className="border-0">
                <th className="border-0">Title</th>
                <th className="border-0">Description</th>
                <th className="border-0">Created</th>
              </tr>
            </thead>
            {projects &&
              projects.map(({ created, description, personal, title, _id }) => {
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

                      <td>{description}</td>
                      <td> {moment(created).fromNow()}</td>

                      <td>
                        <Link
                          to={{
                            pathname: `/projectdetail/${_id}`,
                            state: {
                              created,
                              description,
                              personal,
                              title,
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
export default connect(mapStateToProps, { getProjects })(ProjectList);
