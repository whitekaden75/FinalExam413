using backend.Data;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Mission11.API.Controllers;

[Route("api/Ent")]
[ApiController]
public class EntertainerController : ControllerBase
{
    private EntertainersDbContext _context;
    public EntertainerController(EntertainersDbContext config)
    {
        _context = config;
    }

    [HttpGet]
    public async Task<ActionResult> GetEntertainers()
    {
        var query = _context.Entertainers.AsQueryable();

        var entertainers = await query
            .Select(e => new
            {
                e.EntertainerID,
                e.EntStageName,
                e.EntSSN,
                e.EntStreetAddress,
                e.EntCity,
                e.EntState,
                e.EntZipCode,
                e.EntPhoneNumber,
                e.EntWebPage,
                e.EntEmailAddress,
                e.DateEntered,
                timesBooked = _context.Engagements.Count(en => en.EntertainerID == e.EntertainerID),
                lastBookedDate = _context.Engagements
                    .Where(en => en.EntertainerID == e.EntertainerID)
                    .OrderByDescending(en => en.StartDate)
                    .Select(en => en.StartDate)
                    .FirstOrDefault()
            })
            .ToListAsync();

        return Ok(entertainers);
    }
    
    [HttpGet("{id}")]
    public async Task<ActionResult> GetEntertainerById(int id)
    {
        var entertainer = await _context.Entertainers
            .Where(e => e.EntertainerID == id)
            .Select(e => new
            {
                e.EntertainerID,
                e.EntStageName,
                e.EntSSN,
                e.EntStreetAddress,
                e.EntCity,
                e.EntState,
                e.EntZipCode,
                e.EntPhoneNumber,
                e.EntWebPage,
                e.EntEmailAddress,
                e.DateEntered,
                timesBooked = _context.Engagements.Count(en => en.EntertainerID == e.EntertainerID),
                lastBookedDate = _context.Engagements
                    .Where(en => en.EntertainerID == e.EntertainerID)
                    .OrderByDescending(en => en.StartDate)
                    .Select(en => en.StartDate)
                    .FirstOrDefault()
            })
            .FirstOrDefaultAsync();

        if (entertainer == null)
        {
            return NotFound();
        }

        return Ok(entertainer);
    }

    [HttpPost]
    public async Task<ActionResult<Entertainer>> PostEntertainer(Entertainer entertainer)
    {
        // Optional: server-side validation
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        _context.Entertainers.Add(entertainer);
        await _context.SaveChangesAsync();

        // Return the created entertainer with 201 status and location header
        return CreatedAtAction(nameof(GetEntertainerById), new { id = entertainer.EntertainerID }, entertainer);
    }
    [HttpPut("{id}")]
    public async Task<IActionResult> PutEntertainer(int id, Entertainer entertainer)
    {
        if (id != entertainer.EntertainerID)
        {
            return BadRequest("Mismatched entertainer ID");
        }

        _context.Entry(entertainer).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!_context.Entertainers.Any(e => e.EntertainerID == id))
            {
                return NotFound();
            }
            throw;
        }

        return NoContent();
    }
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEntertainer(int id)
    {
        var entertainer = await _context.Entertainers.FindAsync(id);
        if (entertainer == null)
        {
            return NotFound();
        }

        _context.Entertainers.Remove(entertainer);
        await _context.SaveChangesAsync();

        return NoContent();
    }
    
}