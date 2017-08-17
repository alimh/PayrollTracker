/* eslint no-console: "off" */

import path from 'path';
import { Server } from 'http';
import Express from 'express';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter as Router } from 'react-router-dom';
import { App } from './components/App';


const app = new Express();
const server = new Server(app);

// use ejs templates
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));

const renderPage = markup =>
  `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Judo Heroes - A Universal JavaScript demo application with React</title>
        <link rel="stylesheet" href="/css/style.css">
      </head>
      <body>
        <div id="main">
          <h1>From the server</h1>
          ${markup}
        </div>
        <script src="/js/bundle.js"></script>
      </body>
    </html>
  `
;

// define the folder that will be used for static assets
app.use(Express.static(path.join(__dirname, 'static')));

// universal routing and rendering
app.get('*', (req, res) => {
  let markup = '';
  let status = 200;

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

  return res.status(status).send(renderPage(markup));
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
