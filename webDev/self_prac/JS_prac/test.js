const express = require('express');

const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Routes
app.get('/getval/:a/:b', (req, res) => {
    
    console.log(req.params);
    res.send('Hello World!');
});

app.get('/queryparam', (req, res) => {

  console.log(req.query.a);
  res.send("gunnait world");
})

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

