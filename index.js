const express = require('express'); 

const app = express(); 
const courses = [
    {id: 1, name: 'cpsc210'},
    {id: 2, name: 'cpsc211'},
    {id: 3, name: 'cpsc212'},
]
app.get('/', (req, res) => {
    res.send('Hello Worldsd'); 
});
app.get('/api/courses', (req,res) => {
    res.send(courses); 
})
app.get('/api/courses/:id', (req,res)=> {
    const course = courses.find(c => c.id === parseInt(req.params.id)); 
    if(!course) res.status(404).send('The course with the given id not found'); 
    res.send(course); 
})
//PORT 
const port = process.env.PORT || 3000; 
app.listen(port, () => console.log(`Listening on port ${port}...`)); 