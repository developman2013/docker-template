namespace backend.Configuration;

public sealed class CorsOptions
{
    public const string SectionName = "Cors";

    public List<string> AllowedOrigins { get; init; } = [];
}
