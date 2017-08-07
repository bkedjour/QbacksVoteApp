using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace spa.Controllers
{
    [Route("/api/[controller]")]
    public class SettingsController : Controller
    {
        private readonly AppSettings _settings;
        public SettingsController(IOptionsSnapshot<AppSettings> settings)
        {
            _settings = settings.Value;
        }
        [HttpGet]
        public IActionResult GetApiConnectionString()
        {
            return Json(_settings);
        }
    }
}