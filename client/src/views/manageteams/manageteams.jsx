import React from "react";
import { TeamsList } from "../../components/manageteams-component";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
const ManageTeamsView = (props) => {
  const { role } = props.user;
  if (role !== "Admin" && role !== "Team Manager") return <Redirect to="/" />;
  return (
    <div>
      <TeamsList></TeamsList>
    </div>
  );
};
const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps)(ManageTeamsView);
