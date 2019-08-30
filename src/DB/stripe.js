const stripe = require('stripe')('sk_test_CVjRHwXEveUCvquuDZmEVfe700xReF0msQ')
// const createCharge = async (email,amount, description, token) => {
  
//   description = `CCBD Consultation: ${description}`;
//   // console.log(token);

//   await stripe.charges.create({
//       amount: amount*100,
//       currency: 'usd',
//       description: description,
//       source: token.id,
//       // customer: customer.id,
//       receipt_email: email,
//       capture: false
//     // }, (err,charge) => {
//     //   if (err) {
//     //     console.log("err",err.message)
//     //     let error = err.message;
//     //     return false
//     //     throw new Meteor.Error(err.)
//     //   } else {
//     //     console.log('Payment Received: ' + description)
//     //     return charge;
//     //   }
//     // })
//     }).then(
//     result => {
//       console.log("SUCCESS")
//       return result
//     }).catch(
//     err => {
//       // console.log(err.code + ' - ' + err.message)
//       console.log("FAILED: ", err.message)
//       throw new Error(err.code, err.message)
//     });
// };

const createIntent = async (total) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total * 100,
      currency: 'usd'
    });
    return {paymentIntent}
  } catch (err) {
    console.log(err);
  }
}
  // export const createCustomer = async (email, token) => {
  //   const stripe = require("stripe")(Meteor.settings.private.keys.stripe.key);
  //   //SEARCH FOR CUSTOMER, 
  //   //IF NOT EXIST, CREATE AND RETURN ID
  //   //IF EXIST RETURN ID
    
  //   const consumer = await stripe.customers.list({email: email}, async function(error, customers) {
  //     if (error) {console.log("error", error)}
  //     if (customers) {
  //       return customers.data[0];
  //     } else { 
  //       const consumer = await stripe.customers.create({
  //         source: token.id,
  //         email: email
  //       }, (error, customer) => {
  //         if (error) console.log(error)
  //         console.log(customer)
  //         return customer;
  //       })
  //     }
  //   });
  // };
  // export const chargeCustomer = async (customer, amount, description, email) => {
  //   await stripe.charges.create({
  //       amount: amount*100,
  //       currency: 'usd',
  //       description: description,
  //       // source: token.id,
  //       customer: customer.id,
  //       receipt_email: customer.email,
  //       capture: false
  //     }).then(
  //     result => {
  //       console.log("SUCCESS")
  //       return result
  //     }).catch(
  //     err => {
  //       // console.log(err.code + ' - ' + err.message)
  //       console.log("FAILED: ", err.message)
  //       throw new Meteor.Error(err.code, err.message)
  //     });
  // };
