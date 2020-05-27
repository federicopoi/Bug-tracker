import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import { Status, Priority, Title } from "../../components/dashboard-components";
import { connect } from "react-redux";
import { getTickets } from "../../store/actions/ticketsActions";
class Starter extends Component {
  componentDidMount() {
    this.props.getTickets();
  }
  render() {
    const { tickets } = this.props.tickets;
    return (
      <div>
        <Title></Title>
        <Row>
          <Col sm={6} lg={6}>
            <Status tickets={tickets}></Status>
          </Col>
          <Col sm={6} lg={6}>
            <Priority tickets={tickets}></Priority>
          </Col>
        </Row>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    tickets: state.tickets,
  };
};
export default connect(mapStateToProps, { getTickets })(Starter);
