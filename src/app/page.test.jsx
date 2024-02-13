import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Home from "./page";

const MockedArticleList = () => <div>Mocked Article List</div>

jest.mock("@/app/ui/article-list", () => MockedArticleList);

describe("Home Page", () => {
  it("renders ArticleList component", () => {
    render(<Home />);
    expect(screen.getByText("Mocked Article List")).toBeInTheDocument();
  });
});
