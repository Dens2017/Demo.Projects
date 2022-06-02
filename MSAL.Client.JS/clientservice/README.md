# Delegated MSAL
This project is about calling an API by a sign-in user. User can use various Authorization to authenticated and some of the popular Authorization endpoints are Microsoft, Facebook, Google, Github, Apple, Twitter and even OpenID. For the purpose of the demonstration I will use Microsoft as an Authentication as using other Authorization needs difference libraries to get credential Information. For the purpose of this presentation I created 4 client side actions, one is to call MS Graph, the other one is to call an API to return the generated Storage SAS Token, the third is calling an API but you need to be a member of a Group and lastly calling an API on certain location only. I uset React Typescript Framework to construct the Web App that can call the API. 

## MS Graph Service API to all login users
This is the first Application that will return the current user basic information.

### Setup Requirements
- Azure Function
  * Identity Enabled
  * Microsoft Authentication Enabled
  * Bind to an App Registration
- Key vault
  * Access Policy to Get Secret
  * Secret Value stored here
- App Registration
  * Redirect Web URL pointed back to the calling Web App
  * Redirect Single Page Application to the calling Web App so tokens will be acquired in the same page. If you don't do this you will have CORS problem as you didn't pass the token back to the page. Requesting for a token to a specific app needs you to do some cross domain where by default is not permitted. 
  * Delegated Permission to MS Graph User.ReadAll

## SAS Generator API open to login users
This is the second Application that will fetch Read SAS Token to be used in accessing files in the Private Azure Storage

### Setup Requirements
- Azure Function
  * Identity Enabled
  * Microsoft Authentication Enabled
  * Bind to an App Registration
- Key vault
  * Access Policy to Get Secret
  * Secret Value stored here
- App Registration
  * Redirect Web URL pointed back to the calling Web App
  * Redirect Single Page Application to the calling Web App so tokens will be acquired in the same page. If you don't do this you will have CORS problem as you didn't pass the token back to the page. Requesting for a token to a specific app needs you to do some cross domain where by default is not permitted. 
  * Delegated Permission to MS Graph User.ReadAll

## SAS Generator API open to users included in the App Role
This is the second Application that will fetch Read SAS Token to be used in accessing files in the Private Azure Storage

### Setup Requirements
- Azure Function
  * Identity Enabled
  * Microsoft Authentication Enabled
  * Bind to an App Registration
- Key vault
  * Access Policy to Get Secret
  * Secret Value stored here
- App Registration
  * Redirect Web URL pointed back to the calling Web App
  * Redirect Single Page Application to the calling Web App so tokens will be acquired in the same page. If you don't do this you will have CORS problem as you didn't pass the token back to the page. Requesting for a token to a specific app needs you to do some cross domain where by default is not permitted. 
  * Delegated Permission to MS Graph User.ReadAll
  * App Roles where are specific user need to be added

## SAS Generator API open to users in a specific country
This is the second Application that will fetch Read SAS Token to be used in accessing files in the Private Azure Storage

### Setup Requirements
- Azure Function
  * Identity Enabled
  * Microsoft Authentication Enabled
  * Bind to an App Registration
- Key vault
  * Access Policy to Get Secret
  * Secret Value stored here
- App Registration
  * Redirect Web URL pointed back to the calling Web App
  * Redirect Single Page Application to the calling Web App so tokens will be acquired in the same page. If you don't do this you will have CORS problem as you didn't pass the token back to the page. Requesting for a token to a specific app needs you to do some cross domain where by default is not permitted. 
  * Delegated Permission to MS Graph User.ReadAll
  * Optional Claims specifically the Access Token where you need to enable country

