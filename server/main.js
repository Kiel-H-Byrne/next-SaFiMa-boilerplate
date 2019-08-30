/* eslint-disable no-undef */
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const next = require('next');
const configServer = require('./config').configServer;
const stripe = require('stripe')('sk_test_CVjRHwXEveUCvquuDZmEVfe700xReF0msQ');
const slog = configServer.console.express;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const options = {
  root: __dirname + '/static/',
  headers: {
    'Content-Type': 'text/plain;charset=UTF-8'
  }
};

const jsonParser = bodyParser.json();
// const urlEncodedParser = bodyParser.urlencoded({ extended: false });
const postStripeCharge = res => (stripeErr, stripRes) => {
  if (stripeErr) {
    res.status(500).send({error:stripeErr});
  } else {
    res.status(200).send({success: stripeRes})
  }
}
// need to connect to sql database, spin up server to listen on a port just to handle sql queries, and also a separate server for client.
app.prepare().then(() => {
  const server = express();
  server.use(cors({ origin: '*', methods: 'GET,PUT,POST' }));
  if (slog) {
    server.use(function(req, res, next) {
      console.log(`[EXPRESS][${req.method}] ${req.path}`);
      next();
    });
  }

  server.get('/robots.txt', (req, res) =>
    res.status(200).sendFile('./robots.txt', options)
  );

  server.post('/charge', (req,res) => {
    console.log(req)
    stripe.charges.create(req.body, postStripeCharge(res))
  })
  // server.get('/checkout', async (req, res) => {
  //   console.log(req.query.total)
  //   try {
  //     const paymentIntent = await stripe.paymentIntents.create({
  //       amount: req.query.total * 100,
  //       currency: 'usd'
  //     });
  //     // res
  //     //   .json({ paymentIntent })
  //     // return handle(req, res);
  //     return app.render(req,res,"/checkout", {paymentIntent})
  //   } catch (err) {
  //     console.log(err);
  //   }
  // });

  server.get('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(configServer.port, err => {
    if (err) throw err;
    console.log(`> Ready on Port ${configServer.port}`);
  });
});


//client and server stripe flow
// Intents: 
// gather amount from client, create paymentintent



// Tokens:



// PaymentRequests:
