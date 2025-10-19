// __tests__/lib/markdown.test.tsx
import { render, screen } from "@testing-library/react";
import { Markdown } from "@/lib/markdown";

// Mock de dados Contentful
const mockContent = {
  json: {
    nodeType: "document",
    content: [
      {
        nodeType: "heading-1",
        content: [
          {
            nodeType: "text",
            value: "Título de Teste",
            marks: [],
            data: {},
          },
        ],
        data: {},
      },
    ],
  },
  links: {
    assets: {
      block: [],
    },
  },
};

describe("Markdown", () => {
  it("renders a heading from Contentful JSON", async () => {
    render(<Markdown content={mockContent} />);
    
    // Procura por um heading com o texto "Título de Teste"
    const heading = await screen.findByRole("heading", { name: /Título de Teste/i });
    expect(heading).toBeInTheDocument();
  });
});
