using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using Microsoft.Azure.KeyVault;
using Microsoft.Azure.KeyVault.Models;
using Microsoft.Azure.Services.AppAuthentication;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Graph;
using Microsoft.Identity.Client;
using Newtonsoft.Json;

namespace DaemonService
{
    public static class MSGraphService
    {
        [FunctionName("MSGraphService")]
        public static async Task<HttpResponseMessage> Run([HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)] HttpRequestMessage req, TraceWriter log)
        {
            try
            {
                log.Info("C# HTTP trigger function processed a request MSGraphService.");

                //Get Secret
                AzureServiceTokenProvider azureServiceTokenProvider = new AzureServiceTokenProvider();
                KeyVaultClient kvClient = new KeyVaultClient(
                    new KeyVaultClient.AuthenticationCallback(azureServiceTokenProvider.KeyVaultTokenCallback));
                SecretBundle secretBundle = await kvClient.GetSecretAsync(Environment.GetEnvironmentVariable("KEYVAULTURL", EnvironmentVariableTarget.Process), Environment.GetEnvironmentVariable("KVKEYNAME", EnvironmentVariableTarget.Process)).ConfigureAwait(false);
                string secret = secretBundle.Value;

                //Get Access Token
                IConfidentialClientApplication azureApp = ConfidentialClientApplicationBuilder.Create(Environment.GetEnvironmentVariable("CLIENTID", EnvironmentVariableTarget.Process))
                        .WithAuthority(Environment.GetEnvironmentVariable("AUTHORITY", EnvironmentVariableTarget.Process))
                        .WithClientSecret(secret)
                        .Build();
                var scopes = new[] { Environment.GetEnvironmentVariable("MSGRAPHSCOPE", EnvironmentVariableTarget.Process) };
                AuthenticationResult authPromise = azureApp.AcquireTokenForClient(scopes).ExecuteAsync().GetAwaiter().GetResult();
                string accessToken = authPromise.AccessToken;

                //Connect and perform action in MS Graph
                GraphServiceClient graphClient = new GraphServiceClient(new DelegateAuthenticationProvider(
                                        (request) =>
                                        {
                                                request.Headers.Authorization =
                                                new AuthenticationHeaderValue("Bearer", accessToken);
                                                return (Task.FromResult(0));
                                        }));

                IGraphServiceUsersCollectionPage user = await graphClient
                    .Users
                    .Request()
                    .Select(x => new
                    {
                        x.Id,
                        x.DisplayName,
                        x.GivenName,
                        x.Surname,
                        x.UserPrincipalName,
                        x.AccountEnabled,
                        x.Identities,
                        x.BusinessPhones,
                        x.JobTitle,
                        x.MobilePhone,
                        x.OfficeLocation,
                        x.PreferredLanguage,
                        x.Mail
                    }).GetAsync();
                return req.CreateResponse(HttpStatusCode.OK, JsonConvert.SerializeObject(user));
            }
            catch (Exception error)
            {
                return req.CreateResponse(HttpStatusCode.BadRequest, JsonConvert.SerializeObject(error));
            }
        }
    }
}
