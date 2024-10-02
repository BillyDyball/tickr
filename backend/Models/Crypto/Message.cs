using System.Text.Json.Serialization;

namespace TickrApi.Models;

public class CryptoMessage
{
    [JsonPropertyName("d")]
    public string D { get; set; }
    [JsonPropertyName("p")]
    public string P { get; set; }

    [JsonPropertyName("ch")]
    public string Ch { get; set; }

    [JsonPropertyName("f")]
    public string F { get; set; }

    [JsonPropertyName("aggr")]
    public string Aggr { get; set; }

    [JsonPropertyName("s")]
    public string S { get; set; }

    [JsonPropertyName("t")]
    public long T { get; set; }

    [JsonPropertyName("o")]
    public double O { get; set; }

    [JsonPropertyName("h")]
    public double H { get; set; }

    [JsonPropertyName("l")]
    public double L { get; set; }

    [JsonPropertyName("c")]
    public double C { get; set; }

    [JsonPropertyName("v")]
    public double V { get; set; }
}