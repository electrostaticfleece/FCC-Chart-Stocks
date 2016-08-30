import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import flash from 'express-flash';
import methodOverride from 'method-override';

export default (app) => {
  // X-Powered-By header has no functional value.
  // Keeping it makes it easier for an attacker to build the site's profile
  // It can be removed safely
  app.disable('x-powered-by');
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
  app.use(methodOverride());
  app.use(express.static(path.join(__dirname, '../..', 'public')));
  app.set('trust proxy', 'loopback');
  app.use(flash());
}