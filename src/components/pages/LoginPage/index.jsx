//> React
// Contains all the functionality necessary to define React components
import React from "react";
// Redirect from Router
import { Redirect, withRouter } from "react-router-dom";

//> Redux
// Connect
import { connect } from "react-redux";
// Actions
import { signIn } from "../../../store/actions/authActions";

//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBAlert,
  MDBInput,
  MDBBtn,
  MDBIcon,
  MDBView,
  MDBMask,
  MDBCard,
  MDBCardBody,
} from "mdbreact";

//> Components
// To be added here

//> CSS
import "./loginpage.scss";

//> Images
import IMGlogo from "../../../assets/agency-small.png";

//> Configuration
// The route of your profile page (include /)
const profileRoute = "/profile";

class LoginPage extends React.Component {
  state = {
    email: "",
    password: "",
  };

  componentDidMount = () => {};

  submitHandler = (event) => {
    event.preventDefault();
    this._loginUser();
  };

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  _loginUser = () => {
    const email = this.state.email;
    const password = this.state.password;

    if (email && password) {
      this.props.signIn({
        email,
        password,
      });
    } else {
      this.setState({
        error: true,
      });
    }
  };

  render() {
    const { authErrorDetails, auth, location } = this.props;

    // Get GET parameters from URL
    let params = location.search.substr(1)
      ? location.search.substr(1).split("=")
      : null;

    // Check if there are any GET parameters in the URL
    if (params) {
      // Check if the GET parameter on position 0 is a refer
      if (params[0] === "refer") {
        // Check for custom refers (You would use this when a user tries to access /me, but is not logged in)
        switch (params[1]) {
          case "me":
            if (auth.uid !== undefined) return <Redirect to="/me" />;
            break;
          default:
            if (auth.uid !== undefined) return <Redirect to={profileRoute} />;
        }
      }
    } else {
      // User is not logged in and has no refer GET parameter
      if (auth.uid !== undefined) return <Redirect to={profileRoute} />;
    }

    return (
      <MDBView id="login" className="flex-center">
        <MDBMask overlay="indigo-strong" />
        <MDBContainer>
          <MDBRow className="flex-center">
            <MDBCol md="6" xl="5" className="mb-4">
              <MDBCard className="dark-grey-text">
                <MDBCardBody className="z-depth-2 text-center">
                  <h3 className="dark-grey-text text-center">
                    <strong>Kundenportal</strong>
                  </h3>
                  <hr />
                  <form onSubmit={this.submitHandler}>
                    {authErrorDetails && (
                      <MDBAlert color="danger">
                        Das Passwort ist ungültig oder der Benutzer existiert nicht.
                      </MDBAlert>
                    )}
                    <input
                      value={this.state.email}
                      onChange={this.changeHandler}
                      type="email"
                      placeholder="E-Mail"
                      id="materialFormRegisterConfirmEx2"
                      name="email"
                      className="form-control my-3"
                      required
                    />
                    <input
                      value={this.state.password}
                      onChange={this.changeHandler}
                      type="password"
                      id="materialFormRegisterConfirmEx4"
                      className="form-control mb-1"
                      placeholder="Kennwort"
                      name="password"
                      required
                    />
                    <div className="text-right mb-3">
                      <span className="clickable text-muted">
                        Passwort vergessen
                      </span>
                    </div>
                    <MDBBtn color="indigo" type="submit">
                      <MDBIcon icon="angle-right" />
                      login
                    </MDBBtn>
                  </form>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </MDBView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authErrorDetails: state.auth.authErrorDetails,
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (credentials) => dispatch(signIn(credentials)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(LoginPage));

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019 Christian Aichner
 */
