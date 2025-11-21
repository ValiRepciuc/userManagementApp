using FirstProject.Application.Interfaces.Specification;
using Microsoft.EntityFrameworkCore;

namespace FirstProject.Infrastructure.Specifications;

public class SpecificationEvaluator<TEntity> where TEntity : class 
{
    public static IQueryable<TEntity> GetQuery(IQueryable<TEntity> inputQuery, ISpecification<TEntity> specification)
    {
        var query = inputQuery.AsQueryable();
        
        if(specification.Criteria != null)
            query = query.Where(specification.Criteria);
        
        if(specification.OrderBy != null)
            query = query.OrderBy(specification.OrderBy);
        
        if (specification.OrderByDescending != null)
            query = query.OrderByDescending(specification.OrderByDescending);
        

        query = specification.Includes.Aggregate(query,
            (current, include) => current.Include(include));
        query = specification.IncludeStrings.Aggregate(query,
            (current, include) => current.Include(include));

        return query;
    }
}