import { render, screen } from "@testing-library/react";
import CoverImage from "@/app/cover-image";

describe("CoverImage", () => {
  it("renders image with correct title and url", () => {
    render(<CoverImage title="Capa" slug="post-1" url="/img.png" />);
    const img = screen.getByRole("img");

    expect(img.getAttribute("src")).toContain("/img.png");
  });
});
