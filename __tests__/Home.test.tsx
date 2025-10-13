import "@testing-library/jest-dom";
import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../app/components/Home";

describe("Home Component", () => {
  it("deve renderizar o texto de boas-vindas", () => {
    render(<Home />);
    const text = screen.getByText(/Welcome to the Home Page!/i);
    expect(text).toBeInTheDocument();
  });

  it("deve renderizar um botão", () => {
    render(<Home />);
    const button = screen.getByRole("button", { name: /Click Me/i });
    expect(button).toBeInTheDocument();
  });
});
