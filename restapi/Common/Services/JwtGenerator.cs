using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Options;
using restapi.Models;
using restapi.Common.Providers;
using restapi.Common.Settings;

namespace restapi.Common.Services;

public class JwtGenerator : IJwtGenerator
{
  private readonly JwtSettings jwtSettings;
  private readonly IDateTimeProvider dateTimeProvider;

  public JwtGenerator(IDateTimeProvider dateTimeProvider, IOptions<JwtSettings> jwtOptions)
  {
    this.dateTimeProvider = dateTimeProvider;
    jwtSettings = jwtOptions.Value;
  }

  public string GenerateToken(User user)
  {
    var signingCredentials = new SigningCredentials(
      new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Secret)),
      SecurityAlgorithms.HmacSha256
    );

    var claims = new List<Claim>
    {
      new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
      new Claim(JwtRegisteredClaimNames.Email, user.Email),
      new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
    };

    foreach (Role role in user.Roles)
    {
      claims.Add(new Claim("roles", role.Name));
    }

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