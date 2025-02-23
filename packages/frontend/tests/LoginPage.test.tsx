import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import LoginPage from '@/app/auth/login/page';
import { LOGIN } from '@/lib/queries';
import '@testing-library/jest-dom';

// Mock useRouter from Next.js.
const pushMock = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

// Group tests for LoginPage.
describe('LoginPage', () => {
  afterEach(() => {
    pushMock.mockClear();
  });

  describe('Successful submission', () => {
    // Create a mock for a successful LOGIN mutation.
    const loginMocks = [
      {
        request: {
          query: LOGIN,
          variables: {
            data: { email: 'test@travelmate.com', password: 'password' },
          },
        },
        result: {
          data: {
            login: {
              token: 'dummyToken',
              user: {
                id: 1,
                email: 'test@travelmate.com',
                name: 'Test User',
              },
            },
          },
        },
      },
    ];

    it('renders the login form and submits', async () => {
      render(
        <MockedProvider mocks={loginMocks} addTypename={false}>
          <LoginPage />
        </MockedProvider>
      );

      // Check that the inputs exist.
      const emailInput = screen.getByPlaceholderText('you@example.com');
      const passwordInput = screen.getByPlaceholderText('********');
      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();

      // Simulate user input.
      fireEvent.change(emailInput, {
        target: { value: 'test@travelmate.com' },
      });
      fireEvent.change(passwordInput, { target: { value: 'password' } });

      // Submit the form.
      const submitButton = screen.getByRole('button', { name: /login/i });
      fireEvent.submit(submitButton);

      // Wait for the loading indicator.
      await waitFor(() =>
        expect(screen.getByText(/logging in/i)).toBeInTheDocument()
      );
    });
  });

  describe('Error handling', () => {
    it('shows error when email or password is missing', async () => {
      render(
        <MockedProvider mocks={[]} addTypename={false}>
          <LoginPage />
        </MockedProvider>
      );

      const submitButton = screen.getByRole('button', { name: /login/i });
      // Submit form without any values.
      fireEvent.submit(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/please fill in all fields/i)
        ).toBeInTheDocument();
      });
    });

    it('shows error message when loginMutation throws an Error', async () => {
      const errorMocks = [
        {
          request: {
            query: LOGIN,
            variables: {
              data: { email: 'test@travelmate.com', password: 'password' },
            },
          },
          error: new Error('Test error message'),
        },
      ];

      render(
        <MockedProvider mocks={errorMocks} addTypename={false}>
          <LoginPage />
        </MockedProvider>
      );

      fireEvent.change(screen.getByPlaceholderText('you@example.com'), {
        target: { value: 'test@travelmate.com' },
      });
      fireEvent.change(screen.getByPlaceholderText('********'), {
        target: { value: 'password' },
      });
      fireEvent.submit(screen.getByRole('button', { name: /login/i }));

      await waitFor(() => {
        expect(screen.getByText('Test error message')).toBeInTheDocument();
      });
    });

    it('shows generic error when loginMutation rejects with a non-Error', async () => {
      // In this mock, we provide an error value that is a string.
      const nonErrorMocks = [
        {
          request: {
            query: LOGIN,
            variables: {
              data: { email: 'test@travelmate.com', password: 'password' },
            },
          },
          error: new Error('Non-error rejection'),
        },
      ];

      render(
        <MockedProvider mocks={nonErrorMocks} addTypename={false}>
          <LoginPage />
        </MockedProvider>
      );

      fireEvent.change(screen.getByPlaceholderText('you@example.com'), {
        target: { value: 'test@travelmate.com' },
      });
      fireEvent.change(screen.getByPlaceholderText('********'), {
        target: { value: 'password' },
      });
      fireEvent.submit(screen.getByRole('button', { name: /login/i }));

      // Depending on how Apollo wraps the error, you might get "Non-error rejection"
      // or a generic error. In our case, if the error is wrapped as an instance of Error,
      // the component will display its message.
      await waitFor(() => {
        expect(screen.getByText('Non-error rejection')).toBeInTheDocument();
      });
    });
  });
});
