import React from "react";
import AssignmentItem from "../MyAssignments/AssignmentItem";
import { Row } from "react-bootstrap";

const AssignmentsList = ({ assignments }) => {
    return (
        <Row
        style={{
          minHeight: "75vh",
          height: "100%",
          margin: "0 30px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        {
            assignments.map((item, index) => {
            return (
            <AssignmentItem
              title={item.title}
              id={item.id}
              key={item.id}
              criteria={item.criteria}
            />)
            ;
          })
        }
        </Row>
    )
  
};

export default AssignmentsList;
