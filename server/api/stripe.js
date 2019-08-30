
const stripe = require('stripe')('pk_live_CWuBPPtZd0UQOJWDQes2n1O4009SUOzjXa');

export const createCharge = (req) => {

const chargeOptions = { 
  method: 'GET',
  url: 'https://pdubdb-705a.restdb.io/rest/workstations?metafields=true&max=3000&sort=_changed',
  headers: 
   { 
    'cache-control': 'no-cache',
    'x-apikey': '5c9a8400df5d634f46ecaf52',
   } 
 };
 try {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 1099,
        currency: 'usd',
    });
    console.log(paymentIntent)
    res.render('payment', {client_secret: paymentIntent.client_secret})
    
    return handle(req, res);
} catch (err) {
    console.log(err)
}

}

// https://stripe.com/docs/api/payment_intents/create
export const createIntent = async (req) => {
    try {
    console.log(req.body)
    let amount = req.body.appointmentTotal
    const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100,
        currency: 'usd',
        payment_method_types: ['card'],
        confirm: true
      });
    console.log(paymentIntent)
    return paymentIntent
    } catch(err) {
        console.log(err)
    }
}

//https://stripe.com/docs/api/payment_intents/update
export const updateIntent = (intent_id) => {
    stripe.paymentIntents.update(intent_id, {

    })
}
export const createChargeIntent = () => {}