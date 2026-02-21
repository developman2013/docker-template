using backend.Configuration;
using Microsoft.AspNetCore.Diagnostics;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddProblemDetails();
builder.Services.AddControllers();
builder.Services.AddHealthChecks();

var corsOptions = builder.Configuration
    .GetSection(CorsOptions.SectionName)
    .Get<CorsOptions>() ?? new CorsOptions();

builder.Services.AddCors(options =>
{
    options.AddPolicy("ApiCors", policy =>
    {
        var allowedOrigins = corsOptions.AllowedOrigins;

        if (allowedOrigins.Count == 0)
        {
            policy.WithOrigins("http://localhost", "http://localhost:80", "http://localhost:4200");
        }
        else
        {
            policy.WithOrigins(allowedOrigins.ToArray());
        }

        policy.AllowAnyHeader();
        policy.AllowAnyMethod();
    });
});

var app = builder.Build();

app.UseExceptionHandler(errorApp =>
{
    errorApp.Run(async context =>
    {
        var exception = context.Features.Get<IExceptionHandlerFeature>()?.Error;
        var logger = context.RequestServices.GetRequiredService<ILoggerFactory>().CreateLogger("GlobalExceptionHandler");

        if (exception is not null)
        {
            logger.LogError(exception, "Unhandled exception while processing request {Path}", context.Request.Path);
        }

        await Results.Problem(
            title: "Unexpected error",
            statusCode: StatusCodes.Status500InternalServerError
        ).ExecuteAsync(context);
    });
});

app.UseRouting();
app.UseCors("ApiCors");
app.UseAuthorization();

app.MapHealthChecks("/healthz");
app.MapControllers();

app.Run();
