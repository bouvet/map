using Microsoft.Extensions.FileProviders;
using System;

namespace restapi.Services
{
    public class CategoryService : ICategoryService
    {
        private readonly DataContext dataContext;

        public CategoryService(DataContext dataContext)
        {
            this.dataContext = dataContext;
        }

        public async Task<ServiceResponse<List<Category>>> GetAllCategories()
        {
            var response = new ServiceResponse<List<Category>> { };

            try
            {
                var categories = await dataContext.Categories.ToListAsync();
                
                if (categories is null)
                {
                    throw new Exception("Ops, something went wrong!");
                }

                response.StatusCode = 200;
                response.Data = categories;
                response.Success = true;
                
            }
            catch (Exception exception)
            {
                response.StatusCode = 500;
                response.Data = null;
                response.Success = false;
                response.Message = exception.Message;
            }


            return response;
        }

        public async Task<ServiceResponse<Category>> GetCategory(int id)
        {
            var response = new ServiceResponse<Category> { };

            try
            {
                var category = await dataContext.Categories.FindAsync(id);

                if (category is null)
                {
                    response.StatusCode = 404;
                    throw new Exception($"Category with id {id} not Found");
                }

                response.StatusCode = 200;
                response.Data = category;
                response.Success = true;
                
            }
            catch (Exception exception)
            {
                if (response.StatusCode is not 404) { response.StatusCode = 500; }

                response.Data = null;
                response.Success = false;
                response.Message = exception.Message;
            }


            return response;
        }


        public async Task<ServiceResponse<List<Category>>> AddCategory(CategoryDto request)
        {
            var response = new ServiceResponse<List<Category>> { };

            try
            {

                dataContext.Categories.Add(new Category { Name = request.Name, Emoji = request.Emoji });
                await dataContext.SaveChangesAsync();

                var categories = await dataContext.Categories.ToListAsync();

                response.StatusCode = 201;
                response.Data = categories;
                response.Success = true;
                
            }
            catch (Exception exception)
            {
                response.StatusCode = 500;
                response.Data = null;
                response.Success = false;
                response.Message = "Failed to add Category"; // exception.Message;
            }


            return response;
        }

        public async Task<ServiceResponse<List<Category>>> DeleteCategory(int id)
        {
            var response = new ServiceResponse<List<Category>> { };

            try
            {
                var category = await dataContext.Categories.FindAsync(id);

                if (category is null)
                {
                    response.StatusCode = 404;
                    throw new Exception($"Category with id {id} not Found");
                }

                dataContext.Categories.Remove(category);
                await dataContext.SaveChangesAsync();

                var categories = await dataContext.Categories.ToListAsync();
               
                response.StatusCode = 200;
                response.Success = true;
                response.Data = categories;

            }
            catch (Exception exception)
            {
                if (response.StatusCode is not 404) { response.StatusCode = 500; }
                response.Data = null;
                response.Success = false;
                response.Message = exception.Message;
            }


            return response;
        }

        public async Task<ServiceResponse<List<Category>>> UpdateCategory(Category request)
        {
            var response = new ServiceResponse<List<Category>> { };

            try
            {
                var category = await dataContext.Categories.FindAsync(request.Id);

                if (category is null)
                {
                    response.StatusCode = 404;
                    throw new Exception($"Category with id {request.Id} not Found");
                }
                    
                category.Name = request.Name;
                category.Emoji = request.Emoji;
                await dataContext.SaveChangesAsync();

                var categories = await dataContext.Categories.ToListAsync();
                if (categories is null) 
                    throw new Exception("Could not reach the database");
                
                response.Data = categories;
                response.Success = true;
                response.StatusCode = 200;
            }
            catch (Exception exception)
            {
                if (response.StatusCode is not 404) { response.StatusCode = 500; }
                response.Data = null;
                response.Success = false;
                response.Message = exception.Message;
            }


            return response;
        }
    }
}
