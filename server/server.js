const express = require('express'); //Line 1
const app = express(); //Line 2
const port = process.env.PORT || 5000; //Line 3
var bodyParser = require('body-parser')
var counter = 0;
var toDoTasks = []
var completedTasks = []
const path = require('path');

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));

var jsonParser = bodyParser.json()
// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

// create a GET route
app.get('/get-tasks', (req, res) => { //Line 9
  res.send({ toDoTasks: toDoTasks,completedTasks:completedTasks}); //Line 10

}); //Line 11

app.post('/post-tasks', jsonParser, (req, res) => { //Line 9
  var arr = toDoTasks.concat(req.body.task);
  toDoTasks = arr;

  
}); 

app.post('/post-tasks-completed', jsonParser, (req, res) => { //Line 9
  var arr = completedTasks.concat(req.body.task);
  completedTasks = arr;
  toDoTasks = req.body.newToDoArray;

  

  
});  