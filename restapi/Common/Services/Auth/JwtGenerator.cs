using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using Microsoft.Extensions.Options;
using restapi.Common.Providers;
using restapi.Common.Settings;
using restapi.Entities;

namespace restapi.Common.Services.Auth;

public class JwtGenerator : IJwtGenerator
{
  private readonly JwtSettings jwtSettings;
  private readonly IDateTimeProvider dateTimeProvider;

  public JwtGenerator(IDateTimeProvider dateTimeProvider, IOptions<JwtSettings> jwtOptions)
  {
    this.dateTimeProvider = dateTimeProvider;
    jwtSettings = jwtOptions.Value;
  }

  public string GenerateUserToken(User user)
  {
    var claims = new List<Claim>
    {
      new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
      new Claim(JwtRegisteredClaimNames.Email, user.Email),
      new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
      new Claim("userId", user.Id.ToString()),
    };

    foreach (Role role in user.Roles)
    {
      claims.Add(new Claim("roles", role.Name));
    }

    var securityToken = GetSecurityToken(jwtSettings.ExpiryMinutes, claims);

    return new JwtSecurityTokenHandler().WriteToken(securityToken);
  }

  public string GenerateRegistrationToken(Email email)
  {
    var claims = new List<Claim>
    {
      new Claim(JwtRegisteredClaimNames.Sub, email.Id.ToString()),
      new Claim(JwtRegisteredClaimNames.Email, email.Address),
      new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
      new Claim("emailId", email.Id.ToString()),
      new Claim("roles", "Registering")
    };

    var securityToken = GetSecurityToken(2880, claims);// 2880 minutes = 48 hours

    return new JwtSecurityTokenHandler().WriteToken(securityToken);
  }

  public string GenerateResetPasswordToken(User user)
  {
    var claims = new List<Claim>
    {
      new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
      new Claim(JwtRegisteredClaimNames.Email, user.Email),
      new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
      new Claim("userId", user.Id.ToString()),
      new Claim("roles", "ResettingPassword")
    };

    var securityToken = GetSecurityToken(10, claims);

    return new JwtSecurityTokenHandler().WriteToken(securityToken);
  }

  public string GenerateChangeEmailToken(User user, string email)
  {
    var claims = new List<Claim>
    {
      new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
      new Claim(JwtRegisteredClaimNames.Email, email),
      new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
      new Claim("userId", user.Id.ToString()),
      new Claim("roles", "ChangingEmail")
    };

    var securityToken = GetSecurityToken(2880, claims);

    return new JwtSecurityTokenHandler().WriteToken(securityToken);
  }

  private JwtSecurityToken GetSecurityToken(int expiryMinutes, List<Claim> claims)
  {
    var signingCredentials = new SigningCredentials(
      new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.Secret)),
      SecurityAlgorithms.HmacSha256
    );

    return new JwtSecurityToken(
      issuer: jwtSettings.Issuer,
      audience: jwtSettings.Audience,
      claims: claims,
      expires: dateTimeProvider.UtcNow.AddMinutes(expiryMinutes),
      signingCredentials: signingCredentials
    );
  }
}