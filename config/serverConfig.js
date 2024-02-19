const express = require('express');
const morgan = require('morgan');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const ssr = require('../middleware/ssr');
const { getUser, resLocals } = require('../middleware/auth');

const sessionConfig = {
  store: new FileStore(),
  name: 'leopards_cookies',
  secret: process.env.SESSION_SECRET ?? 'secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 12,
    httpOnly: true,
  },
};

const serverConfig = (app) => {
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static('public'));
  app.use(ssr);
  app.use(session(sessionConfig));
  app.use(getUser);
  app.use(resLocals);
};

module.exports = serverConfig;
