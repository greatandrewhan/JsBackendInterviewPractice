Back End Development Interview Practice

Introduction
BUILD REST API - SCIENCES AND SCIENTISTS

Database schema
The database consist of two tables: sciences and scientists. An example of some of the data you may find in the sciences table is:

SCIENCES

id   name                description
1 Chemistry  The study of properties and behaviours of substances
2 Biology    The study of life
3 Archeology The study of human material remains


And an example of the data you may find in the scientists table is:

SCIENTISTS:

id first_name last_name born died science (FK)
1 Dorothy        Bate   1878 1951  3
2 Alice          Ball   1892 1916  1
3 Michiyo      Tsujimura 1888 1969 1

Existing files
file path description
server.js The main file. This file starts the server, connects to the database and links all other router files. You do not need to edit this file.

sciences/sciences.router.js Handles the routing of the /sciences endpoints. In this file you will find all the endpoint functions that have been written along with some middleware functions. You will review this code and determine how it can be refactored to make use of a controller.

test/candidate.test.js The tests that your code will run against. You do not need to edit this file.

End points

GET /sciences
Return a list of all sciences in the database.

Example Response

[{
id: 1,
name: "Chemistry",
description: "The study of properties and behaviours of substances"
}, {
id: 2,
name: "Biology",
description: "The study of life"
},
{
id: 3,
name: "Archeology",
description: "The study of human material remains"
}]


PATCH /sciences/:scienceId
Update the name of a science to the database.

Parameters
Accept a JSON object in the body of the request in the following format:

{
"name": "The updated name of the science (string)"  
}

Response
Respond with the full updated object:

{
id: 1,
name: "Bio Chemistry",
description: "The study of life"
}

Errors
If the name property is missing, respond with status 400 and the body:
{
error: "A 'name' property is required"
}

GET /science/:scienceId/scientists
Return a list of scientists for the science with the given scienceId.

Example Response for GET /science/1/scientists
[{
first_name:"Alice",
last_name:"Ball",
born: 1892,
died: 1916,
science: 1
},
{
first_name:"Michoyo",
last_name:"Tsujimura",
born: 1888,
died: 1969,
science: 1
}]

Task
Initially all the tests will fail. You will notice that the controller code is written in the file named sciences/science.router.js.

Create a new file named sciences/sciences.controller.js. Refactor the router by moving the controller code into this new file.
