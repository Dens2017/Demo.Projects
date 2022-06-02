# Microsoft Authentication Library (MSAL)

Enables developers to acquire tokens from the Microsoft identity platform in order to authenticate users and access secured web APIs. <br/> It can be used to provide secure access to Microsoft Graph, other Microsoft APIs, third-party web APIs, or your own web API. MSAL supports many different application architectures and platforms including .NET, JavaScript, Java, Python, Android, and iOS.

## Application types and scenarios
- Single page applications (JavaScript)
- Web app signing in users
- Web application signing in a user and calling a web API on behalf of the user
- Protecting a web API so only authenticated users can access it
- Web API calling another downstream web API on behalf of the signed-in user
- Desktop application calling a web API on behalf of the signed-in user
- Mobile application calling a web API on behalf of the user who's signed-in interactively.
- Desktop/service daemon application calling web API on behalf of itself

## Authentication vs. authorization
MSAL follows the OAuth2 Authentication and Authorization flows

### Authentication
Authentication is the process of proving that you are who you say you are. It's sometimes shortened to AuthN. The Microsoft identity platform uses the OpenID Connect protocol for handling authentication.

### Authorization
Authorization is the act of granting an authenticated party permission to do something. It specifies what data you're allowed to access and what you can do with that data. Authorization is sometimes shortened to AuthZ. The Microsoft identity platform uses the OAuth 2.0 protocol for handling authorization.

## Roles in OAuth 2.0
![Image](https://docs.microsoft.com/en-us/azure/active-directory/develop/media/active-directory-v2-flows/protocols-roles.svg)
- **Authorization server** - The Microsoft identity platform itself is the authorization server. Also called an identity provider or IdP, it securely handles the end-user's information, their access, and the trust relationships between the parties in the auth flow. The authorization server issues the security tokens your apps and APIs use for granting, denying, or revoking access to resources (authorization) after the user has signed in (authenticated).
- **Client** - The client in an OAuth exchange is the application requesting access to a protected resource. The client could be a web app running on a server, a single-page web app running in a user's web browser, or a web API that calls another web API. You'll often see the client referred to as client application, application, or app.
- **Resource owner** - The resource owner in an auth flow is typically the application user, or end-user in OAuth terminology. The end-user "owns" the protected resource--their data--your app accesses on their behalf. The resource owner can grant or deny your app (the client) access to the resources they own. For example, your app might call an external system's API to get a user's email address from their profile on that system. Their profile data is a resource the end-user owns on the external system, and the end-user can consent to or deny your app's request to access their data.
- **Resource server** - The resource server hosts or provides access to a resource owner's data. Most often, the resource server is a web API fronting a data store. The resource server relies on the authorization server to perform authentication and uses information in bearer tokens issued by the authorization server to grant or deny access to resources.

## Tokens
Tokens are just bunch of strings that can be decoded to see what information it contains. MSAL use bearer tokens to authenticate and authorize access to resources. Two of the most common token use in MSAL are:
- **ID tokens** - ID tokens are issued by the authorization server to the client application. Clients use ID tokens when signing in users and to get basic information about them. It is the first token to be released upon success Authentication.
- **Access tokens** - Access tokens are issued by the authorization server to the client application. The client passes access tokens to the resource server. Access tokens contain the permissions the client has been granted by the authorization server. 

## App registration
Your client app needs a way to trust the security tokens issued to it by the Microsoft identity platform. App Services / Web Apps and Function Apps / Web API can optionally have an App Registration so client can interact with your resources. The only whay that you don't need App Registration is if you expose the Web App or Web API publicy not needing any Authentication and Authorization at all. Like informational sites of the government and exposed API that return the weather on your location. Two the most commonly referenced app registration settings are:

- **Application (client) ID** - Also called application ID and client ID, this value is assigned to your app by the Microsoft identity platform. The client ID uniquely identifies your app in the identity platform and is included in the security tokens the platform issues.
- **Redirect URI** - The authorization server uses a redirect URI to direct the resource owner's user-agent (web browser, mobile app) to another destination after completing their interaction. For example, after the end-user authenticates with the authorization server. Not all client types use redirect URIs.
- **Permission** - Granular definition of access available to be consumed by the client. It is categorized into 2 types.
  * **Delegated Permissions** - are permissions intended for sign in users. Using the user's credential it can request for an Access Token.
  * **Application Permissions** - are permissions for the calling API without any need for sign in user. APU can be protected using Secrets or Certificates to request for an Access Token.

### Diagram when a user is calling an API
![Picture](https://docs.microsoft.com/en-us/azure/active-directory/develop/media/scenarios/scenarios-with-users.svg)

### Diagram when a deamon / service is calling an API
![Picture](https://docs.microsoft.com/en-us/azure/active-directory/develop/media/scenarios/daemon-app.svg)

- **Public client applications**: Apps in this category, like the following types, always sign in users:
  * Desktop apps that call web APIs on behalf of signed-in users
  * Mobile apps
  * Apps running on devices that don't have a browser, like those running on IoT

- **Confidential client applications**: Apps in this category include:
  * Web apps that call a web API
  * Web APIs that call a web API
  * Daemon apps, even when implemented as a console service like a Linux daemon or a Windows service

### Security Options for the API
- Require users to login in the App
- Redirect URL
- Allowed Application permissions
- Exposed API
- App Roles
- Token Optioal Claims
