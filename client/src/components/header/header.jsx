import React, { Component } from "react";
import {
  Nav,
  NavItem,
  Navbar,
  NavLink,
  NavbarBrand,
  Collapse,
  DropdownItem,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
} from "reactstrap";
import { logout } from "../../store/actions/authActions";
import { connect } from "react-redux";

import profilephoto from "../../assets/images/users/1.jpg";

class Header extends Component {
  render() {
    const showMobilemenu = () => {
      document.getElementById("main-wrapper").classList.toggle("show-sidebar");
    };

    const activeRoute = (routeName) => {
      return this.props.location.pathname.indexOf(routeName) > -1
        ? "selected"
        : "";
    };

    const { name, role, email } = this.props.user;

    return (
      <header className="topbar navbarbg" data-navbarbg="skin6">
        <Navbar className="top-navbar" dark expand="md">
          <div className="navbar-header" id="logobg" data-logobg="skin6">
            {/*--------------------------------------------------------------------------------*/}
            {/* Logos Or Icon will be goes here for Light Layout && Dark Layout                */}
            {/*--------------------------------------------------------------------------------*/}
            <div className="">
              <h5 className="ml-4 font-18 font-medium">Hello {name}!</h5>
            </div>

            {/*--------------------------------------------------------------------------------*/}
            {/* Mobile View Toggler  [visible only after 768px screen]                         */}
            {/*--------------------------------------------------------------------------------*/}
            <button
              className="btn-link nav-toggler d-block d-md-none"
              onClick={() => showMobilemenu()}
            >
              <i className="ti-menu ti-close" />
            </button>
          </div>

          <Collapse className="navbarbg" navbar data-navbarbg="skin6">
            <Nav className="ml-auto float-right" navbar>
              {/*--------------------------------------------------------------------------------*/}
              {/* Start Profile Dropdown                                                         */}
              {/*--------------------------------------------------------------------------------*/}

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret className="pro-pic">
                  <img
                    src={profilephoto}
                    alt="user"
                    className="rounded-circle"
                    width="31"
                  />
                </DropdownToggle>
                <DropdownMenu right className="user-dd">
                  <DropdownItem>
                    <h5 className="font-16 font-medium">Login as</h5>
                    <h5 className="font-14 font-weight-normal">{role}</h5>
                  </DropdownItem>
                  <DropdownItem>
                    <h5 className="font-16 font-medium">Username</h5>
                    <h5 className="font-14 font-weight-normal">{name}</h5>
                  </DropdownItem>
                  <DropdownItem>
                    <h5 className="font-16 font-medium">Email</h5>
                    <h5 className="font-14 font-weight-normal">{email}</h5>
                  </DropdownItem>

                  <DropdownItem href="/login" onClick={this.props.logout}>
                    <i className="fa fa-power-off mr-1 ml-1" /> Logout
                  </DropdownItem>
                  <DropdownItem divider />
                </DropdownMenu>
              </UncontrolledDropdown>

              {/*--------------------------------------------------------------------------------*/}
              {/* End Profile Dropdown                                                           */}
              {/*--------------------------------------------------------------------------------*/}
            </Nav>
          </Collapse>
        </Navbar>
      </header>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps, { logout })(Header);
