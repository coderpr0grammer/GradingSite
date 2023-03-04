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
import "./Discover.css";
import Card from "react-bootstrap/Card";
import { db } from "../../../utils/firebaseConfig";
import AssignmentItem from "../MyAssignments/AssignmentItem";
import ExploreAssignments from "../../../assets/graphicUpscaled.jpg";
import { Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import AssignmentsList from "./AssignmentsList";
import Form from "react-bootstrap/Form";

function Discover() {
  const [allAssignments, setAllAssignments] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  useEffect(() => {
    async function getDiscoverAssignments() {
      getDocs(collection(db, "discoverAssignments"))
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
            console.log(tempAssignments);
            setAllAssignments(tempAssignments);
          }
        })
        .catch((error) => {
          console.log("Error getting collection:", error);
        });
    }

    getDiscoverAssignments();
  }, []);

  const filteredAssignments = allAssignments.filter(assignment => {
		return assignment.title.toLowerCase().includes(searchValue.toLowerCase());
	})


  return (
    <Container fluid id="container" style={{ paddingTop: "30px" }}>
      <Row id="DiscoverHeader">
        <div class="col-6">
          <h1
            style={{ padding: "36px 0px", color: "#7FBFE2" }}
            id="DiscoverHeaderText"
          >
            Discover what other professors, teachers, and alike are up to
          </h1>
        </div>
        <div
          class="col"
          style={{
            display: "flex",
            justifyContent: "center",
            paddingRight: "100px",
          }}
        >
          <img
            alt="Explore"
            style={{ height: "50vh" }}
            src={ExploreAssignments}
          ></img>
        </div>
      </Row>

      <Row
        style={{
          margin: "30px",
        }}
      >
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Search for an assignment</Form.Label>
            <Form.Control type="text" placeholder="Grade 10 english..." style={{maxWidth: 300}} onChange={(e)=> setSearchValue(e.target.value)} value={searchValue} />
          </Form.Group>
      </Row>

      <AssignmentsList assignments={filteredAssignments} />
    </Container>
  );
}

export default Discover;
