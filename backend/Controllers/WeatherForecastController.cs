using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;

[ApiController]
[Route("[controller]")]
public sealed class WeatherForecastController(ILogger<WeatherForecastController> logger) : ControllerBase
{
    private static readonly string[] Summaries =
    [
        "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
    ];

    [HttpGet]
    [ProducesResponseType(typeof(IReadOnlyList<WeatherForecast>), StatusCodes.Status200OK)]
    public ActionResult<IReadOnlyList<WeatherForecast>> Get()
    {
        var forecasts = Enumerable.Range(1, 5)
            .Select(index => new WeatherForecast(
                Date: DateOnly.FromDateTime(DateTime.UtcNow.AddDays(index)),
                TemperatureC: Random.Shared.Next(-20, 55),
                Summary: Summaries[Random.Shared.Next(Summaries.Length)]))
            .ToArray();

        logger.LogInformation("Returning {Count} weather forecast records", forecasts.Length);

        return Ok(forecasts);
    }
}
