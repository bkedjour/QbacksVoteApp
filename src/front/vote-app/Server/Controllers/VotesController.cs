using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace spa.Controllers
{
    [Route("api/[controller]")]
    public class VotesController : Controller
    {
        private readonly AppSettings _settings;
        private readonly HttpClient _http;

        public VotesController(IOptionsSnapshot<AppSettings> settings)
        {
            _settings = settings.Value;
            _http = new HttpClient();
        }

        [HttpGet()]
        public async Task<IActionResult> GetBattle()
        {
            return Ok(await _http.GetStringAsync($"http://{_settings.BackendConnectionString}/api/votes"));
        }

        [HttpGet("{key}", Name = "GetVote")]
        public async Task<IActionResult> GetVote(string key)
        {
            return Ok(await _http.GetStringAsync($"http://{_settings.BackendConnectionString}/api/votes/{key}"));
        }

        [HttpPost("{key}")]
        public async Task<IActionResult> AddVote(string key, [FromBody] int vote)
        {
            var response = await _http.PostAsync($"http://{_settings.BackendConnectionString}/api/votes/{key}",
            new StringContent(vote.ToString(), System.Text.Encoding.UTF8, "application/json"));

            response.EnsureSuccessStatusCode();

            return Created(Url.Link("GetVote", new { key = key }), vote);
        }
    }
}