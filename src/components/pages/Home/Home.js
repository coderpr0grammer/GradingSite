import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Home.css";
import TeacherAsset from "../../../assets/Teacher-Asset.png";

export default function Home() {
  return (
    <div id="Home">
      <Container fluid id="container" style={{ height: "100%" }}>
        <Row
          style={{
            display: "flex",
            height: "100%",
            padding: 50,
          }}
        >
          <Col style={{display: 'flex', justifyContent: 'center', paddingTop: 50}}>
            <h1 style={{color: "#28A334", fontSize: 80, fontWeight:1000}}>
              Grading Just <br></br>Got <span style={{color: '#150578'}}>Easier</span>
            </h1>
          </Col>
          <Col style={{ display: "flex", justifyContent: "flex-start" }}>
            <img
              alt="GradingSite"
              src={TeacherAsset}
              style={{ width: "35vw" }}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}
