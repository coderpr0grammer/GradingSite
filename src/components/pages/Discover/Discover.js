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
import ExploreAssignments from "../../../assets/ExploreAssignments.png";

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
        <div class="center">
          <div class="row" id="DiscoverHeader">
            <div class="col-6">
              <h1 style={{padding:'36px 0px'}} id="DiscoverHeaderText">Discover what other professors, teachers, and alike are up to</h1>
            </div>
            <div class="col">
              <img style={{width:'100%'}} src={ExploreAssignments}></img>
            </div>
          </div>

          <div style={{margin:'30px', display: 'flex', justifyContent:'flex-start', gap: '20px'}}>
            <form>
              <label for="gsearch"></label>
              <input type="search" placeholder="Search for an Assignment..." id="gsearch"/>
            </form>

            <select class="categoryDropDown">
              <option class="categoryDropDownChoice">Sort A-Z</option>
              <option class="categoryDropDownChoice">Sort Z-A</option>
            </select>
          </div>
          
          <div style={{margin:'30px', display: 'flex', justifyContent:'space-evenly', gap: '20px'}}>
            <Card class="card">
              <Card.Title class='card-title'>Understanding the World Through Marxist Lens</Card.Title>
              <Card.Subtitle class='card-subtitle'>By: Carlene Adams</Card.Subtitle>
              <Card.Text class='card-text'>
                This assignment explores the use of marxist theory and lens to analyze the inner workings of literacture that has been used to impact the world in a positive manner. This has been inspired by the... idk what this is lorem ipsum this is just for testing purposes will this overflow?
              </Card.Text>
              <a href="/grade"><Button variant="primary">Use Assignment</Button></a>
            </Card>
            <Card class="card">
              <Card.Title class="card-title">How Has the World  Been Influenced by the novel 1984?</Card.Title>
              <Card.Subtitle class="card-subtitle">By: Jackson James</Card.Subtitle>
              <Card.Text class="card-text">
                This assignment explores the use of authoritarian rule to analyze the inner workings of literature that has been used to impact the world in a positive manner. This has been inspired by the...
              </Card.Text>
              <a href="/grade"><Button variant="primary">Use Assignment</Button></a>
            </Card>
            <Card class="card">
              <Card.Title class="card-title">The Fundamental Philosophical Natures</Card.Title>
              <Card.Text class="card-subtitle">By: Maxine Deans</Card.Text>
              <Card.Text class="card-text">
                This assignment explores the use of authoritarian rule to analyze the inner workings of literature that has been used to impact the world in a positive manner. This has been inspired by the...
              </Card.Text>
              <a href="/grade"><Button variant="primary">Use Assignment</Button></a>
            </Card>
          </div>

          <Button variant="primary">Find More Inspiration</Button>
        </div>
      </header>
    </div>
  );
}

export default Discover;
