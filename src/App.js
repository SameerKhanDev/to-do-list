import './App.css';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form,Button} from "react-bootstrap";
import ToDoItem from './components/ToDoItem';
import CompletedItem from './components/CompletedItem';
class App extends React.Component {
  state = {

    data:null,

    inputVal: "",

    toDoTasks: [],

   
    completedTasks: []

  };

  componentDidMount(){

    //pull toDoTasks and completedTasks from backend
    this.callBackendAPI()
    .then(res => this.setState({ data: res.express }))
    .catch(err => console.log(err));

  }

  callBackendAPI = async () => {
    const response = await fetch('/express_backend');
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };

  callBackendAPIPost = async (task) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: task})
  };
    const response = await fetch('/express_backend_post', requestOptions);
    const body = await response.json();

    if (response.status !== 200) {
      throw Error(body.message) 
    }
    return body;
  };






  // used as inline function
  onCreateTask = () =>{
    var arr = this.state.toDoTasks.concat(this.state.inputVal);
    this.setState({toDoTasks: arr});

    this.callBackendAPIPost(this.state.inputVal)
    .then(res => console.log(res.json))
    .catch(err => console.log(err));



  };

  taskComplete(task){
    var arr = this.state.completedTasks.concat(task);
    this.setState({completedTasks: arr});

    var arr2 = this.state.toDoTasks;
    arr2.splice(arr2.indexOf(task),1);
    this.setState({toDoTasks:arr2});
  
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
    <div>{this.state.data}</div>

    </div>
  );
  }
}

export default App;
