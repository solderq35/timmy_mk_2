const nacl = require('tweetnacl');

exports.handler = async (event) => {
  // Checking signature (requirement 1.)
  // Your public key can be found on your application in the Developer Portal
  const PUBLIC_KEY = process.env.PUBLIC_KEY;
  const signature = event.headers['x-signature-ed25519']
  const timestamp = event.headers['x-signature-timestamp'];
  const strBody = event.body; // should be string, for successful sign

  const isVerified = nacl.sign.detached.verify(
    Buffer.from(timestamp + strBody),
    Buffer.from(signature, 'hex'),
    Buffer.from(PUBLIC_KEY, 'hex')
  );

  if (!isVerified) {
    return {
      statusCode: 401,
      body: JSON.stringify('invalid request signature'),
    };
  }


  // Replying to ping (requirement 2.)
  const body = JSON.parse(strBody)
  if (body.type == 1) {
    return {
      statusCode: 200,
      body: JSON.stringify({ "type": 1 }),
    }
  }

  // Handle /foo Command
  if (body.data.name == 'food') {
    return JSON.stringify({  // Note the absence of statusCode
      "type": 4,  // This type stands for answer with invocation shown
      "data": { "content": "bardd" }
    })
  }
  
  if (body.data.name == 'time') {
    console.log(body.data.options[0].value)
    return JSON.stringify({  // Note the absence of statusCode
      "type": 4,  // This type stands for answer with invocation shown
      "data": { "content": ((parseFloat(210000.) - (parseFloat(body.data.options[0].value))) * parseFloat(3/400.)).toFixed(2)}
      //(210,000 - N * (3 / 400)
    })
  }


  return {
    statusCode: 404  // If no handler implemented for Discord's request
  }
};