/* eslint no-console: "off" */

import path from 'path';
import { Server } from 'http';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import bodyParser from 'body-parser';
import { App } from './App';
import ApiSettings from './api/settings';
import ApiEmployees from './api/employees';
import ApiUser from './api/user';

const app = new Express();
const server = new Server(app);

// use ejs templates
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


// define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, 'static')));

app.use(bodyParser.json());

// app.use('/api/settings', (req, res) => {
//   const data = {
//     PCs: ['304248', '302254'],
//     Roles: ['Baker', 'Finisher', 'Crew', 'Maintenance'],
//   };
//   return res.status(200).json(data).end();
// });

app.use('/api/settings', ApiSettings);
app.use('/api/employees', ApiEmployees);
app.use('/api/user/', ApiUser);

app.use((req, res, next) => {
  console.log('using'.concat(req.url)); next();
});

// universal routing and rendering
app.get('*', (req, res) => {
  let markup = '';
  let status = 200;
  console.log('get: '.concat(req.url));
  if (process.env.UNIVERSAL) {
    const context = {};
    markup = renderToString(
      <Router location={req.url} context={context}>
        <App />
      </Router>,
    );

    // context.url will contain the URL to redirect to if a <Redirect> was used
    if (context.url) {
      return res.redirect(302, context.url);
    }

    if (context.is404) {
      status = 404;
    }
  }
  return res.status(status).render('index', { markup });
});


// start the server
const port = process.env.PORT || 3000;
const env = process.env.NODE_ENV || 'production';
server.listen(port, (err) => {
  if (err) {
    return console.error(err);
  }
  return console.info(
    `
      Server running on http://localhost:${port} [${env}]
      Universal rendering: ${process.env.UNIVERSAL ? 'enabled' : 'disabled'}
    `);
});
