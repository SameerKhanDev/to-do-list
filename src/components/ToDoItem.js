import React from "react";
import {Form,Button, Container, Row, Col} from "react-bootstrap";
class ToDoItem extends React.Component{

    render() {
        return (
            <Container>
            <Row>
              <Col><h3>{this.props.task}</h3></Col>
             <Col><Button variant="success" onClick={() => this.props.onCompleteTask(this.props.task)}>Done</Button></Col>
             </Row>
            </Container>
          
        )
    }

}

export default ToDoItem;