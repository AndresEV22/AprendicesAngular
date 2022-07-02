using BKProyecto.Models;
using Microsoft.EntityFrameworkCore;

namespace BKProyecto
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
            
        }
        public DbSet<Aprendiz> Aprendiz { get; set; }
    }
}
