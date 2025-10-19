import { render, screen } from "@testing-library/react";
import RootLayout from "@/app/layout";

jest.mock("next/font/google", () => ({
  Inter: () => ({ className: "mocked-font" }),
}));

describe("RootLayout", () => {
  it("renders footer and children correctly", () => {
    render(
    <RootLayout>
      <div>Conteúdo principal</div>
    </RootLayout>
  );

    expect(screen.getByText("Criado com Next.js.")).toBeInTheDocument();
    expect(screen.getByText("Ver exemplo no GitHub")).toBeInTheDocument();
    expect(screen.getByText("Conteúdo principal")).toBeInTheDocument();
  });
});
