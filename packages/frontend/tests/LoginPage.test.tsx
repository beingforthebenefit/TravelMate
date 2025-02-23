import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import LoginPage from "@/app/auth/login/page";
import { LOGIN } from "@/lib/queries";
import '@testing-library/jest-dom';

// Create a mock for the LOGIN mutation.
const loginMocks = [
  {
    request: {
      query: LOGIN,
      variables: {
        data: {
          email: "test@travelmate.com",
          password: "password",
        },
      },
    },
    result: {
      data: {
        login: {
          token: "dummyToken",
          user: {
            id: 1,
            email: "test@travelmate.com",
            name: "Test User",
          },
        },
      },
    },
  },
];

// We need to mock useRouter from Next.js.
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("LoginPage", () => {
  it("renders the login form and submits", async () => {
    render(
      <MockedProvider mocks={loginMocks} addTypename={false}>
        <LoginPage />
      </MockedProvider>
    );

    // Check that the email and password inputs exist.
    const emailInput = screen.getByPlaceholderText("you@example.com");
    const passwordInput = screen.getByPlaceholderText("********");
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    // Simulate user typing.
    fireEvent.change(emailInput, { target: { value: "test@travelmate.com" } });
    fireEvent.change(passwordInput, { target: { value: "password" } });

    // Find and submit the form.
    const submitButton = screen.getByRole("button", { name: /login/i });
    fireEvent.submit(submitButton);

    // Wait for the mutation to trigger loading state.
    await waitFor(() =>
      expect(screen.getByText(/logging in/i)).toBeInTheDocument()
    );

    // You can also verify that the mutation returns the expected token, but note that
    // redirection (router.push) is hard to assert without further router mocking.
  });
});
