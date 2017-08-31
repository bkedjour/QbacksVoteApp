using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace spa.Controllers
{
    [Route("/api/[controller]")]
    public class EnvironmentController : Controller
    {
        private readonly AppSettings _settings;
        private readonly HttpClient _http;

        public EnvironmentController(IOptionsSnapshot<AppSettings> settings)
        {
            _settings = settings.Value;
            _http = new HttpClient();
        }

        [HttpGet("MachineName/{tier}")]
        public async Task<IActionResult> GetFrontendMachineName(string tier)
        {
            if (tier == "front")
                return Ok(System.Environment.MachineName);

            if (tier == "back")
                return Ok(await _http.GetStringAsync($"http://{_settings.BackendConnectionString}/api/containerinfo"));

            return NotFound("unkown tier");
        }

        [HttpGet("version")]
        public IActionResult GetAppVersion()
        {
            return Ok("v2.0");
        }
    }
}