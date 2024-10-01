using System.Text.Json.Serialization;

namespace Tickr.Models;

public class CryptoTickerSnapshot
{
    [JsonPropertyName("1d")]
    public PeriodData _1d { get; set; }
    [JsonPropertyName("1m")]
    public PeriodData _1m { get; set; }
    [JsonPropertyName("52w")]
    public FiftyTwoWeekData _52w { get; set; }
    public ChangeData ch { get; set; }
    public LastTradeData lt { get; set; }
    public PeriodData p1d { get; set; }
}

public class PeriodData
{
    public double o { get; set; }
    public double h { get; set; }
    public double l { get; set; }
    public double c { get; set; }
    public double v { get; set; }
}

public class FiftyTwoWeekData
{
    public int h { get; set; }
    public long ht { get; set; }
    public int l { get; set; }
    public long lt { get; set; }
    public double ch { get; set; }
    public double chp { get; set; }
    public double av { get; set; }
}

public class ChangeData
{
    public double dap { get; set; }
    public double wep { get; set; }
    public double mop { get; set; }
}

public class LastTradeData
{
    public int tm { get; set; }
    public int p { get; set; }
    public int s { get; set; }
}