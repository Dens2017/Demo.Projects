using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.Azure.KeyVault;
using Microsoft.Azure.KeyVault.Models;
using Microsoft.Azure.Services.AppAuthentication;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.Azure.WebJobs.Host;
using Microsoft.Identity.Client;
using Newtonsoft.Json;

namespace DaemonService
{
    public static class SQLService
    {
        [FunctionName("SQLService")]
        public static async Task<HttpResponseMessage> Run([HttpTrigger(AuthorizationLevel.Function, "get", "post", Route = null)]HttpRequestMessage req, TraceWriter log)
        {
            try
            {
                log.Info("C# HTTP trigger function processed a request SQLService.");

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
                var scopes = new[] { Environment.GetEnvironmentVariable("SQLSCOPE", EnvironmentVariableTarget.Process) };
                AuthenticationResult authPromise = azureApp.AcquireTokenForClient(scopes).ExecuteAsync().GetAwaiter().GetResult();
                string accessToken = authPromise.AccessToken;

                //Connect and perform action in SQL
                string dbConneStr = ConfigurationManager.ConnectionStrings["DBCONNSTR"].ConnectionString;
                SqlConnection connection = new SqlConnection(dbConneStr);
                connection.AccessToken = accessToken;
                string queryString = $"SELECT * FROM dbo.ProductList;";
                SqlCommand command = new SqlCommand(queryString, connection);
                connection.Open();
                List<string> productList = new List<string>();
                SqlDataReader reader = command.ExecuteReader();
                while (reader.Read())
                {
                    IDataRecord dataRecord = (IDataRecord)reader;
                    productList.Add(dataRecord[0].ToString());
                }
                connection.Close();

                return req.CreateResponse(HttpStatusCode.OK, JsonConvert.SerializeObject(productList));
            }
            catch (Exception error)
            {
                return req.CreateResponse(HttpStatusCode.BadRequest, JsonConvert.SerializeObject(error));
            }
        }
    }
}
