import React, { useState, useEffect, useRef, useContext } from "react";
import Button from "react-bootstrap/Button";
import {
  Firestore,
  collection,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../../utils/firebaseConfig";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { ListGroup } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import Spacer from "../../layout/Spacer";
import Brain from "../../../assets/logo.png";
import "./MyAssignments.css";
import { AuthenticationContext } from "../../../infrastructure/Authentication/authentication.context";
import AssignmentItem from "./AssignmentItem";
import NewAssignmentModal from "./Modal";
import { useNavigate } from "react-router";
import { v4 as uuidv4 } from "uuid";

const Assignments = () => {
  const { uid, user, setUser, setUid } = useContext(AuthenticationContext);
  const [assignments, setAssignments] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  const navigate = useNavigate();
  const auth = getAuth();
  useEffect(() => {
    auth.onAuthStateChanged((u) => {
      console.log("changed: ", u);
      setUser(u);
      setUid(u.uid);
    });
  }, []);

  useEffect(() => {
    console.log(uid);
    if (!uid) return;
    async function getAssignments() {
      const usersRef = collection(db, "users"); // Reference to the "users" collection
      const userDocRef = doc(usersRef, uid); // Reference to a specific user document within the "users" collection
      const assignmentsRef = collection(userDocRef, "assignments"); // Reference to the "posts" collection inside the user document
      console.log("ref", assignmentsRef);

      getDocs(assignmentsRef)
        .then((querySnapshot) => {
          console.log("querysnapshot", querySnapshot);
          if (querySnapshot.size === 0) {
            console.log("The collection is empty");
          } else {
            console.log("The collection exists");
            //   setAssignment(querySnapshot)
            const tempAssignments = [];
            querySnapshot.forEach((doc) => {
              tempAssignments.push({ id: doc.id, ...doc.data() });
            });
            setAssignments(tempAssignments);
          }
        })
        .catch((error) => {
          console.log("Error getting collection:", error);
        });
    }

    getAssignments();
  }, [uid]);

  useEffect(() => {
    console.log("assignments", assignments[0]);
  }, [assignments]);

  return (
    <Container
      fluid
      style={{
        padding: 0,
        margin: 0,
        overflowX: "hidden",
        backgroundColor: "#DCEDDB",
      }}
    >
      <NewAssignmentModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        onCreate={(title) => {
          let docId = uuidv4();
          async function createNewAssignment() {
            await setDoc(doc(db, `users/${uid}/assignments/${docId}`), {
              title: title,
            });
          }
          createNewAssignment();
          navigate(`/grade?d=${docId}`);
        }}
      />

      <div style={{ padding: 50, justifyContent: "center", alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
        <h1 className="title">Your assignments</h1>
        <Spacer size={10} />
        <Button variant="outline-success" onClick={() => setModalShow(true)}>
          <i className="fa fa-plus"></i> &nbsp;Add new
        </Button>
      </div>

      <Row
        style={{
          minHeight: "75vh",
          height: "100%",
          margin: 0,
          width: "100vw",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        {assignments.length > 0 ? assignments.map((item) => (
          <AssignmentItem
            title={item.title}
            id={item.id}
            key={item.id}
            criteria={item.criteria}
          />
        )) : <h5 style={{textAlign: 'center'}} className="text-muted">You have no assignments yet. <br></br>Why not create one now?</h5>}
      </Row>
    </Container>
  );
};

export default Assignments;
