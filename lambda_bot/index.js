const nacl = require("tweetnacl");

exports.handler = async (event) => {
  // Checking signature (requirement 1.)
  // Your public key can be found on your application in the Developer Portal
  const PUBLIC_KEY = process.env.PUBLIC_KEY;
  const signature = event.headers["x-signature-ed25519"];
  const timestamp = event.headers["x-signature-timestamp"];
  const strBody = event.body; // should be string, for successful sign

  const isVerified = nacl.sign.detached.verify(
    Buffer.from(timestamp + strBody),
    Buffer.from(signature, "hex"),
    Buffer.from(PUBLIC_KEY, "hex")
  );

  if (!isVerified) {
    return {
      statusCode: 401,
      body: JSON.stringify("invalid request signature"),
    };
  }

  // Replying to ping (requirement 2.)
  const body = JSON.parse(strBody);
  if (body.type == 1) {
    return {
      statusCode: 200,
      body: JSON.stringify({ type: 1 }),
    };
  }

  if (body.data.name == "time") {
    const result_array = [];
    const score = body.data.options[0].value;

    // for all 20 possible M values
    for (let i = 1; i <= 20; i++) {
      // base M value multiplier (bonuses and penalties from rating screen)
      var base_M = 5000 * i;

      // base result value (given in seconds:milliseconds. No rounding either.)
      var base_result =
        (parseFloat(210000) - parseFloat((score * 100000) / base_M)) *
        parseFloat(3 / 400);

      // only calculate if the base result value is within bounds of 0 - 5 minutes
      if (base_result > 0 && base_result < 300) {
        var minutes = Math.floor(base_result / 60);
        var seconds = base_result - minutes * 60;

        // milliseconds we multiply by 1000 and then take remainder after dividing by 1000, to eliminate
        // float division rounding errors
        var milliseconds = Math.floor((seconds * 1000) % 1000);

        // put the minutes / seconds / milliseconds together formatted
        var formatted_result;
        var formatted_seconds;
        var formatted_milliseconds;

        // add one leading zero to seconds digit if there are less than 10 seconds
        if (seconds < 10) {
          formatted_seconds = ":0" + Math.floor(seconds);
        } else {
          formatted_seconds = ":" + Math.floor(seconds);
        }

        // add two leading zeros to milliseconds digit if there are less than 10 milliseconds
        if (milliseconds < 10) {
          formatted_milliseconds = ".00" + (milliseconds % 1000);
        }

        // add one leading zero to milliseconds digit if there are 10 to 99 milliseconds
        else if (milliseconds >= 10 && milliseconds < 100) {
          formatted_milliseconds = ".0" + (milliseconds % 1000);
        } else {
          formatted_milliseconds = "." + (milliseconds % 1000);
        }

        formatted_result = minutes + formatted_seconds + formatted_milliseconds;
        result_array.push(formatted_result);
      }
    }
    if (result_array.length > 0) {
      var copymsg = "/time score " + score;
      result_array.unshift(copymsg);
    }

    // if no numbers were returned in range (0 to 5 minutes), it's a bad input
    else {
      var copymsg = "Input a proper score fucker";
      result_array.unshift(copymsg);
    }

    var msg = result_array.join("\n");

    // regex for input validation (only numberic input accepted)
    let num_hyphen_check = /^[0-9]*$/;
    if (
      num_hyphen_check.test(score) == false ||
      score > 210000 ||
      score < 5000 ||
      result_array.length > 0
    ) {
      msg = "Input a proper score fucker";
    }

    //console.log(body.data.options)
    return JSON.stringify({
      // Note the absence of statusCode
      type: 4, // This type stands for answer with invocation shown
      data: { content: msg },
    });
  }

  return {
    statusCode: 404, // If no handler implemented for Discord's request
  };
};
