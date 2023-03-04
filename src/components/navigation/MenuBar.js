import React, { useState, useEffect, useContext } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import "./MenuBar.css";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Logo from "../../assets/logo.png";
import { collection, setDoc, getDoc, doc } from "firebase/firestore";
import { GoogleLogin } from "@react-oauth/google";
import { app, db } from "../../utils/firebaseConfig";
import { AuthenticationContext } from "../../infrastructure/Authentication/authentication.context";
import theme from "../../infrastructure/theme";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";

function MenuBar() {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  const { user, setUser, uid, setUid } = useContext(AuthenticationContext);

  console.log("user: ", user);

  auth.onAuthStateChanged((u) => {
    console.log("changed: ", u);
    setUser(u);
    setUid(u.uid);
  });

  useEffect(() => {
    console.log(user);
    console.log(uid);
  }, [uid]);

  const responseMessage = (response) => {
    // response.preventDefault()
    console.log(response);
    // Build Firebase credential with the Google ID token.
    const idToken = response.credential;
    const credential = GoogleAuthProvider.credential(idToken);

    // Sign in with credential from the Google user.
    signInWithCredential(auth, credential)
      .then((u) => {
        async function checkIfUserExists() {
          const docRef = doc(db, "users", u.user.uid);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
            console.log("u.user", u.user);
            await setDoc(doc(db, "users", u.user.uid), {
              name: u.user.displayName,
              email: u.user.email,
            });
          }
        }
        checkIfUserExists();
        console.log("u", u);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The credential that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        console.log(errorCode, errorMessage);
      });
  };
  const errorMessage = (error) => {
    console.log(error);
  };

  return (
    <Navbar
      className="color-nav"
      collapseOnSelect
      expand="lg"
      variant="light"
      style={{ padding: 20 }}
    >
      <Container fluid>
        <Navbar.Brand>
          <Link to="/" style={{ textDecoration: "none", color: "white" }}>
            <img src={Logo} width="50" />
            &nbsp;&nbsp;&nbsp;Graider
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Nav.Link style={{ textAlign: "right", padding: "8px 50px 0px 0px"}} href="/my-assignments">
              <span
                to="/my-assignments"
                style={{ textDecoration: "none", color: "white" }}
              >
                <i className="fa-solid fa-book"></i> &nbsp;
                My Assignments
              </span>
            </Nav.Link>
            <Nav.Link style={{ textAlign: "right", padding: "8px 50px 0px 0px"}} href="/discover">
              <span
                to="/discover"
                style={{ textDecoration: "none", color: "white" }}
              >
                <i className="fa-solid fa-compass"></i>&nbsp;&nbsp;Discover
              </span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MenuBar;
