import { render, screen } from "@testing-library/react";
import Avatar from "@/app/avatar";

describe("Avatar", () => {
  it("renders name and image", () => {
    render(<Avatar name="Joana Reis" picture={{ url: "/joana.png" }} />);
    expect(screen.getByText("Joana Reis")).toBeInTheDocument();

    const img = screen.getByRole("img");

    expect(img.getAttribute("src")).toContain("/joana.png");
  });
});
