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
