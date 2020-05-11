
const { mui } = require('./utils');
async function customer_list(clinet, stripeSK, args) {
  if (!(args && typeof args === 'object' && args[0])) {
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
  const customer = await stripe.customers.retrieve(args[0]);
  if (customer) {
    const blocks = [];
    blocks.push(mui({
      "type": "section",
      "text": {
        "type": "mrkdwn",
        "text": `*Customer:* \`${customer.id}\``
      }
    }, clinet));
    const fields = [];
    customer.name && fields.push({
      "type": "mrkdwn",
      "text": `*Name:*\n${customer.name}`
    });
    customer.subscriptions && fields.push({
      "type": "mrkdwn",
      "text": `*Subscription:*\n${customer.subscriptions.data && customer.subscriptions.data.length > 0 ? 'Active' : 'Inactive'}`
    });
    fields.push({
      "type": "mrkdwn",
      "text": `*Balance:*\n${customer.balance}`
    });
    blocks.push(mui({
      type: 'section',
      fields
    }, client));
    return blocks;
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
module.exports.customer_list = customer_list;
