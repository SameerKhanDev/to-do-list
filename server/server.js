const express = require('express'); //Line 1
const app = express(); //Line 2
const port = process.env.PORT || 5000; //Line 3
var bodyParser = require('body-parser')
var counter = 0;
const path = require('path');

const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));

var jsonParser = bodyParser.json()
// This displays message that the server running and listening to specified port
app.listen(port, () => console.log(`Listening on port ${port}`)); //Line 6

// create a GET route
app.get('/express_backend', (req, res) => { //Line 9
  counter++;
  res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT ' + counter}); //Line 10
}); //Line 11

app.post('/express_backend_post', jsonParser, (req, res) => { //Line 9
  console.log(req.body.text);
}); 
