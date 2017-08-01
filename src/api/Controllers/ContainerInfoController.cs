using Microsoft.AspNetCore.Mvc;

namespace VoteApp.Controllers
{
    [Route("api/[controller]")]
    public class ContainerInfoController : Controller
    {

        [HttpGet]
        public IActionResult Get()
        {
            return Ok(System.Environment.MachineName);
        }
    }
}