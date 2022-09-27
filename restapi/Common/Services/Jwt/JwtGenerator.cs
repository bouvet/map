using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using restapi.Common.Services.Settings;
using restapi.Common.Services.Providers;
using Microsoft.Extensions.Options;

namespace restapi.Common.Services.Jwt;

public class JwtGenerator : IJwtGenerator
{
  private readonly JwtSettings jwtSettings;
  private readonly IDateTimeProvider dateTimeProvider;

  public JwtGenerator(IDateTimeProvider dateTimeProvider, IOptions<JwtSettings> jwtOptions)
  {
    this.dateTimeProvider = dateTimeProvider;
    jwtSettings = jwtOptions.Value;
  }

  public string GenerateToken(Guid userId, string email)
  {
    var signingCredentials = new SigningCredentials(
      new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Secret)),
      SecurityAlgorithms.HmacSha256
    );

    var claims = new[]
    {
      new Claim(JwtRegisteredClaimNames.Sub, userId.ToString()),
      new Claim(JwtRegisteredClaimNames.Email, email),
      new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
    };

    var securityToken = new JwtSecurityToken(
      issuer: jwtSettings.Issuer,
      audience: jwtSettings.Audience,
      expires: dateTimeProvider.UtcNow.AddMinutes(jwtSettings.ExpiryMinutes),
      claims: claims,
      signingCredentials: signingCredentials
    );

    return new JwtSecurityTokenHandler().WriteToken(securityToken);
  }
}