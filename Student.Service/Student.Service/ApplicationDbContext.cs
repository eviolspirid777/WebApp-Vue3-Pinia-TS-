using Microsoft.EntityFrameworkCore;
using Student.Service;
using System.Collections.Generic;

namespace EF_web_app
{
	public class ApplicationDbContext : DbContext
	{
		public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
		{
		}
		public DbSet<Student> Students { get; set; }
		public DbSet <Cities> Cities { get; set; }
	}
}
