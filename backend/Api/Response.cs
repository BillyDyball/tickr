namespace TickrApi.Models;

public class ApiResponse<T>
{
    public T? data { get; set; }

    public Metadata? meta { get; set; }
};

public class ApiDataResponse<T>
{
    public T? data { get; set; }
};

public class Metadata
{
    public Pagination? pagination { get; set; }
};

public class Pagination
{
    public int page { get; set; }
    public int per_page { get; set; }
}