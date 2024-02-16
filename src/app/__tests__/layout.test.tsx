import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import RootLayout from "@/app/layout";

//TODO: refactor to fix Warning: validateDOMNesting(...): <html> cannot appear as a child of <div>.

// Mocking the header component and react-query devtools
jest.mock("@/app/ui/header", () => {
  return function DummyHeader() {
    return <div>Mocked Header</div>;
  };
});

jest.mock("@tanstack/react-query-devtools", () => ({
  ReactQueryDevtools: function DummyDevTools() {
    return <div>Mocked ReactQueryDevtools</div>;
  },
}));

describe("RootLayout Component", () => {
  test("renders children and includes essential layout components", () => {
    const testMessage = "Test Child Component";
    render(
      <RootLayout>
        <div>{testMessage}</div>
      </RootLayout>
    );

    // Verify the Header is rendered
    expect(screen.getByText("Mocked Header")).toBeInTheDocument();

    // Verify children are rendered
    expect(screen.getByText(testMessage)).toBeInTheDocument();

    // verify the ReactQueryDevtools are rendered
    expect(screen.getByText('Mocked ReactQueryDevtools')).toBeInTheDocument();
  });
});
