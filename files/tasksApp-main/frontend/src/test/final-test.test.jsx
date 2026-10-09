import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// A minimal component for testing
const TestComponent = () => {
  return <div>Test Component Works</div>;
};

describe('Final Test', () => {
  it('renders the test component', () => {
    render(<TestComponent />);
    expect(screen.getByText('Test Component Works')).toBeInTheDocument();
  });
});
