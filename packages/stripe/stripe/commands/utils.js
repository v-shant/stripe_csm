export const mui = (element, client) => {
  if (client === 'mattermost') {
    const output = [];
    switch (element.type) {
      case 'context': {
        for (const item of element.elements) {
          output.push(item.text.replace(/\*/g, '**'));
        }
        break;
      }
      case 'section': {
        if (element.fields && element.fields.length > 0) {
          for (const field of element.fields) {
            output.push(field.text.replace(/\*/g, '**') + '\n');
          }
        } else if (element.text) {
          output.push('#### ' + element.text.text.replace(/\*/g, '**'));
        }
        break;
      }
      case 'mrkdwn': {
        output.push('#### ' + element.text.replace(/\*/g, '**'));
        break;
      }
      case 'image': {
        output.push(`![${element.alt_text}](${element.image_url})`);
        break;
      }
      case 'divider': {
        output.push('***');
        break;
      }
    }
    return output.join(' ');
  }
  return element;
};