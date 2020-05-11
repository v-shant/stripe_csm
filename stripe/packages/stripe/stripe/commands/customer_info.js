
const { mui } = require('./utils');
async function customer_info(client, stripeSK, args) {  
  const customerID = args && args.split(" ")[0];
  if (!customerID) {
    return {
      attachments: [
        {
          color: 'danger',
          text: `_customer id required_`
        }
      ]
    };
  }
  const stripe = require("stripe")(stripeSK);
  const customer = await stripe.customers.retrieve(customerID);
  if (customer) {
    const blocks = [];
    const fields = [];
    fields.push({
      "type": "mrkdwn",
      "text": `*Customer:* ${customer.id}`
    });
    customer.name && fields.push({
      "type": "mrkdwn",
      "text": `*Name:* ${customer.name}`
    });
    customer.subscriptions && fields.push({
      "type": "mrkdwn",
      "text": `*Subscription:* ${customer.subscriptions.data && customer.subscriptions.data.length > 0 ? 'Active' : 'Inactive'}`
    });
    fields.push({
      "type": "mrkdwn",
      "text": `*Balance:* ${customer.balance}`
    });
    blocks.push(mui({
      type: 'section',
      fields
    }, client));
    return {
      blocks
    };
  } else {
    return [{
      "type": "context",
      "elements": [{
        "type": "mrkdwn",
        "text": `_customer not found_`
      }]
    }];
  }
}
module.exports.customer_info = customer_info;
