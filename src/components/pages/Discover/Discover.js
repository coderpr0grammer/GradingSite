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
import ExploreAssignments from "../../../assets/download.png";
import { Row } from "react-bootstrap";
import Container from "react-bootstrap/Container";

function Discover() {
  const [allAssignments, setAllAssignments] = useState([]);
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

  return (
    <Container fluid id="container" style={{paddingTop: '30px'}}>
      <Row id="DiscoverHeader">
        <div class="col-6">
          <h1 style={{ padding: "36px 0px" }} id="DiscoverHeaderText">
            Discover what other professors, teachers, and alike are up to
          </h1>
        </div>
        <div class="col">
          <img
            alt="Explore"
            style={{ width: "100%" }}
            src={ExploreAssignments}
          ></img>
        </div>
      </Row>

      <Row
        style={{
          margin: "30px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            gap: "20px",
          }}
        >
          <form>
            <label for="gsearch"></label>
            <input
              type="search"
              placeholder="Search for an Assignment..."
              id="gsearch"
            />
          </form>
        </div>
      </Row>

      <Row
        style={{
          minHeight: "75vh",
          height: "100%",
          margin: "0 30px",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "flex-start",
        }}
      >
        {allAssignments &&
          allAssignments.map((item) => (
            <AssignmentItem
              title={item.title}
              id={item.id}
              key={item.id}
              criteria={item.criteria}
            />
          ))}
      </Row>
    </Container>
  );
}

export default Discover;
