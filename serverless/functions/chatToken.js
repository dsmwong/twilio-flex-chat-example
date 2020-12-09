function sendResponse(data) {
  const response = new Twilio.Response();
  response.appendHeader("Access-Control-Allow-Origin", "*");
  response.appendHeader("Access-Control-Allow-Methods", "POST,OPTIONS,GET,PUT");
  response.appendHeader("Content-Type", "application/json");
  response.setBody(data);
  return response;
}
exports.handler = function(context, event, callback) {
const AccessToken = require('twilio').jwt.AccessToken;
const ChatGrant = AccessToken.ChatGrant;

// Used when generating any kind of tokens
const twilioAccountSid = context.ACCOUNT_SID;
const twilioApiKey = context.TWILIO_API_KEY_SID;
const twilioApiSecret = context.TWILIO_API_KEY_SECRET;

// Used specifically for creating Chat tokens
const serviceSid = context.TWILIO_CHAT_SERVICE_SID;
const identity = event.identity;

// Create a "grant" which enables a client to use Chat as a given user,
// on a given device
const chatGrant = new ChatGrant({
  serviceSid: serviceSid,
});

// Create an access token which we will sign and return to the client,
// containing the grant we just created
const token = new AccessToken(
  twilioAccountSid,
  twilioApiKey,
  twilioApiSecret,
  {identity: identity}
);

token.addGrant(chatGrant);


// Serialize the token to a JWT string
  return callback(null, sendResponse({
      token: token.toJwt()
  }));
};