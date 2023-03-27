/* eslint-disable no-unused-vars */
// import axios from "axios";
import userPool from "../../config/userPool";
import { CognitoUserAttribute, CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import { INITIAL_LOGIN, LOGIN, LOGOUT, USER_LOADING } from "../types/auth";
import { getCounters } from "./table";
// var AWS = require("aws-sdk");
import jwt_decode from "jwt-decode";
import { toggleProfile } from "./styles";

const getSession = async (dispatch) =>
  await new Promise((resolve, reject) => {
    const user = userPool.getCurrentUser();
    if (user) {
      user.getSession(async (error, session) => {
        if (error) {
          reject();
        } else {
          const attributes = await new Promise((resolve, reject) => {
            user.getUserAttributes((error, attributes) => {
              if (error) {
                dispatch && dispatch(logout());
                reject(error);
              } else {
                const results = {};

                for (let attribute of attributes) {
                  const { Name, Value } = attribute;
                  results[Name] = Value;
                }
                resolve(results);
              }
            });
          });
          resolve({ user, ...session, ...attributes });
        }
      });
    } else {
      reject();
    }
  });

const authenticate = async (email, password, dispatch) =>
  await new Promise((resolve, reject) => {
    const user = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: async (data) => {
        const session = await getSession();
        dispatch({ type: LOGIN, payload: session });
        resolve(data);
      },
      onFailure: (error) => {
        dispatch(logout());
        reject(error);
      },
      newPasswordRequired: async (data) => {
        const session = await getSession();
        dispatch({ type: LOGIN, payload: session });
        resolve(data);
      },
    });
  });

export const signup = (email, password) => () => {
  let attributeList = [];

  var dataEmail = {
    Name: "email",
    Value: email,
  };

  var dataIsAdmin = {
    Name: "custom:isAdmin",
    Value: "no",
  };

  var attributeEmail = new CognitoUserAttribute(dataEmail);
  var attributeIsAdmin = new CognitoUserAttribute(dataIsAdmin);

  attributeList.push(attributeEmail);
  attributeList.push(attributeIsAdmin);

  // eslint-disable-next-line no-unused-vars
  userPool.signUp(email, password, attributeList, null, (err, result) => {
    if (err) {
      console.log(err);
    }

    // const returnData = { "result ": "success", data: result.user };
  });
};

export const login = (email, password, seterror) => (dispatch) => {
  dispatch({ type: USER_LOADING, payload: true });

  const user = new CognitoUser({
    Username: email,
    Pool: userPool,
  });

  const authDetails = new AuthenticationDetails({
    Username: email,
    Password: password,
  });

  user.authenticateUser(authDetails, {
    onSuccess: async () => {
      const session = await getSession();
      await dispatch(getCounters());
      dispatch({ type: LOGIN, payload: session });
    },
    onFailure: (error) => {
      console.log(error);
      seterror("Wrong Credentials.");
      dispatch(logout());
    },
    newPasswordRequired: async () => {
      const session = await getSession();

      dispatch({ type: LOGIN, payload: session });
    },
  });
};

export const getLoginStatus = (history) => async (dispatch) => {
  if (
    process.env.REACT_APP_NODE_ENV === "preprod" ||
    process.env.REACT_APP_NODE_ENV === "local" ||
    process.env.REACT_APP_NODE_ENV === "local"
  ) {
    try {
      const session = await getSession(dispatch);
      await dispatch(getCounters());
      dispatch({ type: INITIAL_LOGIN, payload: session });
    } catch (error) {
      console.log(error);
      dispatch(logout());
    }
  } else {
    let token;
    let authToken = localStorage.getItem("token");

    if (authToken === "null" || authToken === null) {
      token = history.location.hash;
      token = token.includes("#id_token=")
        ? token.replace("#id_token=", "")
        : token.includes("#access_token=")
        ? token.replace("#access_token=", "")
        : null;

      localStorage.setItem("token", token);
    } else {
      token = authToken;
    }

    if (token) {
      // console.log("tok", jwt_decode(token));
      await dispatch(getCounters());
      dispatch({ type: INITIAL_LOGIN, payload: jwt_decode(token) });
    } else {
      dispatch(logout());
    }
  }
};

export const logout = () => (dispatch) => {
  // window.open(
  //   "https://ppa-appware-portal-login-dev.auth.ap-southeast-2.amazoncognito.com/logout?client_id=2pvsmb0ceu3bs9lu13i41rc8no&response_type=token&redirect_uri=http://localhost:3000/",
  //   "_self"
  // );
  localStorage.removeItem("token");
  const user = userPool.getCurrentUser();
  if (user) {
    user.signOut();

    dispatch({ type: LOGOUT });
    dispatch(toggleProfile());
  } else {
    dispatch({ type: LOGOUT });
  }
};

export const changePassword = (password, newPassword) => () => {
  getSession()
    .then((session) => {
      const { user, email } = session;
      authenticate(email, password).then(() => {
        // eslint-disable-next-line no-unused-vars
        user.changePassword(password, newPassword, (error, result) => {
          // console.log(result);
        });
      });
    })
    .catch((error) => console.log(error));
};

export const changeemail = (newEmail, password) => () => {
  getSession()
    .then((session) => {
      const { user, email } = session;
      authenticate(email, password).then(() => {
        const attributes = [new CognitoUserAttribute({ Name: "email", Value: newEmail })];
        // eslint-disable-next-line no-unused-vars
        user.updateAttributes(attributes, (error, result) => {
          if (error) {
            console.log(error);
          } else {
            // console.log(result);
          }
        });
      });
    })
    .catch((error) => console.log(error));
};

// export const listAllUsers = () => () => {
//   const allUsers = () => {
//     var params = {
//       UserPoolId: "us-east-2_gGVizrshT",
//       AttributesToGet: ["email", "custom:isAdmin"],
//     };

//   return new Promise((resolve, reject) => {
//     AWS.config.update({ region: USER_POOL_REGION, accessKeyId: AWS_ACCESS_KEY_ID, secretAccessKey: AWS_SECRET_KEY });
//     var cognitoidentityserviceprovider = new AWS.CognitoIdentityServiceProvider();
//     cognitoidentityserviceprovider.listUsers(params, (err, data) => {
//       if (err) {
//         console.log(err);
//         reject(err);
//       } else {
//         console.log("data", data);
//         resolve(data);
//       }
//     });
//   });
// }
// }

export const userLoading = (isLoading) => (dispatch) => {
  dispatch({ type: USER_LOADING, payload: isLoading });
};
