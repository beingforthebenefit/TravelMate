// packages/frontend/__tests__/Dashboard.test.tsx
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

import { render, screen } from '@testing-library/react';
import DashboardPage from '@/app/dashboard/page';
import '@testing-library/jest-dom';

describe('DashboardPage', () => {
  it('renders the dashboard heading and itinerary cards', () => {
    render(<DashboardPage />);
    // Check if the heading is present
    const heading = screen.getByRole('heading', { name: /dashboard/i });
    expect(heading).toBeInTheDocument();
    // Check if at least one card is rendered (cards contain 'Trip to' in the title)
    const cardElements = screen.getAllByText(/Trip to/i);
    expect(cardElements.length).toBeGreaterThan(0);
  });
});
