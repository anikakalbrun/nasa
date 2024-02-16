import { fetchPosts, fetchPost } from "@/app/lib/data";

const mockFetch = jest.fn().mockImplementation((url) =>
Promise.resolve({
  ok: true,
  json: () =>
    Promise.resolve([
      {
        date: "2023-09-29",
        url,
      },
      {
        date: "2023-09-30",
        url,
      },
      {
        date: "2023-09-31",
        url,
      }
    ]),
})
) as jest.MockedFunction<typeof fetch>
// Mocking fetch globally
// By declaring mockFetch as a jest.MockedFunction<typeof fetch> and assigning it to global.fetch,
// we're replacing the global fetch function with a mock that TypeScript recognizes.
// This eliminates the type error when accesing mockFetch.mock.calls[0]

global.fetch = mockFetch;

describe("fetchPosts", () => {
  beforeEach(() => {
    (mockFetch as jest.Mock).mockClear();
  });

  test("fetches posts and returns them sorted by date", async () => {
    const posts = await fetchPosts("2023-10-01");

    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(posts[0].date).toEqual("2023-09-31");
    expect(posts[1].date).toEqual("2023-09-30");
    expect(posts[2].date).toEqual("2023-09-29");
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("start_date=2023-09-17&end_date=2023-10-01"),
      expect.anything()
    );
  });

  test("calls fetch with the correct cache option", async () => {
    await fetchPosts("2023-10-01");
    expect(mockFetch).toHaveBeenCalledTimes(1);
    const fetchCallArgs = mockFetch.mock.calls[0];
    const fetchOptions = fetchCallArgs[1];

    expect(fetchOptions).toEqual(
      expect.objectContaining({ cache: "force-cache" })
    );
  });

  test('throws an error when fetch fails', async () => {
    (mockFetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(fetchPosts('2021-01-01')).rejects.toThrow('Failed to fetch data');
  });
});

describe('fetchPost', () => {
  beforeEach(() => {
    (mockFetch as jest.Mock).mockClear();
  });
  test('fetches post data successfully', async () => {
    const mockPostData = {
      date: '2021-01-01',
      explanation: 'This is a test explanation.',
      title: 'Test Title',
    };

    (mockFetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockPostData),
    });

    const result = await fetchPost('2021-01-01');
    expect(result).toEqual(mockPostData);
    expect(mockFetch).toHaveBeenCalledTimes(1);
    expect(mockFetch).toHaveBeenCalledWith(
      `https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}&date=2021-01-01`
    );
  });

  test('throws an error when fetch fails', async () => {
    (mockFetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
    });

    await expect(fetchPost('2021-01-01')).rejects.toThrow('Failed to fetch data');
  });
});
