function sendResponse(data) {
  const response = new Twilio.Response();
  response.appendHeader("Access-Control-Allow-Origin", "*");
  response.appendHeader("Access-Control-Allow-Methods", "POST,OPTIONS,GET,PUT");
  response.appendHeader("Content-Type", "application/json");
  response.setBody(data);
  return response;
}

exports.handler = function(context, event, callback) {
// Download the helper library from https://www.twilio.com/docs/node/install
// Your Account Sid and Auth Token from twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = context.ACCOUNT_SID;
const authToken = context.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);


client.flexApi.channel
              .create({
                 identity: event.identity,
                 chatUserFriendlyName: event.identity,
                 chatFriendlyName: `Chat with ${event.identity}`,
                 flexFlowSid: context.TWILIO_FLEX_FLOW_SID
               })
              .then(channel => callback(null, sendResponse({channel: channel})));

};