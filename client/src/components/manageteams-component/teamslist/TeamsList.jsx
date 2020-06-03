import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Input,
  Table,
  Button,
} from "reactstrap";
import { connect } from "react-redux";
import { getTeams } from "../../../store/actions/teamActions";
import CreateTeamModal from "../createTeam/CreateTeamModal";
import moment from "moment";
import { Link } from "react-router-dom";

export class TeamsList extends Component {
  componentDidMount() {
    this.props.getTeams();
  }
  render() {
    const { teams } = this.props.teams;
    const { name, role } = this.props.user;
    return (
      <Card>
        <CardBody>
          <div className="d-flex align-items-center">
            <div className="">
              <CardTitle>Your Teams</CardTitle>
              <CardSubtitle>All teams in your database</CardSubtitle>
            </div>
            <div className="ml-auto d-flex no-block align-items-center">
              <div className="dl">
                <CreateTeamModal></CreateTeamModal>
              </div>
            </div>
          </div>
          <Table className="no-wrap v-middle" responsive>
            <thead>
              <tr className="border-0">
                <th className="border-0">Name</th>
                <th className="border-0">Team Manager</th>
                <th className="border-0">Created</th>
              </tr>
            </thead>
            {role === "Admin"
              ? teams &&
                teams.map(({ name, manager, _id, created, updaters }) => {
                  return (
                    <tbody key={_id}>
                      <tr>
                        <td>
                          <div className="d-flex no-block align-items-center">
                            <Link
                              to={{
                                pathname: `/teamdetail/${_id}`,
                                state: {
                                  name,
                                  manager,
                                  _id,
                                  created,
                                  updaters,
                                },
                              }}
                            >
                              <div className="">
                                <h5 className="mb-0 font-16 font-medium">
                                  {name}
                                </h5>
                              </div>
                            </Link>
                          </div>
                        </td>

                        <td>{manager}</td>
                        <td>{moment(created).fromNow()}</td>
                      </tr>
                    </tbody>
                  );
                })
              : null}
            {role === "Team Manager"
              ? teams &&
                teams
                  .filter(({ manager }) => manager === name)
                  .map(({ name, manager, _id, created, updaters }) => {
                    return (
                      <tbody key={_id}>
                        <tr>
                          <td>
                            <div className="d-flex no-block align-items-center">
                              <Link
                                to={{
                                  pathname: `/teamdetail/${_id}`,
                                  state: {
                                    name,
                                    manager,
                                    _id,
                                    created,
                                    updaters,
                                  },
                                }}
                              >
                                <div className="">
                                  <h5 className="mb-0 font-16 font-medium">
                                    {name}
                                  </h5>
                                </div>
                              </Link>
                            </div>
                          </td>

                          <td>{manager}</td>
                          <td>{moment(created).fromNow()}</td>
                        </tr>
                      </tbody>
                    );
                  })
              : null}
          </Table>
        </CardBody>
      </Card>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    teams: state.teams,
    user: state.auth.user,
  };
};
export default connect(mapStateToProps, { getTeams })(TeamsList);
