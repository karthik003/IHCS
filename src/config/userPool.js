import { CognitoUserPool } from "amazon-cognito-identity-js";

console.log('process.env',process.env)
const poolData = {
  UserPoolId: process.env.REACT_APP_USER_POOL_ID,
  ClientId: process.env.REACT_APP_CLIENT_ID,
};

export default new CognitoUserPool(poolData);
