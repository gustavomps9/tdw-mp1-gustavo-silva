import { render, screen } from "@testing-library/react";
import PostPage from "@/app/posts/[slug]/page";
import * as api from "@/lib/api";
import { draftMode } from "next/headers";

jest.mock("next/headers", () => ({
  draftMode: jest.fn(),
}));

jest.mock("@/lib/api");

describe("PostPage", () => {
  beforeEach(() => {
    (draftMode as jest.Mock).mockResolvedValue({ isEnabled: false });
  });

  it("renders a single post and more stories", async () => {
    (api.getPostAndMorePosts as jest.Mock).mockResolvedValue({
      post: {
        title: "Post Exemplo",
        date: "2025-10-18",
        author: { name: "Joana", picture: { url: "/joana.png" } },
        coverImage: { url: "/cover.png" },
        content: "# Conteúdo de Exemplo",
      },
      morePosts: [],
    });

    const params = Promise.resolve({ slug: "post-exemplo" });
    render(await PostPage({ params }));
    expect(screen.getByText("Post Exemplo")).toBeInTheDocument();
    expect(screen.getByText("Blog")).toBeInTheDocument();
  });
});
