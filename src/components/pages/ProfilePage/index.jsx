//> React
// Contains all the functionality necessary to define React components
import React from "react";
// Router
import { Link, Redirect, withRouter } from "react-router-dom";

//> Additional modules
// Firebase
import firebase from "firebase";

//> Redux
// Connect
import { connect } from "react-redux";
// Actions
import { signOut } from "../../../store/actions/authActions";

//> MDB
// "Material Design for Bootstrap" is a great UI design framework
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardUp,
  MDBAvatar,
  MDBCardBody,
  MDBListGroup,
  MDBListGroupItem,
  MDBBtn,
  MDBIcon,
  MDBBadge,
} from "mdbreact";
//> Components
// To be added here

//> CSS
import "./profilepage.scss";

//> Images
// To be added here

class ProfilePage extends React.Component {
  state = {};

  getGreetingTxt = () => {
    // Get date
    let today = new Date();
    // Get current hours
    let curHr = today.getHours();

    // Store selected greeting
    let selected = null;

    if (curHr < 11) {
      selected = <span>Guten Morgen</span>;
    } else if (curHr < 18) {
      selected = <span>Willkommen zurück</span>;
    } else {
      selected = <span>Guten Abend</span>;
    }

    return selected;
  };

  render() {
    const { auth, profile } = this.props;
    console.log(auth, profile);
    // Check if firebase has loaded profile data
    if (!profile.isLoaded) {
      return (
        <MDBContainer className="flex-center my-5 py-5">
          <div className="spinner-grow text-primary" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </MDBContainer>
      );
    } else {
      // Check if logged in
      if (auth.uid === undefined) return <Redirect to="/" />;

      return (
        <div id="profile">
          <div className="greeting py-5 text-center">
            <h2 className="text-center font-weight-bold">
              {this.getGreetingTxt()} <span>{profile.first_name}</span>!
            </h2>
            <Link to="../">
              <MDBBtn color="white" outline>
                Homepage
              </MDBBtn>
            </Link>
            <MDBBtn color="white" outline onClick={() => this.props.signOut()}>
              Sign Out
            </MDBBtn>
          </div>
          <div className="py-4 greeting-actions">
            <MDBContainer>
              <MDBRow className="flex-center">
                <MDBCol md="2" className="text-center">
                  <p className="lead">
                    <MDBIcon icon="bolt" className="pr-2 orange-text" />
                    Quick actions
                  </p>
                </MDBCol>
                <MDBCol md="5" className="text-center">
                  <MDBBtn color="indigo">
                    <MDBIcon icon="history" />
                    History
                  </MDBBtn>
                  <MDBBtn color="elegant">
                    <MDBIcon far icon="file" />
                    Meine Dokumente
                  </MDBBtn>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </div>
          <div className="main">
            <MDBContainer className="py-5">
              <MDBRow className="justify-content-center">
                <MDBCol md="7">
                  <MDBCard className="w-100">
                    <MDBCardBody>
                      <MDBRow>
                        <MDBCol col="6">
                          <p className="lead font-weight-bold">Ihre offenen Anfragen</p>
                        </MDBCol>
                        <MDBCol col="6" className="text-right">
                          <span className="clickable text-muted">Alle Anfragen</span>
                        </MDBCol>
                      </MDBRow>
                      
                      <div className="orders">
                      {false ? (
                        <p className="text-muted">Derzeit haben Sie keine offenen Anfragen.</p>
                      ) : (
                        <MDBListGroup className="mb-3">
                          <MDBListGroupItem>
                            <div className="d-flex w-100 justify-content-between">
                              <h5 className="mb-1">Gutschein2Go Überprüfung</h5>
                              <span>Status: <MDBBadge color="info">In Bearbeitung</MDBBadge></span>
                            </div>
                            <p className="my-3">
                            <MDBBtn color="elegant" size="md">
                              <MDBIcon icon="upload" />
                              Dokumente hochladen
                            </MDBBtn>
                            </p>
                            <div className="d-flex w-100 justify-content-between align-items-center">
                              <div>
                                <MDBBtn color="indigo" outline size="sm">
                                  Details
                                </MDBBtn>
                                <MDBBtn color="indigo" size="sm">
                                  Anmerkung hinzufügen
                                </MDBBtn>
                              </div>
                              <small>Vor 3 Tagen aktualisiert</small>
                            </div>
                          </MDBListGroupItem>
                        </MDBListGroup>
                      )}
                        <MDBBtn color="indigo">
                          <MDBIcon icon="plus" />
                          Anfrage
                        </MDBBtn>
                      </div>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
                <MDBCol md="3" className="text-center">
                  <MDBCard className="w-100" testimonial>
                    <MDBCardUp className='indigo lighten-3' />
                    <MDBAvatar className='mx-auto white'>
                      <img
                        src='https://mdbootstrap.com/img/Photos/Avatars/img%20%2810%29.jpg'
                        alt=''
                      />
                    </MDBAvatar>
                    <MDBCardBody>
                      <p className="lead font-weight-bold mb-0">Ihr Betreuer</p>
                      <p className="lead mb-3">Max Mustermann</p>
                      <MDBBtn outline color="indigo" className="w-100">
                        <MDBIcon far icon="comments" />
                        Chat
                      </MDBBtn>
                      <MDBBtn color="indigo" className="w-100">
                        <MDBIcon far icon="calendar" />
                        Termine
                      </MDBBtn>
                    </MDBCardBody>
                  </MDBCard>
                </MDBCol>
              </MDBRow>
            </MDBContainer>
          </div>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signOut: () => dispatch(signOut()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(ProfilePage));

/**
 * SPDX-License-Identifier: (EUPL-1.2)
 * Copyright © 2019 Christian Aichner
 */
