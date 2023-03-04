import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";

const NewAssignmentModal = (props) => {
  const [title, setTitle] = useState("");
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Form>
      <Modal.Header closeButton>
        <Modal.Title>New assignment</Modal.Title>
      </Modal.Header>
      
      <Modal.Body>
        
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Assignment Name</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="e.g Grade 10 Compare and Constrast"
              autoFocus
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </Form.Group>
        
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={props.onHide}>
          Cancel
        </Button>
        <Button
          type="submit"
          variant="success"
          onClick={(e) => {
            e.preventDefault();

            if (title.length < 5) {
              alert("Oops! Please enter a title at least 5 characters long");
              return;
            }
            props.onCreate(title);
          }}
        >
          Create
        </Button>
      </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default NewAssignmentModal;
