import React from "react";
import "./Discover.css";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function Discover() {

  return (
    <div className="App">
      <header className="App-header">
      
      
      
      <div class="row" id="DiscoverHeader">
    <div class="col-6" >
    <h1 id="DiscoverHeaderText">Discover what other professors, teachers, and alike are up to</h1>
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
  <input type="search" placeholder="Search for an Assignment..." id="gsearch"/>
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

<div id="inspirationContainer">
    <h1 id="inspirationBtn">Find More Inspiration</h1>
</div>

    </header>
    </div>
  );
}

export default Discover;
