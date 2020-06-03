import React, { Component } from "react";
import { connect } from "react-redux";
import { getTeams } from "../../../store/actions/teamActions";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Table,
} from "reactstrap";
import UpdateTeamModal from "../updateTeam/UpdateTeamModal";
class AssignedStaff extends Component {
  componentDidMount() {
    this.props.getTeams();
  }
  render() {
    const { teams } = this.props.teams;

    return (
      <Card>
        <CardBody>
          <div className="d-flex align-items-center">
            <div className="">
              <CardTitle>Your Staff</CardTitle>
              <CardSubtitle>Assigned to this team</CardSubtitle>
            </div>
            <div className="ml-auto d-flex no-block align-items-center">
              <div className="dl">
                <UpdateTeamModal name={this.props.props.name}></UpdateTeamModal>
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
            {teams &&
              teams
                .filter(({ name }) => name === this.props.props.name)
                .map(({ updaters, manager, name, _id }) => {
                  return (
                    <tbody key={_id}>
                      <tr>
                        <td>
                          <div className="d-flex no-block align-items-center">
                            <div className="">
                              <h5 className="mb-0 font-16 font-medium">
                                Team Manager
                              </h5>
                            </div>
                          </div>
                        </td>
                        <td>{manager}</td>
                      </tr>
                      {updaters.map((item, index) => {
                        return (
                          <tr>
                            <td>
                              <div className="d-flex no-block align-items-center">
                                <div className="">
                                  <h5 className="mb-0 font-16 font-medium">
                                    Updater
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
    teams: state.teams,
  };
};
export default connect(mapStateToProps, { getTeams })(AssignedStaff);
