jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginPage from '@/app/auth/login/page';
import { ApolloProvider } from '@apollo/client';
import client from '@/lib/apollo-client';
import '@testing-library/jest-dom';

describe('LoginPage', () => {
  it('renders the login form and submits', async () => {
    render(
      <ApolloProvider client={client}>
        <LoginPage />
      </ApolloProvider>
    );
    // Ensure the email and password fields are rendered
    const emailInput = screen.getByPlaceholderText('you@example.com');
    const passwordInput = screen.getByPlaceholderText('********');
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();

    // Simulate user input
    fireEvent.change(emailInput, { target: { value: 'test@travelmate.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });

    const submitButton = screen.getByRole('button', { name: /login/i });
    expect(submitButton).toBeInTheDocument();

    // Simulate form submission
    fireEvent.submit(submitButton);

    // Wait for the loading state or any post-submit indicator
    await waitFor(() => {
      expect(screen.getByText(/logging in/i)).toBeInTheDocument();
    });
  });
});
