import { render, screen } from "@testing-library/react";
import Page from "@/app/page";
import * as api from "@/lib/api";

jest.mock("@/lib/api");
jest.mock("next/headers", () => ({
  draftMode: jest.fn().mockResolvedValue({ isEnabled: false }),
}));

describe("Page", () => {
  it("renders hero post when posts exist", async () => {
    (api.getAllPosts as jest.Mock).mockResolvedValue([
      {
        slug: "post-1",
        title: "Título de Exemplo",
        date: "2025-10-18",
        excerpt: "Resumo",
        author: { name: "Joana", picture: { url: "/joana.png" } },
        coverImage: { url: "/img1.png" },
      },
    ]);

    render(await Page());
    expect(screen.getByText("Blog de TDW.")).toBeInTheDocument();
    expect(screen.getByText("Título de Exemplo")).toBeInTheDocument();
  });

  it("renders fallback message when no posts", async () => {
    (api.getAllPosts as jest.Mock).mockResolvedValue([]);
    render(await Page());
    expect(
      screen.getByText("No posts found. Please check your Contentful configuration.")
    ).toBeInTheDocument();
  });
});
