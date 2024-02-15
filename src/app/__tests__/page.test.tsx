import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

import { expect, describe, test } from "@jest/globals";

const text = "Mocked Article List";
jest.mock("@/app/ui/article-list", () => () => <div>{text}</div>);

describe("Home Page", () => {
  test("renders ArticleList component", () => {
    render(<Home />);
    const el = screen.getByText(text);
    expect(el).toBeInTheDocument();
  });
});
