namespace backend.Data;
using Microsoft.EntityFrameworkCore;

public class EntertainersDbContext : DbContext
{
    public EntertainersDbContext(DbContextOptions<EntertainersDbContext> options) : base(options)
    {
    }
    public DbSet<Entertainer> Entertainers { get; set; }
    public DbSet<Engagement> Engagements { get; set; }
}