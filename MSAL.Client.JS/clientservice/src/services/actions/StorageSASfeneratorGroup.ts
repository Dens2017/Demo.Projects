import * as msal from "@azure/msal-browser";

export class StorageSASfeneratorGroup {

  public static run = async (): Promise<any> => {
    const msalInstance = new msal.PublicClientApplication(msalConfig);
    let currentAccounts = msalInstance.getAllAccounts();
    console.log('Accounts', currentAccounts);
    var loginRequest = {
      scopes: ["api://fe835d2b-bba1-42d1-9e60-7aaadadf6a57/user_impersonation"],
      forceRefresh: false,
      prompt: 'select_account',
    }
    await msalInstance.loginPopup(loginRequest);
    currentAccounts = msalInstance.getAllAccounts();
    let requestAccount: msal.SilentRequest;
    console.log("Active Account", currentAccounts);

    if (currentAccounts[0].idTokenClaims) {
      if (currentAccounts[0].idTokenClaims.roles) {
        if (currentAccounts[0].idTokenClaims.roles[0] !== "PH") return "no Access role"
      } else return "no App Role"
    } else return "no token claim";
    requestAccount = {
      account: currentAccounts[0],
      scopes: ["api://fe835d2b-bba1-42d1-9e60-7aaadadf6a57/user_impersonation"],
    };
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
    return await fetch("https://storagetokenservice.azurewebsites.net/api/StorageTokenGenerator?code=/eu6E7fhDxh0E54a8CtX7NlTp5aT6QcgS6pqiIbCNaSjV1DrqksS/w==&storagename=teststorage345&containername=testcontainer&permission=read", apiOptions).then(async (response) => {
      return await response.json().then((response) => {
        console.log("Storage Account API Response", response);
        return response;
      })
    }, (error) => {
      console.error("Error on running MS Graph API", error);
      return `Error on running MS Graph API ${JSON.stringify(error)}`
    })
  }
}

const msalConfig = {
  auth: {
    clientId: 'fe835d2b-bba1-42d1-9e60-7aaadadf6a57',
    authority: 'https://login.microsoftonline.com/9b1107fa-e2eb-47e9-8025-4474ed37c174',
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    secureCookies: false
  }
};