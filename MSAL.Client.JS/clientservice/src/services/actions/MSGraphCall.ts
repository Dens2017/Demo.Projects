import * as msal from "@azure/msal-browser";

export class MSGraphCall {

  public static run = async (): Promise<any> => {
    const msalInstance = new msal.PublicClientApplication(msalConfig);
    let currentAccounts = msalInstance.getAllAccounts();
    var loginRequest = {
      scopes: ["https://graph.microsoft.com/User.Read"],
      forceRefresh: false,
      prompt: 'select_account',
    }
    await msalInstance.loginPopup(loginRequest);
    currentAccounts = msalInstance.getAllAccounts();
    let requestAccount: msal.SilentRequest;
    console.log("Active Account", currentAccounts);
    if (currentAccounts[0].idTokenClaims) {
      if (currentAccounts[0].idTokenClaims.aud) {
        requestAccount = {
          account: currentAccounts[0],
          //extraQueryParameters: { aud: currentAccounts[0].idTokenClaims.aud },
          scopes: ["https://graph.microsoft.com/User.Read"]
        };
      } else return "np audience claim"
    } else return "no token claim";
    const accessTokenObject = await msalInstance.acquireTokenSilent(requestAccount);
    console.log("Access Token", accessTokenObject);
    const accessToken = accessTokenObject.accessToken;
    const bearer = `Bearer ${accessToken}`;
    const apiOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": bearer
      },
    }
    return await fetch("https://graph.microsoft.com/v1.0/me/", apiOptions).then(async (response) => {
      return await response.json().then((response) => {
        console.log("MS Graph API Response", response);
        return JSON.stringify(response);
      })
    }, (error) => {
      console.error("Error on running MS Graph API", error);
      return `Error on running MS Graph API ${JSON.stringify(error)}`
    })
  }
}

const msalConfig = {
  auth: {
    clientId: '5fa9e0e0-98b7-4f0e-b4d0-2b19319b3150',
    authority: 'https://login.microsoftonline.com/9b1107fa-e2eb-47e9-8025-4474ed37c174',
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    secureCookies: false
  }
};