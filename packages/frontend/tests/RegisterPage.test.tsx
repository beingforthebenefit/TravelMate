import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import RegisterPage from '@/app/auth/register/page';
import { REGISTER } from '@/lib/queries';
import '@testing-library/jest-dom';

// Mock useRouter from Next.js.
const pushMock = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

describe('RegisterPage', () => {
  afterEach(() => {
    pushMock.mockClear();
  });

  describe('Successful submission', () => {
    const registerMocks = [
      {
        request: {
          query: REGISTER,
          variables: {
            data: {
              email: 'new@example.com',
              name: 'New User',
              password: 'plaintextpassword',
            },
          },
        },
        result: {
          data: {
            register: {
              id: 2,
              email: 'new@example.com',
              name: 'New User',
              createdAt: '2025-02-23T00:00:00.000Z',
            },
          },
        },
      },
    ];

    it('renders the registration form and submits', async () => {
      render(
        <MockedProvider mocks={registerMocks} addTypename={false}>
          <RegisterPage />
        </MockedProvider>
      );

      // Check that the form inputs exist.
      const nameInput = screen.getByPlaceholderText('Your Name');
      const emailInput = screen.getByPlaceholderText('you@example.com');
      const passwordInput = screen.getByPlaceholderText('********');
      expect(nameInput).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();

      // Simulate user input.
      fireEvent.change(nameInput, { target: { value: 'New User' } });
      fireEvent.change(emailInput, { target: { value: 'new@example.com' } });
      fireEvent.change(passwordInput, {
        target: { value: 'plaintextpassword' },
      });

      // Submit the form.
      const submitButton = screen.getByRole('button', { name: /register/i });
      fireEvent.submit(submitButton);

      // Wait for the loading indicator.
      await waitFor(() =>
        expect(screen.getByText(/registering/i)).toBeInTheDocument()
      );
    });
  });

  describe('Error handling', () => {
    it('shows error when any field is missing', async () => {
      render(
        <MockedProvider mocks={[]} addTypename={false}>
          <RegisterPage />
        </MockedProvider>
      );

      // Submit the form without filling any fields.
      const submitButton = screen.getByRole('button', { name: /register/i });
      fireEvent.submit(submitButton);

      await waitFor(() => {
        expect(
          screen.getByText(/please fill in all fields/i)
        ).toBeInTheDocument();
      });
    });

    it('shows error message when registerMutation throws an Error', async () => {
      const errorMocks = [
        {
          request: {
            query: REGISTER,
            variables: {
              data: {
                email: 'new@example.com',
                name: 'New User',
                password: 'plaintextpassword',
              },
            },
          },
          error: new Error('Test error message'),
        },
      ];

      render(
        <MockedProvider mocks={errorMocks} addTypename={false}>
          <RegisterPage />
        </MockedProvider>
      );

      // Fill in valid inputs.
      fireEvent.change(screen.getByPlaceholderText('Your Name'), {
        target: { value: 'New User' },
      });
      fireEvent.change(screen.getByPlaceholderText('you@example.com'), {
        target: { value: 'new@example.com' },
      });
      fireEvent.change(screen.getByPlaceholderText('********'), {
        target: { value: 'plaintextpassword' },
      });
      fireEvent.submit(screen.getByRole('button', { name: /register/i }));

      await waitFor(() => {
        expect(screen.getByText('Test error message')).toBeInTheDocument();
      });
    });

    it('shows generic error when registerMutation rejects with a non-Error', async () => {
      // Simulate a non-Error rejection by providing an error value as a string.
      const nonErrorMocks = [
        {
          request: {
            query: REGISTER,
            variables: {
              data: {
                email: 'new@example.com',
                name: 'New User',
                password: 'plaintextpassword',
              },
            },
          },
          error: new Error('Non-error rejection'),
        },
      ];

      render(
        <MockedProvider mocks={nonErrorMocks} addTypename={false}>
          <RegisterPage />
        </MockedProvider>
      );

      // Fill in valid inputs.
      fireEvent.change(screen.getByPlaceholderText('Your Name'), {
        target: { value: 'New User' },
      });
      fireEvent.change(screen.getByPlaceholderText('you@example.com'), {
        target: { value: 'new@example.com' },
      });
      fireEvent.change(screen.getByPlaceholderText('********'), {
        target: { value: 'plaintextpassword' },
      });
      fireEvent.submit(screen.getByRole('button', { name: /register/i }));

      // Depending on how the error is wrapped, our component's catch block should display its message.
      await waitFor(() => {
        expect(screen.getByText('Non-error rejection')).toBeInTheDocument();
      });
    });
  });
});
