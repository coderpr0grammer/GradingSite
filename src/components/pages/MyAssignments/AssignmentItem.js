import React, { useState, useEffect } from 'react'
import Col from "react-bootstrap/Col";
import Card from 'react-bootstrap/Card';
import { Button } from 'react-bootstrap';
import './AssignmentItem.css'
import { useNavigate } from 'react-router';
import { ListGroup } from 'react-bootstrap';
import Spacer from '../../layout/Spacer';

const AssignmentItem = (props) => {
    const navigate = useNavigate()
    console.log(props.criteria)

    const [criteria, setCriteria] = useState(null);

    useEffect(() => {
        if (!props.criteria) return;
        setCriteria(props.criteria)
    }, [props.criteria])
    return (
        <Col sm={4} style={{ borderRadius: 10, width: 'auto' }}>

            <Card className="AssignmentCard" title={props.title} style={{ width: '18rem', height: '18rem', overflow: 'hidden', margin: 'auto', cursor: 'pointer', background: '#F6F9F4' }} onClick={() => navigate(`/grade?d=${props.id}`)}>
                <Card.Body style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    textAlign: 'left'
                }}>
                    <Card.Title>{props.title}</Card.Title>

                    {criteria && (<div><Spacer size={10} />{criteria.length > 0 ? 'Criteria' : 'There is no criteria for this assignment yet.' }
                        <ListGroup style={{ background: '#DCEDDB !important', overflow: 'scroll' }}>
                            {criteria.map((currentValue, index) => (
                                <ListGroup.Item style={{ background: 'transparent', textAlign: 'left', maxHeight: 100, whiteSpace: criteria.length > 1 && 'nowrap', overflowX: 'scroll' }} key={index} className={index > 2 ? 'd-none' : ''}>{currentValue}</ListGroup.Item>
                            ))}
                            {criteria.length > 4 && (
                                <ListGroup.Item style={{ background: 'transparent' }} className="text-left">
                                    ...
                                </ListGroup.Item>
                            )}

                        </ListGroup>
                    </div>)}

                </Card.Body>
            </Card>

        </Col>
    )
}

export default AssignmentItem;