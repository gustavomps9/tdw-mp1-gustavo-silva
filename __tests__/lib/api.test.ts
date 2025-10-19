import { getAllPosts, getPostAndMorePosts } from "@/lib/api";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () =>
      Promise.resolve({
        data: {
          postCollection: { items: [{ slug: "post-1" }] },
        },
      }),
  }),
) as jest.Mock;

describe("API functions", () => {
  it("gets all posts", async () => {
    const posts = await getAllPosts(false);
    expect(Array.isArray(posts)).toBe(true);
  });

  it("gets single post and more posts", async () => {
    const { post, morePosts } = await getPostAndMorePosts("post-1", false);
    expect(post).toBeDefined();
    expect(Array.isArray(morePosts)).toBe(true);
  });
});
