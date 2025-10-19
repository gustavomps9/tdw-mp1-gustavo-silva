import { render, screen } from "@testing-library/react";
import Date from "@/app/date";

describe("Date", () => {
  it("renders formatted date", () => {
    render(<Date dateString="2025-10-18" />);
    expect(screen.getByText("October 18, 2025")).toBeInTheDocument();
  });
});
