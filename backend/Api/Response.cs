namespace TickrApi.Models;

public class ApiResponse<T>
{
    public T? data { get; }

    public Metadata? meta { get; }
};

public class Metadata
{
    public Pagination? pagination { get; }
};

public class Pagination
{
    public int page { get; }
    public int per_page { get; }
}