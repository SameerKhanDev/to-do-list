import React from "react";
import {Form,Button} from "react-bootstrap";
class TaskCreation extends React.Component{

    render() {
        return (
            <Form>
    <div>
        <Form.Label inline htmlFor="task">Enter Task</Form.Label>
        <Form.Control
            inline
            id="taskInput"/>
            <br></br>
             <Button variant="primary">Create</Button>
            </div>
          </Form>
        )
    }

}

export default TaskCreation;