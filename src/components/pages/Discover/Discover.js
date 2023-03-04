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

function Discover() {
  const [allAssignments, setAllAssignments] = useState([]);
  useEffect(() => {
    async function getDiscoverAssignments() {
      

      getDocs(collection(db, 'discoverAssignments'))
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
            console.log(tempAssignments)
            setAllAssignments(tempAssignments)
          }
          
        })
        .catch((error) => {
          console.log("Error getting collection:", error);
        });
    }

    getDiscoverAssignments();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div class="row" id="DiscoverHeader">
          <div class="col-6">
            <h1 id="DiscoverHeaderText">
              Discover what other professors, teachers, and alike are up to
            </h1>
          </div>
          <div class="col">
            {/* //ISSUE: should have img plus icon here */}
            <h1 id="DiscoverImg">picture goes here</h1>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <form class="searchSort">
              <label for="gsearch"></label>
              <input
                type="search"
                placeholder="Search for an Assignment..."
                id="gsearch"
              />
            </form>
          </div>
          <div class="col">
            <select class="categoryDropDown">
              <option class="categoryDropDownChoice">Sort A-Z</option>
              <option class="categoryDropDownChoice">Sort Z-A</option>
            </select>
          </div>
        </div>

        <div class="row">
          <div class="col">
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title class="cardTitle">
                  Understanding the World Through Marxist Lens
                </Card.Title>
                <Card.Text class="cardDesc">By: Carlene Adams</Card.Text>
                <Card.Text class="cardDesc">
                  This assignment explores the use of marxist theory and lens to
                  analyze the inner workings of literacture that has been used
                  to impact the world in a positive manner. This has been
                  inspired by the...
                </Card.Text>
                <a href="/grade">
                  <Button variant="primary">Use Assignment</Button>
                </a>
              </Card.Body>
            </Card>
          </div>
          <div class="col">
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title class="cardTitle">
                  How Has the World Been Influenced by the novel 1984?
                </Card.Title>
                <Card.Text class="cardDesc">By: Jackson James</Card.Text>
                <Card.Text class="cardDesc">
                  This assignment explores the use of authoritarian rule to
                  analyze the inner workings of literature that has been used to
                  impact the world in a positive manner. This has been inspired
                  by the...
                </Card.Text>
                <a href="/grade">
                  <Button variant="primary">Use Assignment</Button>
                </a>
              </Card.Body>
            </Card>
          </div>
          <div class="col">
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title class="cardTitle">
                  The Fundamental Philosophical Natures
                </Card.Title>
                <Card.Text class="cardDesc">By: Maxine Deans</Card.Text>
                <Card.Text class="cardDesc">
                  This assignment explores the use of authoritarian rule to
                  analyze the inner workings of literature that has been used to
                  impact the world in a positive manner. This has been inspired
                  by the...
                </Card.Text>
                <a href="/grade">
                  <Button variant="primary">Use Assignment</Button>
                </a>
              </Card.Body>
            </Card>
          </div>
        </div>

        <div id="inspirationContainer">
          <h1 id="inspirationBtn">Find More Inspiration</h1>
        </div>
      </header>
    </div>
  );
}

export default Discover;
