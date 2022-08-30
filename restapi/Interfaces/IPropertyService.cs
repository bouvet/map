namespace restapi.Interfaces
{
  public interface IPropertyService
  {
    Task<ServiceResponse<List<Property>>> GetAllProperties();
    Task<ServiceResponse<Property>> GetPropertyById(int id);
    Task<ServiceResponse<Property>> AddProperty(AddPropertyDto newProperty);
  }
}