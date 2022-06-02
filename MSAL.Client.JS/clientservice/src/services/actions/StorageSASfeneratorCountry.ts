import * as msal from "@azure/msal-browser";

export class StorageSASfeneratorCountry {

  public static run = async (): Promise<any> => {
    const msalInstance = new msal.PublicClientApplication(msalConfig);
    let currentAccounts = msalInstance.getAllAccounts();
    console.log('Accounts', currentAccounts);
    var loginRequest = {
      scopes: [process.env.REACT_APP_SASGENERATOR_SCOPE || ""],
      forceRefresh: false,
      prompt: 'select_account',
    }
    await msalInstance.loginPopup(loginRequest);
    currentAccounts = msalInstance.getAllAccounts();
    let requestAccount: msal.SilentRequest;
    console.log("Active Account", currentAccounts);

    if (currentAccounts[0].idTokenClaims) {
      if (currentAccounts[0].idTokenClaims.ctry) {
        if (currentAccounts[0].idTokenClaims.ctry !== "PH") return "none Philippine Location"
      } else return "no Country claim"
    } else return "no token claim";
    requestAccount = {
      account: currentAccounts[0],
      scopes: [process.env.REACT_APP_SASGENERATOR_SCOPE || ""],
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
    return await fetch(process.env.REACT_APP_SASGENERATOR_API || "", apiOptions).then(async (response) => {
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
    clientId: process.env.REACT_APP_STORAGESERVICE_CLIENTID || "",
    authority: process.env.REACT_APP_AUTHORITY || "",
  },
  cache: {
    cacheLocation: "sessionStorage", // This configures where your cache will be stored
    storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    secureCookies: false
  }
};