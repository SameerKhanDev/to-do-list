import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form,Button} from "react-bootstrap";
class App extends React.Component {
  state = {
    inputVal: "",

    //pull toDoTasks from backend
    toDoTasks: [],

    //pull completedTasks from backend
    completedTasks: []

  };

  onCreateTask = () =>{
    alert(this.state.inputVal);
    var arr = this.state.toDoTasks.concat(this.state.inputVal);
    this.setState({toDoTasks: arr});

  };

  renderToDoItems(){
    return this.state.toDoTasks.map(task =>{
      return <h2>{task}</h2>
    });
  }

  render(){
  return (
    <div>
       <Form>
     <div>
        <Form.Label  htmlFor="task">Enter Task</Form.Label>
        <Form.Control
            placeholder ="task"
            onChange={e => this.setState({inputVal: e.target.value})}
            type = "text"
            id="taskInput"/>
            <br></br>
             <Button variant="primary" onClick={this.onCreateTask}>Create</Button>
            </div>
          </Form>

    <br></br>

    <h2>To Do:</h2>

    <div> {this.renderToDoItems()}</div>
    

     
    <h2>Complete</h2>
    </div>
  );
  }
}

export default App;
