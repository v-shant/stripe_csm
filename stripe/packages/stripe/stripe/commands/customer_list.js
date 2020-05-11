
const { mui } = require('./utils');
async function customer_list(client, stripeSK) {
  const stripe = require("stripe")(stripeSK);
  const customerList = await stripe.customers.list({ limit: 50 });
  if (customerList && customerList.data.length > 0) {
    const blocks = [];
    await customerList.data.map(customer => {
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
    });
    return {
      blocks
    };
  } else {
    return {
      "attachments":[{
        "color": "good",
          "fields": [],
          "text": "_no customer found_",
      }]
    };
  }
}
module.exports.customer_list = customer_list;
