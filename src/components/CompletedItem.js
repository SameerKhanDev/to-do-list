import React from "react";
import {Form,Button, Container, Row, Col} from "react-bootstrap";
class CompletedItem extends React.Component{
    state={
        test:[]
    }

    render() {
        return (
            <Container>
            <Row>
              <Col><h3>{this.props.task}</h3></Col>
             </Row>
            </Container>
          
        )
    }

}

export default CompletedItem;