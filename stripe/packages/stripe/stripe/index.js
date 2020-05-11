// jshint esversion: 9

async function _command(params, commandText, secrets = {}) {
  const {stripeSK} = secrets;
  if (!stripeSK) {
    return {
      response_type: 'ephemeral',
      text: 'You need `stripeSK` secrets to use this command. Create one by running `/nc secret_create`.'
    };
  }
  const commands = {
    'customer_list': require('./commands/customer_list').customer_list,    
    'customer_info': require('./commands/customer_info').customer_info
  };
  const {
    name,
    varArgs
  } = params;
  if(commands[name]) {
    try {
      const client = params.__client.name;
      const resp = await commands[name](client, stripeSK, varArgs);
      const returnData = Object.assign({}, {response_type: 'ephemeral', text: ''}, resp);
      return returnData;
    } catch(e) {
      return {
        response_type: 'ephemeral',
        text: '',
        attachments: [
          {
            color: 'danger',
            text: `Error: \`${e.message}\``
          }
        ]
      };
    }
  } else {
    return {
      response_type: 'ephemeral',
      text: '',
      attachments: [
        {
          color: 'danger',
          text: `Invalid Command \`${name}\``
        }
      ]
    };
  }
}

const main = async (args) => ({
  body: await _command(args.params, args.commandText, args.__secrets || {}).catch(error => ({
    response_type: 'ephemeral',
    text: `Error: ${error.message}`
  }))
});
module.exports.main = main;