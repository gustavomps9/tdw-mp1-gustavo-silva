import { render, screen } from "@testing-library/react";
import MoreStories from "@/app/more-stories";

const mockPosts = [
  {
    slug: "post-1",
    title: "Primeiro Post",
    date: "2025-10-18",
    excerpt: "Resumo curto",
    author: { name: "Joana", picture: { url: "/joana.png" } },
    coverImage: { url: "/img1.png" },
  },
];

describe("MoreStories", () => {
  it("renders posts correctly", () => {
    render(<MoreStories morePosts={mockPosts} />);
    expect(screen.getByText("Primeiro Post")).toBeInTheDocument();
    expect(screen.getByText("More Stories")).toBeInTheDocument();
  });
});
