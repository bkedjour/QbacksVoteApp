using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using VoteApp.Services;

namespace VoteApp.Controllers
{
    [Route("api/[controller]")]
    public class VotesController : Controller
    {
        private readonly IVotesService _votesService;

        public VotesController(IVotesService votesService)
        {
            _votesService = votesService;
        }

        [HttpGet()]
        public IActionResult GetBattle()
        {
            return Ok(_votesService.GetBattle());
        }

        [HttpGet("{key}", Name = "GetVote")]
        public async Task<IActionResult> GetVote(string key)
        {
            return Ok(await _votesService.GetVote(key));
        }

        [HttpPost("{key}")]
        public async Task<IActionResult> AddVote(string key, [FromBody] int vote)
        {
            await _votesService.AddVote(key, vote);
            return Created(Url.Link("GetVote", new { key = key }), vote);
        }
    }
}