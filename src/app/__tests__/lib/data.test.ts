import { fetchPosts } from "@/app/lib/data";

const mockFetch = jest.fn().mockImplementation((url) =>
Promise.resolve({
  ok: true,
  json: () =>
    Promise.resolve([
      {
        date: "2023-09-30",
        title: "Test Post",
        url,
      },
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
    expect(posts).toHaveLength(1);
    expect(posts[0].title).toEqual("Test Post");
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
});
