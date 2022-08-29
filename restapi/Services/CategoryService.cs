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

        public async Task<ServiceResponse<List<Category>>> AddCategory(Category request)
        {
            var response = new ServiceResponse<List<Category>> { };

            try
            {
                dataContext.Categories.Add(request);
                await dataContext.SaveChangesAsync();

                var categories = await dataContext.Categories.ToListAsync();

                if (categories is not null)
                {
                    response.Data = categories;
                    response.Success = true;
                }
            }
            catch (Exception exception)
            {
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
                    throw new Exception("Category not Found");
               
                response.Data = category;
                response.Success = true;
                
            }
            catch (Exception exception)
            {
                response.Data = null;
                response.Success = false;
                response.Message = exception.Message;
            }


            return response;
        }


        public async Task<ServiceResponse<List<Category>>> GetAllCategories()
        {
            var response = new ServiceResponse<List<Category>> { };

            try
            {
                var categories = await dataContext.Categories.ToListAsync();
                
                if (categories is not null)
                {
                    response.Data = categories;
                    response.Success = true;
                }
            }
            catch (Exception exception)
            {
                response.Data = null;
                response.Success = false;
                response.Message = exception.Message;
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
                    throw new Exception("Category not Found");

                dataContext.Categories.Remove(category);
                await dataContext.SaveChangesAsync();

                var categories = await dataContext.Categories.ToListAsync();
                response.Success = true;

                if (categories is not null)
                {
                    response.Data = categories;
                }
            }
            catch (Exception exception)
            {
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
                    throw new Exception("Category not Found");

                category.Name = request.Name;
                category.Emoji = request.Emoji;
                await dataContext.SaveChangesAsync();

                var categories = await dataContext.Categories.ToListAsync();
                if (categories is not null)
                {
                    response.Data = categories;
                    response.Success = true;
                }
            }
            catch (Exception exception)
            {
                response.Data = null;
                response.Success = false;
                response.Message = exception.Message;
            }


            return response;
        }
    }
}
