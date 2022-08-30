namespace restapi.Services
{
  public class PropertyService : IPropertyService
  {

    private readonly DataContext dataContext;

    public PropertyService(DataContext dataContext)
    {
      this.dataContext = dataContext;
    }

    public Task<ServiceResponse<Property>> AddProperty(AddPropertyDto newProperty)
    {
      throw new NotImplementedException();
    }

    public async Task<ServiceResponse<List<Property>>> GetAllProperties()
    {
      var response = new ServiceResponse<List<Property>> { };
      var properties = await dataContext.Properties.ToListAsync();
      response.Data = properties;
      response.StatusCode = 200;
      response.Success = true;
      return response;
    }

    public async Task<ServiceResponse<Property>> GetPropertyById(int id)
    {
      var response = new ServiceResponse<Property> { };

      try
      {
        var property = await dataContext.Properties.FirstOrDefaultAsync(property => property.Id == id);
        if (property is null)
        {
          throw new Exception($"Property with id {id} was not found");
        }

        response.Data = property;
        response.Success = true;
      }
      catch (Exception exception)
      {
        response.Data = null;
        response.Success = false;
        response.StatusCode = 404;
        response.Message = exception.Message;
      }

      return response;
    }
  }
}