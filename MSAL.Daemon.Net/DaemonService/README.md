# Application MSAL
This project is about calling an Application API by another API. There is no user involved and the Authentication and Authorization Flow is by using token. For the purpose of this presentation I created two consuming API, one is to call MS Graph and the other one is to call and SQL Data. I uset .Net 4.8 Framework to construct the API. 

## MS Graph Service API
This is the first Application that will return all the users inlusing their basic information in the Azure Directory.

### Setup Requirements
- Azure Function
  * Identity Enabled
  * Microsoft Authentication Enabled
  * Bind to an App Registration
- Key vault
  * Access Policy to Get Secret
  * Secret Value stored here
- App Registration
  * Redirect URL pointed back to the calling API
  * Application Permission to MS Graph User.ReadAll

## SQL Service API
This is the second Application that will fetch the Product list in SQL Database. 

### Setup Requirements
- Azure Function
  * Identity Enabled
  * Microsoft Authentication Enabled
  * Bind to an App Registration
- Key vault
  * Access Policy to Get Secret
  * Secret Value stored here
- App Registration
  * Redirect URL pointed back to the calling API
  * Application Permission to Azure SQL Database
  * AD Group. Add the Azure Function identity as a member
- SQL Database
  * Add the AD Group as a Database user, assigned an appropriate role
