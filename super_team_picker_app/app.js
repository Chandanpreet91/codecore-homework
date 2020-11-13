const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const knex = require('./db/client');

const app = express();

app.set('view engine', 'ejs');

app.use(logger('dev'));

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(
  methodOverride((req, res) => {
    if (req.body && req.body._method) {
      const method = req.body._method;
      delete req.body._method;
      return method;
    }
  })
);

app.use((req, res, next) => {
  res.locals.username = req.cookies.username || '';
  next();
});

// The most important lesson:
// 1. User sends a REQUEST
// 2. Server receives the request at a specified ROUTE/address
// 3. Each Address is configured to do something with the request
// 4. and send a RESPONSE

// Root: redirect to index
app.get('/', (req, res) => {
  res.redirect('/cohorts');
});

// Create: new cohort
// GET - show the page
app.get('/cohorts/new', (req, res) => {
  res.render('new');
});
// POST - request a new cohort to be created
app.post('/cohorts/new', (req, res) => {
  // res.send('POSTED SOMETHING: ' + JSON.stringify(req.body, null, 2))
  // create new cohort in the db
  const cohort = {
    logo_url: req.body.logo_url,
    name: req.body.name,
    members: req.body.members,
  };
  knex('cohorts')
    .insert(cohort, '*')
    .then(() => {
      // redirect to the index page
      res.redirect('/cohorts'); // TODO: redirect to SHOW page
    });
});

// Show: single cohort
// GET - show the page
app.get('/cohorts/:id', (req, res) => {
  // const { id } = req.params; // destructuring - a cleaner way to declare variables
  knex('cohorts')
    .where('id', req.params.id)
    .first()
    .then((data) => {
      res.render('show', { cohort: data });
    });
});

app.get('/cohorts/:id/edit', (req, res) => {
  knex('cohorts')
    .where('id', req.params.id)
    .first()
    .then((data) => {
      res.render('edit', { cohort: data });
    });
});

// PATCH - edit the cohort
app.patch('/cohorts/:id', (req, res) => {
  const cohort = {
    logo_url: req.body.logo_url,
    name: req.body.name,
    members: req.body.members,
  };
  const id = req.params.id

  knex('cohorts')
    .where('id', id)
    .update(cohort)
    .then(() => {
      res.redirect(`/cohorts/${id}`);
    });
});

// DELETE - delete the cohort
app.delete('/cohorts/:id', (req, res) => {
  knex('cohorts')
    .where('id', req.params.id)
    .del()
    .then(() => {
      res.redirect('/cohorts');
    });
});

// Index: show all cohorts
app.get('/cohorts', (req, res) => {
  // send: response with exactly what you specify
  // res.send('INDEX COHORT')
  // render: takes a template script, passes in parameters, and sends the output

  // pull cohorts from db
  knex
    .select()
    .table('cohorts')
    .then((whateverYouWant) => {
      // res.render("index", { quacks: quacks })

      res.render('index', {
        cohorts: whateverYouWant,
      });
    });

  // res.render('index', {cohorts: [
  //   {name: 'hi', logo_url: 'test', members: 'bob, jerry'}
  // ]})
});

const PORT = process.env.PORT || 3000;
const ADDRESS = 'localhost';
const ENVIRONMENT = app.get('env');

app.listen(PORT, ADDRESS, () => {
  console.log(
    `Server is listenning on http://${ADDRESS}:${PORT} in ${ENVIRONMENT}.`
  );
});