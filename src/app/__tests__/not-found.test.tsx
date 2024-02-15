import { render, screen } from "@testing-library/react";
import { expect, describe, test } from "@jest/globals";
import NotFound from "@/app/not-found";

jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: {src: string, alt: string}) => {
    // Simplify the Next/Image to a regular img for testing purposes
    return <img src={props.src} alt={props.alt}/>;
  },
}));

describe("Not Found Page", () => {
  test("renders the 404 message and the take me home button", () => {
    render(<NotFound />);

    // Check for the 404 message
    expect(screen.getByText("404")).toBeInTheDocument();

    // Check for the error description text
    expect(screen.getByText(/lost in space/i)).toBeInTheDocument();

    // Check for the "Take me home" button
    const button = screen.getByRole("button", { name: /take me home/i });
    expect(button).toBeInTheDocument();
  });

  test('renders the correct image', () => {
    render(<NotFound />);

    const image = screen.getByRole('img', { name: /error/i });
    expect(image).toHaveAttribute('src', '/error-picture.jpg');
    expect(image).toHaveAttribute('alt', 'error');
  });
});
