import React, { useState, useEffect, useContext } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Home.css";
import TeacherAsset from "../../../assets/Teacher-Asset.png";
import { collection, setDoc, getDoc, doc } from "firebase/firestore";
import { GoogleLogin } from "@react-oauth/google";
import { app, db } from "../../../utils/firebaseConfig";
import { AuthenticationContext } from "../../../infrastructure/Authentication/authentication.context";
import { useNavigate } from "react-router";
import Button from 'react-bootstrap/Button';

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";

export default function Home() {
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const navigate = useNavigate()

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
        navigate('my-assignments')
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
    <div id="Home">
      <Container fluid id="container" style={{ height: "100%", minHeight: '72.5vh' }}>
        <Row
          style={{
            display: "flex",
            height: "100%",
            padding: 50,
          }}
        >
          <Col
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: 50,
            }}
          >
            <div>
              <h1 style={{ color: "#28A334", fontSize: 80, fontWeight: 1000 }}>
                Grading Just <br></br>Got{" "}
                <span style={{ color: "#150578" }}>Easier</span>
              </h1>
              <div style={{ marginTop: 50 }}>
                {!user ? <GoogleLogin
                  onSuccess={responseMessage}
                  onError={errorMessage}
                  useOneTap
                /> : <Button variant="outline-success" onClick={()=> navigate('my-assignments')}>Go to Assignments</Button>}
              </div>
              <h1 style={{ color: "#29509C", fontSize: 20, fontWeight: 1000 }}>
              <p class="bulletPoints">• Streamline the grading and evaluation of media</p>
              <p class="bulletPoints">• Efficiently manage the works of numerous student</p>
              <p class="bulletPoints">• Take control of your precious time</p>
              <a class="btn btn-primary" id="homeTryBtn" href="my-assignments" role="button">Try Now</a>
              </h1>
              
            </div>
          </Col>
          <Col style={{ display: "flex", justifyContent: "flex-start" }}>
            <img
              alt="GradingSite"
              src={TeacherAsset}
              style={{ width: "35vw" }}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
