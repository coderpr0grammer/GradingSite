import React from "react";
import "./MyAssignments.css";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function MyAssignments() {

  return (
    <div className="App">
      <header className="App-header">
      
      
      
      <div class="row">
    <div class="col-8">
    <h1 id="myAssignmentsHeader">Grade Your Papers Now</h1>
    </div>
    <div class="col">
      {/* //ISSUE: should have img plus icon here */}
    <h1 id="newAssignementBtn">New Assignment</h1>
    </div>
  </div>
  

  <div class="row">
    <div class="col">
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title class="cardTitle">Card Title</Card.Title>
        <Card.Text class="cardDesc">
          Description of stuff goes here
        </Card.Text>
        <a href="/grade">
        <Button variant="primary">Use Existing</Button>
      </a>
      </Card.Body>
    </Card>
    </div>
    <div class="col">
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title class="cardTitle">Card Title</Card.Title>
        <Card.Text class="cardDesc">
          Description of stuff goes here
        </Card.Text>
        <a href="/grade">
        <Button variant="primary">Use Existing</Button>
      </a>
      </Card.Body>
    </Card>
    </div>
    <div class="col">
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title class="cardTitle">Card Title</Card.Title>
        <Card.Text class="cardDesc">
          Description of stuff goes here
        </Card.Text>
        <a href="/grade">
        <Button variant="primary">Use Existing</Button>
      </a>
      </Card.Body>
    </Card>
    </div>
  </div>




    </header>
    </div>
  );
}




export default MyAssignments;
