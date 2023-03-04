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
import GradedComments from "../../../assets/GradedComments.png";
import DiscoverPage from "../../../assets/DiscoverPage.png";


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
              <h1 class="main-title">
                Grading Just <br></br>Got{" "}
                <span style={{ color: "#150578" }}>Easier</span>
              </h1>
              <h1 style={{ color: "#29509C", fontSize: 20, fontWeight: 1000 }}>
              <p class="bulletPoints"><i class="fa-solid fa-check"></i>&nbsp;&nbsp;<span style={{color: '#28A745', fontWeight: 800, fontSize: 22}}>Streamline</span> the grading and evaluation of media</p>
              <p class="bulletPoints"><i class="fa-solid fa-check"></i>&nbsp;&nbsp;Avoid grading with <span style={{color: '#28A745', fontWeight: 800, fontSize: 22}}>biases</span> towards student works</p>
              <p class="bulletPoints"><i class="fa-solid fa-check"></i>&nbsp;&nbsp;Take <span style={{color: '#28A745', fontWeight: 800, fontSize: 22}}>control</span> of your precious time</p>
              </h1>
              <div style={{ marginTop: 30 }}>
                {!user ? <GoogleLogin
                  onSuccess={responseMessage}
                  onError={errorMessage}
                  useOneTap
                /> : <Button variant="outline-success" onClick={()=> navigate('my-assignments')}>Go to Assignments</Button>}
              </div>     
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

        {/* Promo row 1 "Media Feedback" */}
        <Row style={{
          display: "flex",
          height: "100%",
          padding: 50,
        }}>
          <Col style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: 0,
          }}>
            <div style={{
              backgroundColor: '#b0e39a',
              padding: '100px 100px 0px 150px',
              transform: 'translate(-100px)',
              borderRadius: '25px'
            }}>
              <h1 class="main-subtitle">A Better Way to Grade</h1>
              <p class="main-text" style={{maxWidth: '50%'}}>Graider uses innovative technology and artificial intelligence to streamline the marking process</p>
            </div>

            <img
              alt="Media Feedback"
              src={GradedComments}
              style={{ width: "35vw",
               transform: 'translate(-30vw, 20vh)',
               filter: 'drop-shadow(2px 14px 25px rgb( 0 0 0 / 30%)'
              }}
            />
          </Col>
        </Row>

        {/* Promo row 2 "Discover" */}
        <Row style={{
          display: "flex",
          height: "100%",
          padding: 50,
        }}>
          <Col style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: 150,
          }}>

            <img
              alt="Discover Page"
              src={DiscoverPage}
              style={{ width: "70vw",
                transform: 'translate(30vw)'
              }}
            />
          </Col>
        </Row>

        <Row style={{ marginTop: 30, paddingBottom: 100, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          {!user ? <GoogleLogin
            onSuccess={responseMessage}
            onError={errorMessage}
            useOneTap
          /> : <Button variant="outline-success" style={{width: 500, height: 100, fontSize: 40}} onClick={()=> navigate('my-assignments')}>Go to Assignments</Button>}
        </Row> 
      </Container>
    </div>
  );
}
