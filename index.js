const express = require('express'); 
const Joi = require('joi'); 

const app = express(); 
// Adding middleware. express.json() returns a middleware and we want to use it. 
app.use(express.json()); 
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
    if(!course) return res.status(404).send('The course with the given id not found'); 
    res.send(course); 
})
app.post('/api/courses', (req,res) => {
    const {error} = validateCourse(req.body); 
    if (error)
        // 400 bad request 
        return res.status(400).send(error.details[0].message); 
        
    
    const course = {
        id: courses.length + 1, 
        name: req.body.name 
    }
    courses.push(course); 
    res.send(course); 
})

app.put('/api/courses/:id', (req,res ) => {
    // Look up the course
    // If not existing return 404 
    const course = courses.find(c => c.id === parseInt(req.params.id)); 
    if(!course) return res.status(404).send('The course with the given id not found'); 


    // Validate the course 
    // If invalid - return 400 - Bad request 
    
   const {error} =  validateCourse(req.body); 
   if (error)
    // 400 bad request 
    return res.status(400).send(error.details[0].message); 
    
    
    //Update the course

    course.name = req.body.name; 

    res.send(course); 

})

app.delete('/api/courses/:id', (req,res) => {
    //Look up the course 
    // Not existing return 404 
    const course = courses.find(c => c.id === parseInt(req.params.id)); 
    if (!course) return res.status(404).send('The course with the given id is not found'); 
    //Delete
    const index = courses.indexOf(course); 
    courses.splice(index, 1);

    // return same course 
    res.send(course); 
})

const validateCourse = (course) => {
    const schema = {
        name: Joi.string().min(3).required()
    };
  return Joi.validate(course, schema); 
}
//PORT 
const port = process.env.PORT || 3000; 
app.listen(port, () => console.log(`Listening on port ${port}...`)); 