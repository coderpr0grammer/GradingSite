import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Home.css";
import TeacherAsset from "../../../assets/Teacher-Asset.png";

export default function Home() {
  return (
    <div id="Home">
      <Container id="container">
        <Row
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Col style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'flex-start', padding: 50, height: '100%'}}><h1>Grading Just Got Easier</h1></Col>
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
