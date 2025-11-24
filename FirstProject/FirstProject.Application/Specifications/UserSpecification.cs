using FirstProject.Domain.Entities;

namespace FirstProject.Application.Specifications;

public class UserSpecification : BaseSpecification<User>
{
   public UserSpecification( string? search = null,
      string? filterBy = null,
      string? sort = null,
      int? exactAge = null)
   {

      if (!string.IsNullOrEmpty(search))
      {
         search = search.ToLower();

         if (filterBy == "name")
         {
            Criteria = u => u.name.ToLower().Contains(search);
         }
         else
         {
            Criteria = u => u.name.ToLower().Contains(search);
         }
      }

      if (exactAge.HasValue)
      {
         var minBirth = DateOnly.FromDateTime(DateTime.Today.AddYears(-exactAge.Value));
         var maxBirth = DateOnly.FromDateTime(DateTime.Today.AddYears(-(exactAge.Value + 1)));

         Criteria = u =>
            u.birthDate <= minBirth &&
            u.birthDate > maxBirth;

         return;
      }

      switch (sort)
      {
         case "name_asc":
            ApplyOrderBy( u => u.name);
            break;
         case "name_desc":
            ApplyOrderByDescending(u => u.name);
            break;
         case "age_asc":
            ApplyOrderByDescending(u => u.birthDate);
            break;
         case "age_desc":
            ApplyOrderBy(u => u.birthDate);
            break;
         case "created_asc":
            ApplyOrderBy(u => u.CreatedAt);
            break;
         case "created_desc":
            ApplyOrderByDescending(u => u.CreatedAt);
            break;
      }
      
   }
}