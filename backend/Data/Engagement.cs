using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Engagement
{
    [Key]
    public int EngagementNumber { get; set; }

    public DateTime? StartDate { get; set; }

    public DateTime? EndDate { get; set; }

    public TimeSpan? StartTime { get; set; }

    public TimeSpan? StopTime { get; set; }

    [Column(TypeName = "decimal(18,2)")]
    public decimal? ContractPrice { get; set; }

    public int? CustomerID { get; set; }

    public int? AgentID { get; set; }

    public int? EntertainerID { get; set; }

    // Navigation properties (optional, if you're using relationships)
    // public Customer Customer { get; set; }
    // public Agent Agent { get; set; }
    // public Entertainer Entertainer { get; set; }
}