// express boiler plate
const express = require('express');
const app = express();
const body_parser= require('body-parser');
const port = 3000;


app.use(body_parser.urlencoded({extended: false}));
app.use(body_parser.json());



// app.get('/', (req, res) => {
//     res.send('Welcome to Contact Page!');
//     }
// );

// app.post('/create', (req, res) => {
//     let name = req.body.aa;
//     res.send( name );
// });


// app.get('/delete', (req, res) => {
//     res.send('delete');
// });

// app.post('/update', (req, res) => {
//     const obj = {"name": req.body.aa};
//     res.json(obj);
// });


// app.get('/read', (req, res) => {
//     const obj = {"name": "John"};
//     res.json(obj);
// }
// );

/* GET contacts listing. */
const contactinfo= require('./src/Contact');
app.get('/', function(req, res, next) {
    const data = contactinfo.findAll();
    res.send(data);
  });
  
  app.post('/add', function(req, res, next) {
      console.log(req.body);
      if (req.body.contactText.trim() === '') {
        res.send('contact text can not be empty!');
      } else {
        contactinfo.create({text: req.body.contactText.trim()});
        res.redirect('/');
      }
    });
  
  
  app.put('/:uuid/edit', function(req, res, next) {
      if (req.body.contactText.trim() === '') {
        res.send('contact text can not be empty!');
      } else {
        const updatedcontact = {id: req.params.uuid, text: req.body.contactText.trim()};
        contactinfo.update(updatedcontact);
        res.redirect('/');
      }
  });
  
  app.delete('/:uuid/delete', function(req, res, next) {
      contactinfo.deleteById(req.params.uuid);
      res.redirect('/');
  });






app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
    }
);