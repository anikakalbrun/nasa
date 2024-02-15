import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";

import Error from "@/app/error";

// Mocking next/link
jest.mock("next/link", () => {
  return ({ children }: { children: React.ReactNode }) => children;
});

// Mocking next/image
jest.mock("next/image", () => {
  return ({ src, alt }: { src: string; alt: string }) => (
    <img src={src} alt={alt} />
  );
});

describe("Error Component", () => {
  const mockReset = jest.fn();

  it("renders the error message, image, and buttons", () => {
    render(<Error reset={mockReset} />);

    // Check for the error message
    expect(screen.getByText("Something went wrong...")).toBeInTheDocument();

    // Check for the image
    const image = screen.getByRole("img", { name: "error" });
    expect(image).toHaveAttribute("src", "/error-picture.jpg");
    expect(image).toHaveAttribute("alt", "error");

    // Check for the "Take me home" button
    expect(screen.getByText("Take me home")).toBeInTheDocument();

    // Check for the "Try again" button
    expect(screen.getByText("Try again")).toBeInTheDocument();
  });

  it('calls the reset function when "Try again" button is clicked', () => {
    render(<Error reset={mockReset} />);

    // Simulate button click
    fireEvent.click(screen.getByText("Try again"));

    // Verify the reset function was called
    expect(mockReset).toHaveBeenCalledTimes(1);
  });
});
