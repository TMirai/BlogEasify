import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Amplify } from "aws-amplify";


const region = "ap-northeast-1";
const userPoolId = "ap-northeast-1_stz2rOwbI";
const clientId = "6vv602fp5rgthue96flath4o57";
const domain = "blogeasify-midway.auth.ap-northeast-1.amazoncognito.com";
const signInUrl = "http://localhost:3000";
const signOutUrl = "http://localhost:3000";

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
