import React from "react";
import "./Discover.css";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function Discover() {

  return (
    <div className="App">
      <header className="App-header">
      
      
      
      <div class="row">
    <div class="col-8">
    <h1 id="DiscoverHeader">Grade Your Papers Now</h1>
    </div>
    <div class="col">
      {/* //ISSUE: should have img plus icon here */}
    <h1 id="DiscoverBtn">New Assignment</h1>
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
        <Button variant="primary">Use Assignment</Button>
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
        <Button variant="primary">Use Assignment</Button>
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
        <Button variant="primary">Use Assignment</Button>
      </a>
      </Card.Body>
    </Card>
    </div>
  </div>


    </header>
    </div>
  );
}

export default Discover;
