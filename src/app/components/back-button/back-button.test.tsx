import { fireEvent, render, screen } from "@testing-library/react";
import { usePathname, useRouter } from "next/navigation";
import BackButton from "./back-button";

// Mock the next/navigation hooks
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

const mockBack = jest.fn();

beforeEach(() => {
  (useRouter as jest.Mock).mockReturnValue({
    back: mockBack,
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

test("renders nothing if pathname is '/'", () => {
  (usePathname as jest.Mock).mockReturnValue("/");

  render(<BackButton />);

  const backButton = screen.queryByRole("button");
  expect(backButton).toBeNull();
});

test("calls router.back when the back button is clicked", () => {
  (usePathname as jest.Mock).mockReturnValue("/documents/1");

  render(<BackButton />);

  const backButton = screen.getByRole("button");
  fireEvent.click(backButton);

  expect(mockBack).toHaveBeenCalled();
});

test("does not render back button if pathname is '/'", () => {
  (usePathname as jest.Mock).mockReturnValue("/");

  render(<BackButton />);

  const backButton = screen.queryByRole("button");
  expect(backButton).toBeNull();
});

test("renders back button if pathname is not '/'", () => {
  (usePathname as jest.Mock).mockReturnValue("/documents/1");

  render(<BackButton />);

  const backButton = screen.getByRole("button");
  expect(backButton).toBeInTheDocument();
});
