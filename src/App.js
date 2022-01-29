import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form,Button} from "react-bootstrap";
import ToDoItem from './components/ToDoItem';
import CompletedItem from './components/CompletedItem';
class App extends React.Component {
  state = {

    inputVal: "",

    toDoTasks: [],

   
    completedTasks: []

  };

  componentDidMount(){

    //pull toDoTasks and completedTasks from backend
    this.getTasks()
    .then(res => this.setState({ toDoTasks: res.toDoTasks, completedTasks: res.completedTasks}))
    .catch(err => console.log(err));


  }

  getTasks = async () => {
    const response = await fetch('/get-tasks');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  postTasks = async (task) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: task})
  };
    const response = await fetch('/post-tasks', requestOptions);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  postTasksCompleted = async (task, arr) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ task: task, newToDoArray:arr})
  };
    const response = await fetch('/post-tasks-completed', requestOptions);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };






  // used as inline function
  onCreateTask = () =>{
    var arr = this.state.toDoTasks.concat(this.state.inputVal);
    this.setState({toDoTasks: arr})

    this.postTasks(this.state.inputVal)
    .then(res => console.log(res.json))
    .catch(err => console.log(err))



  };

  taskComplete(task){
    var arr = this.state.completedTasks.concat(task);
    this.setState({completedTasks: arr});

    var newToDoArray = this.state.toDoTasks;
    newToDoArray.splice(newToDoArray.indexOf(task),1);
    this.setState({toDoTasks:newToDoArray});

    this.postTasksCompleted(task, newToDoArray)
    .then(res => console.log(res.json))
    .catch(err => console.log(err))
  
  }

  renderCompletedItems(){
    return this.state.completedTasks.map(task =>{
      return <CompletedItem task={task}></CompletedItem>
    });

  }

  renderToDoItems(){
    return this.state.toDoTasks.map(task =>{
      return <ToDoItem task={task} onCompleteTask={this.taskComplete.bind(this)}></ToDoItem>
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
    

     
    <h2>Complete:</h2>

    <div>{this.renderCompletedItems()}</div>

    </div>
  );
  }
}

export default App;
