import React from "react";
import { Row, Col } from "reactstrap";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { ProjectList } from "../../components/myprojects-component";

const MyProjects = (props) => {
  const { role } = props.user;
  if (role === "Updater") return <Redirect to="/" />;
  return (
    <div>
      <ProjectList></ProjectList>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps)(MyProjects);
