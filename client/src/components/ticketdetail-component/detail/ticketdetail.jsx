import React, { Component } from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import { connect } from "react-redux";
import { getTickets } from "../../../store/actions/ticketsActions";
export class TicketDetail extends Component {
  componentDidMount() {
    this.props.getTickets();
  }
  render() {
    const { tickets } = this.props.tickets;
    return (
      <div>
        {tickets &&
          tickets
            .filter(({ summary }) => summary === this.props.props.summary)
            .map(
              ({
                status,
                priority,
                assignedTeam,
                project,
                assignedTo,
                created,
                type,
                submitter,
                _id,
              }) => {
                return (
                  <Card key={_id}>
                    <CardBody>
                      <Row className="my-2">
                        <Col sm={6}>
                          <h5 className="font-16 font-medium">Status</h5>
                          <h5 className="font-14 font-weight-normal">
                            {status}
                          </h5>
                        </Col>
                        <Col sm={6}>
                          <h5 className="font-16 font-medium">Priority</h5>
                          <h5 className="font-14 font-weight-normal">
                            {priority}
                          </h5>
                        </Col>
                      </Row>
                      <Row className="my-2">
                        <Col sm={6}>
                          <h5 className="font-16 font-medium">Assigned Team</h5>
                          <h5 className="font-14 font-weight-normal">
                            {assignedTeam}
                          </h5>
                        </Col>
                        <Col sm={6}>
                          <h5 className="font-16 font-medium">Submitter</h5>
                          <h5 className="font-14 font-weight-normal">
                            {submitter}
                          </h5>
                        </Col>
                      </Row>
                      <Row className="my-2">
                        <Col sm={6}>
                          <h5 className="font-16 font-medium">Assigned To</h5>
                          <h5 className="font-14 font-weight-normal">
                            {assignedTo}
                          </h5>
                        </Col>
                        <Col sm={6}>
                          <h5 className="font-16 font-medium">Type</h5>
                          <h5 className="font-14 font-weight-normal">{type}</h5>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                );
              }
            )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  tickets: state.tickets,
});
export default connect(mapStateToProps, { getTickets })(TicketDetail);
