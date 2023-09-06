import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Amplify } from "aws-amplify";


const region = "us-east-1";
const userPoolId = "us-east-1_2kudVytpo";
const clientId = "7l48al6pkcuafa4tjrhmpnm37a";
const domain = "blogeasify-midway.auth.us-east-1.amazoncognito.com";
const signInUrl = "https://main.d2tb1qkxq86h6t.amplifyapp.com";
const signOutUrl = "https://main.d2tb1qkxq86h6t.amplifyapp.com";

const awsExports = {
  Auth: {
    region: region,
    userPoolId: userPoolId,
    userPoolWebClientId: clientId,
    oauth: {
      domain: domain,
      scope: ["email", "openid", "aws.cognito.signin.user.admin"],
      redirectSignIn: signInUrl,
      redirectSignOut: signOutUrl,
      responseType: "code",
    },
  },
};
Amplify.configure(awsExports);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);




// const root = ReactDOM.createRoot(
//   document.getElementById('root') as HTMLElement
// );
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
