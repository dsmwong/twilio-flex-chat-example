This is a Fork of PNash's great blog post and repo of setting up a chat client in react:
You can mostly follow his instructions below however you will need to add the functions from the serverless/functions folder of this repo to your own environment. This is because this fork does NOT use a local server to generate the tokens.

You'll need to update the URL on line 21 of App.js to be the public URL where you are hosting the createFlexChannel function
You'll need to update the URL on line 29 of ChatApp.js to be the public URL where you are hosting the chatToken function.

If you are using functions clasic you'll need to configure the environment variables required by each funciton. If you are using the serverless API to publish the functions you'll need to rename the file .env.example to .env and populate the variables before you attempt to publish the functions to the serverless API.

Other than those things, you can just clone this repo and npm install and npm start it
This is not intended to be used in production it's an example of creating a flex chat channel so that you can use the twilio prog chat javascript SDK in a react app.

-------------Below are the intructions from the base project I modified--------------


This is an example application that sets up [Twilio Programmable Chat](https://www.twilio.com/docs/chat) with a React and [KendoReact UI](https://www.telerik.com/kendo-react-ui/).

Learn more with the blog post [Build a chat app with Twilio and KendoReact](https://www.twilio.com/blog/chat-app-twilio-kendoreact).

## Using this project

Clone the project, change into the directory and install the dependencies.

```bash
git clone https://github.com/philnash/twilio-chat-kendo-react.git
cd twilio-chat-kendo-react
npm install
```

Copy the `.env.example` file to `.env` and fill in with your Twilio credentials.


Run the application together with the command:

```bash
npm run dev
```

The React application will run on port 3000 and the server port 3001. Open [localhost:3000](http://localhost:3000) to log in and use the chat application.
