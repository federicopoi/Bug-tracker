import React, { Component } from "react";
import moment from "moment";
import {
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  Input,
  Table,
  Col,
  Row,
  Button,
  Form,
  FormGroup,
} from "reactstrap";
import { connect } from "react-redux";
import { addComment, getTickets } from "../../../store/actions/ticketsActions";

class TicketsComments extends Component {
  state = {
    message: "",
  };
  componentDidMount() {
    this.props.getTickets();
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSubmit = (e) => {
    e.preventDefault();
    const { message } = this.state;

    const newComment = {
      title: this.props.props.title,
      comment: {
        commenter: this.props.user.name,
        message,
        created: Date.now(),
      },
    };
    if (message === "") {
      console.log("Error");
    } else {
      this.props.addComment(newComment);
      document.getElementById("form").reset();
    }
  };
  render() {
    const { tickets } = this.props.tickets;
    return (
      <div>
        <Form onSubmit={this.onSubmit} id="form">
          <Row className="mb-3">
            <Col lg={10}>
              <FormGroup>
                <Input
                  onChange={this.onChange}
                  type="text"
                  name="message"
                  id="message"
                  placeholder="Add a new comment"
                />
              </FormGroup>
            </Col>
            <Col lg={2}>
              <Button className="bg-success border-success">Submit</Button>
            </Col>
          </Row>
        </Form>
        <Card>
          <CardBody>
            <div className="d-flex align-items-center">
              <div className="">
                <CardTitle>Comments</CardTitle>
                <CardSubtitle>All comments for this ticket</CardSubtitle>
              </div>
            </div>
            <Table className="no-wrap v-middle" responsive>
              <thead>
                <tr className="border-0">
                  <th className="border-0">Commenter</th>
                  <th className="border-0">Message</th>
                  <th className="border-0">Created</th>
                </tr>
              </thead>
              {tickets &&
                tickets
                  .filter(({ title }) => title === this.props.props.title)
                  .map(({ comments }) => {
                    return (
                      comments &&
                      comments.map(({ commenter, message, created }) => {
                        return (
                          <tbody>
                            <tr>
                              <td>
                                <div className="d-flex no-block align-items-center">
                                  <div className="">
                                    <h5 className="mb-0 font-16 font-medium">
                                      {commenter}
                                    </h5>
                                  </div>
                                </div>
                              </td>

                              <td>{message}</td>
                              <td>{moment(created).fromNow()}</td>
                            </tr>
                          </tbody>
                        );
                      })
                    );
                  })}
            </Table>
          </CardBody>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    tickets: state.tickets,
  };
};
export default connect(mapStateToProps, { addComment, getTickets })(
  TicketsComments
);
