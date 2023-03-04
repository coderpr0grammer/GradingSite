import React from "react";
import "./MyAssignments.css";
import Card from 'react-bootstrap/Card';

function MyAssignments() {

  return (
    <div className="App">
      <header className="App-header">
      <h1 id="myAssignmentsHeader">Grade Your Papers Now</h1>
      <h1 id="newAssignementBtn">New Assignment</h1>

      <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src="1984.jpg" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
    </Card>




    </header>
    </div>
  );
}




export default MyAssignments;
