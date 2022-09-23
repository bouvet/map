using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using restapi.Common.Services.Settings;
using restapi.Common.Services.Providers;

namespace restapi.Common.Services.Jwt;

public class JwtGenerator : IJwtGenerator
{
  private readonly IAzureProvider azureProvider;
  private readonly IDateTimeProvider dateTimeProvider;

  public JwtGenerator(
    IAzureProvider azureProvider,
    IDateTimeProvider dateTimeProvider)
  {
    this.azureProvider = azureProvider;
    this.dateTimeProvider = dateTimeProvider;
  }

  public async Task<string> GenerateToken(Guid userId, string email)
  {
    var keyVaultClient = azureProvider.GetKeyVaultClient();
    var jwtSecretResponse = await azureProvider.GetKeyVaultSecret(keyVaultClient, AzureSettings.KeyVaultNameForJwtSecret);
    var jwtIssuerResponse = await azureProvider.GetKeyVaultSecret(keyVaultClient, AzureSettings.KeyVaultNameForJwtIssuer);
    var jwtAudienceResponse = await azureProvider.GetKeyVaultSecret(keyVaultClient, AzureSettings.KeyVaultNameForJwtAudience);
    var jwtExpiryMinutesResponse = await azureProvider.GetKeyVaultSecret(keyVaultClient, AzureSettings.KeyVaultNameForJwtExpiryMinutes);

    var jwtSecret = jwtSecretResponse.Value.Value;
    var jwtIssuer = jwtIssuerResponse.Value.Value;
    var jwtAudience = jwtAudienceResponse.Value.Value;
    var jwtExpiryMinutes = jwtExpiryMinutesResponse.Value.Value;

    var signingCredentials = new SigningCredentials(
      new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSecret)),
      SecurityAlgorithms.HmacSha256
    );

    var claims = new[]
    {
      new Claim(JwtRegisteredClaimNames.Sub, userId.ToString()),
      new Claim(JwtRegisteredClaimNames.Email, email),
      new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
    };

    var securityToken = new JwtSecurityToken(
      issuer: jwtIssuer,
      audience: jwtAudience,
      expires: dateTimeProvider.UtcNow.AddMinutes(int.Parse(jwtExpiryMinutes)),
      claims: claims,
      signingCredentials: signingCredentials
    );

    return new JwtSecurityTokenHandler().WriteToken(securityToken);
  }
}