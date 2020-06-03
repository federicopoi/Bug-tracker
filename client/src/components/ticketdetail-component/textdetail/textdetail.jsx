import React, { Component } from "react";
import { Button, Card, CardBody, CardTitle, CardSubtitle } from "reactstrap";
import { connect } from "react-redux";
import UpdateTicketModal from "../updateticket/UpdateTicketModal";
import { getTickets } from "../../../store/actions/ticketsActions";

export class TextDetail extends Component {
  componentDidMount() {
    this.props.getTickets();
  }
  render() {
    const {
      summary,
      created,
      description,
      name,
      status,
      priority,
    } = this.props.props;
    const { role } = this.props.user;
    const { tickets } = this.props.tickets;
    return (
      <Card>
        <CardBody>
          <div className="mb-3">
            <div className="d-flex align-items-center">
              {tickets &&
                tickets
                  .filter(({ summary }) => summary === this.props.props.summary)
                  .map(({ summary, description, _id }) => {
                    return (
                      <div key={_id}>
                        <h2 className="mb-3">{summary}</h2>
                        <h5>{description}</h5>
                      </div>
                    );
                  })}

              {role === "Updater" || role === "Admin" ? (
                <div className="ml-auto d-flex no-block align-items-center">
                  <div className="dl">
                    <UpdateTicketModal
                      className="bg-null"
                      summary={summary}
                      description={description}
                      status={status}
                      priority={priority}
                    >
                      Update Ticket
                    </UpdateTicketModal>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </CardBody>
      </Card>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.auth.user,
  tickets: state.tickets,
});
export default connect(mapStateToProps, { getTickets })(TextDetail);
