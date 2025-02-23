import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import RegisterPage from "@/app/auth/register/page";
import { REGISTER } from "@/lib/queries";
import '@testing-library/jest-dom';

// Create a mock for the REGISTER mutation.
const registerMocks = [
  {
    request: {
      query: REGISTER,
      variables: {
        data: {
          email: "new@example.com",
          name: "New User",
          password: "plaintextpassword",
        },
      },
    },
    result: {
      data: {
        register: {
          id: 2,
          email: "new@example.com",
          name: "New User",
          createdAt: "2025-02-23T00:00:00.000Z",
        },
      },
    },
  },
];

// Again, mock useRouter.
jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

describe("RegisterPage", () => {
  it("renders the registration form and submits", async () => {
    render(
      <MockedProvider mocks={registerMocks} addTypename={false}>
        <RegisterPage />
      </MockedProvider>
    );

    // Check that the form inputs exist.
    const nameInput = screen.getByPlaceholderText("Your Name");
    const emailInput = screen.getByPlaceholderText("you@example.com");
    const passwordInput = screen.getByPlaceholderText("********");
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    // Simulate user input.
    fireEvent.change(nameInput, { target: { value: "New User" } });
    fireEvent.change(emailInput, { target: { value: "new@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "plaintextpassword" } });

    // Find and submit the form.
    const submitButton = screen.getByRole("button", { name: /register/i });
    fireEvent.submit(submitButton);

    // Wait for the loading indicator.
    await waitFor(() =>
      expect(screen.getByText(/registering/i)).toBeInTheDocument()
    );

    // Optionally, check that router.push was called (if you enhance the mock)
  });
});
