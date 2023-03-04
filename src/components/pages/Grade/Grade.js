import React, { useState, useEffect, useRef, useContext } from "react";
import Button from "react-bootstrap/Button";
import { collection, setDoc, updateDoc, getDoc, doc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../../utils/firebaseConfig";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { ListGroup } from "react-bootstrap";
import { InputGroup } from "react-bootstrap";
import { AuthenticationContext } from "../../../infrastructure/Authentication/authentication.context";
import Brain from "../../../assets/logo.png";
import Spacer from "../../layout/Spacer";
import { useSearchParams } from "react-router-dom";
import theme from "../../../infrastructure/theme";
import { PieChart } from "react-minimal-pie-chart";
import BarGraph from "./BarGraph";

import "./Grade.css";
import { faBorderStyle } from "@fortawesome/free-solid-svg-icons";

const auth = getAuth();

const errorMessage = (error) => {
  console.log(error);
};

const Grade = () => {
  const [criteria, setCriteria] = useState([]);
  const [criteriaValue, setCriteriaValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [assignmentText, setAssignmentText] = useState("");
  const [gradeLevel, setGradeLevel] = useState(12);
  const [mark, setMark] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [title, setTitle] = useState("");
  const resultRef = useRef(null);
  const [thisAssignment, setThisAssigment] = useState(null);
  const [responseParsed, setResponseParsed] = useState(null);
  const { user, uid, setUser, setUid } = useContext(AuthenticationContext);
  const mountRef = useRef(false);

  const inputRef = useRef(null);

  useEffect(() => {
    const inputElement = inputRef.current;
    if (inputElement) {
      const { width } = inputElement.getBoundingClientRect();
      inputElement.style.width = `${width}px`;
    }
  }, [title]);

  let [searchParams, setSearchParams] = useSearchParams();

  const addCriteria = (name) => {
    if (!name) return;
    setCriteria([...criteria, name]);
    setCriteriaValue("");
  };

  useEffect(() => {
    auth.onAuthStateChanged((u) => {
      console.log("changed: ", u);
      setUser(u);
      setUid(u.uid);
    });
  }, []);

  const changeCriterion = (value, index) => {
    console.log(value, index);
    let tempArray = criteria;
    tempArray[index] = value;
    console.log(tempArray);
    setCriteria(tempArray);
  };

  useEffect(() => {
    console.log("assignmenttext", !assignmentText);
    if (!assignmentText) return;
    async function setAssignmentTextInDB() {
      const usersRef = collection(db, "users"); // Reference to the "users" collection
      const userDocRef = doc(usersRef, uid); // Reference to a specific user document within the "users" collection
      const assignmentsRef = collection(userDocRef, "assignments"); // Reference to the "posts" collection inside the user document
      const docId = searchParams.get("d");
      const assignmentDocRef = doc(assignmentsRef, docId);
      await updateDoc(assignmentDocRef, {
        assignmentText,
      });
    }
    setAssignmentTextInDB();
  }, [assignmentText]);

  useEffect(() => {
    console.log("assignmenttext", !assignmentText);
    if (!gradeLevel) return;
    async function setAssignmentTextInDB() {
      const docId = searchParams.get("d");
      const assignmentDocRef = doc(db, `users/${uid}/assignments/${docId}`);
      await updateDoc(assignmentDocRef, {
        gradeLevel,
      });
    }
    setAssignmentTextInDB();
  }, [gradeLevel]);

  useEffect(() => {
    console.log("criteria updating in db", criteria);
    if (criteria.length < 1) return;
    async function setCriteriaInDB() {
      const usersRef = collection(db, "users"); // Reference to the "users" collection
      const userDocRef = doc(usersRef, uid); // Reference to a specific user document within the "users" collection
      const assignmentsRef = collection(userDocRef, "assignments"); // Reference to the "posts" collection inside the user document
      const docId = searchParams.get("d");
      const assignmentDocRef = doc(assignmentsRef, docId);
      await updateDoc(assignmentDocRef, {
        criteria,
      });
    }

    setCriteriaInDB();
  }, [criteria]);

  useEffect(() => {
    console.log(user);
    console.log(uid);
    if (!uid) return;
    function getThisDoc() {
      const docId = searchParams.get("d");

      if (!docId) return;

      const thisDocRef = doc(db, `users/${uid}/assignments/${docId}`);
      getDoc(thisDocRef).then((doc) => {
        const data = doc.data();
        if (data.assignmentText) {
          setAssignmentText(data.assignmentText);
        }
        if (data.title) {
          setTitle(data.title);
        }
        if (data.criteria) {
          setCriteria(data.criteria);
        }
      });
    }

    getThisDoc();
  }, [uid]);

  const gradeAssignment = (e) => {
    console.log("hi");
    e.preventDefault();
    let criteriaString = "";
    if (criteria.length < 1) {
      alert("Please enter at least 1 criterion :)");
      return;
    } else {
      setLoading(true);
      criteria.forEach((value, index) => {
        criteriaString += index + 1 + ". " + value + "\n";
      });
      console.log(criteriaString);

      let prompt = [
        {
          role: "system",
          content: `You are a strict teacher that will be marking an assignment out of 100%. You must give your response in the format: {"mark": "YOUR_MARK_WITHOUT_PERCENT_SYMBOL", "feedback": "YOUR_FEEDBACK"}`,
        },
        {
          role: "user",
          content: `The student is in grade ${gradeLevel} and has written the following paper: ${assignmentText}`,
        },
      ];

      const response = fetch("https://gradeassist-server.vercel.app/api", {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
          prompt: prompt,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data.content);

          let responseJSONParsed = JSON.parse(data.content);
          setResponseParsed(responseJSONParsed);
          setMark(responseJSONParsed.mark);
          setFeedback(responseJSONParsed.feedback);

          resultRef.current.scrollIntoView({ behavior: "smooth" });
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };

  function WordCount(str) { 
    return str.split(" ").length;
  }

  let wordCount = WordCount(assignmentText);

  function CharCount(str) { 
    return str.length;
  }

  let charCount = CharCount(assignmentText);

  return (
    <div style={{ background: theme.colors.background, padding: 30 }}>
      <h4 style={{ textAlign: "center" }}>{title && title}</h4>
      <Container
        style={{ textAlign: "left", minHeight: "80vh", minWidth: "80vw" }}
      >
        <Form
          style={{ height: "100%", minHeight: "70vh" }}
          onSubmit={gradeAssignment}
        >
          <Row style={{ height: "100%", minHeight: "70vh", display: "flex" }}>
            <Col lg={true} style={{ padding: "20px" }}>
              <div
                style={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div style={{ position: "relative", flex: 10 }}>
                  <textarea
                    required
                    className="border"
                    style={{
                      flex: 10,
                      height: "100%",
                      minHeight: "70vh",
                      width: "100%",
                      borderRadius: "5px",
                      padding: "15px ",
                    }}
                    placeholder="Paste the assignment here"
                    value={assignmentText}
                    onChange={(event) => setAssignmentText(event.target.value)}
                  ></textarea>
                  {loading && (
                    <div
                      style={{
                        position: "absolute",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        padding: "10px",
                        borderRadius: "5px",
                        backgroundColor: "rgba(0, 0, 0, 0.6)",
                        zIndex: 1,
                      }}
                    >
                      <img
                        src={Brain}
                        id="brainLoading"
                        alt="Loading"
                        width="120"
                      />
                    </div>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  variant="success"
                  id="button-addon2"
                  style={{ flex: 0.5, margin: "5px 0" }}
                  onClick={gradeAssignment}
                >
                  Mark
                </Button>
              </div>
            </Col>
            <Col
              lg={true}
              style={{
                padding: "20px",
                justifyContent: "flex-start",
                alignItems: "center",
                margin: "10px auto",
              }}
            >
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Grade level</Form.Label>
                <Form.Control
                  required
                  type="number"
                  value={gradeLevel}
                  onChange={(event) => setGradeLevel(event.target.value)}
                  placeholder="12"
                />
              </Form.Group>
              <Spacer size={50} />

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Criteria for this assignment</Form.Label>
                <ListGroup>
                  {criteria.map((currentValue, index) => {
                    return (
                      <ListGroup.Item
                        className="mb-1"
                        key={index}
                        style={{
                          padding: 0,
                          borderRadius: "10px",
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <input
                          type="text"
                          placeholder="change this criteria"
                          style={{
                            width: "100%",
                            padding: "15px",
                            borderWidth: 0,
                            borderRadius: "10px",
                            background: "transparent",
                          }}
                          value={criteria[index]}
                          onChange={(event) => {
                            const updatedCriteria = [...criteria];
                            updatedCriteria[index] = event.target.value;
                            setCriteria(updatedCriteria);
                          }}
                        />
                        <i
                          className="fa fa-trash"
                          style={{ flex: 0.2, padding: 20, fontSize: 20 }}
                          onClick={() => {
                            const updatedCriteria = [...criteria];
                            updatedCriteria.splice(index, 1);
                            setCriteria(updatedCriteria);
                          }}
                        ></i>
                      </ListGroup.Item>
                    );
                  })}
                </ListGroup>
                <InputGroup className="mt-3">
                  <Form.Control
                    placeholder="e.g. Student meets the grade 10 standards of the english curriculum"
                    aria-label="your criterion"
                    aria-describedby="basic-addon2"
                    value={criteriaValue}
                    onChange={(event) => setCriteriaValue(event.target.value)}
                  />
                  <Button
                    variant="outline-success"
                    id="button-addon2"
                    onClick={() => addCriteria(criteriaValue)}
                  >
                    Add
                  </Button>
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
        </Form>

        <Row id="result" ref={resultRef}>
          {responseParsed && (
            <div>
              
<div id="divider"></div>
              <div class="row">
    <div class="col">
    <div style={{ width: "350px", height: "350px",  borderRadius: '100%' , borderWidth: 10, borderColor: 'red'}}>
                <PieChart
                  data={[{ title: mark, value: 1, color: mark > 70 ? "green" : 'orange' }]}
                  radius={40}
                  lineWidth={10}
                  label={({ dataEntry }) => dataEntry.title}
                  labelPosition={0}
                  labelStyle={{
                    fontSize: "30px",
                    fontWeight: "bold",
                    fill: mark > 70 ? "green" : 'orange',
                  }}
                  animate
                />
              </div>
    </div>
    <div class="col">
    <BarGraph/>
    </div>
  </div>

              

              <Spacer size={30} />
              <div id="feedbackBox">
              <h1 id="feedbackTitle">Media Feedback:</h1>
              <p class="counts">Word Count: {wordCount} </p>
              <p class="counts">Character Count: {charCount}</p>
              </div>
              
            </div>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default Grade;
