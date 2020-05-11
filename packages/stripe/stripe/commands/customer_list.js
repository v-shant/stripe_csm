
const { mui } = require('./utils');
async function customer_list(clinet, stripeSK) {
  const stripe = require("stripe")(stripeSK);
  const customerList = await stripe.customers.list({ limit: 50 });
  if (customerList && customerList.length > 0) {
    const blocks = [];
    await customerList.data.map(customer => {
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
    });
    return blocks;
  } else {
    return {
      attachments: [{
        "type": "context",
        "elements": [{
          "type": "mrkdwn",
          "text": `_no customer found_`
        }]
      }]
    };
  }
}
module.exports.customer_list = customer_list;
