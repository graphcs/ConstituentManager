import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../components/Home';

describe('Home Component', () => {
  it('renders correctly', () => {
    render(<Home />);
    expect(screen.getByText(/Welcome to Constituent Management System/i)).toBeInTheDocument();
  });

  it('includes navigation link to home', () => {
    render(<Home />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
  });

  it('includes navigation link to add constituent', () => {
    render(<Home />);
    const addConstituentLink = screen.getByRole('link', { name: /add constituent/i });
    expect(addConstituentLink).toBeInTheDocument();
  });

  it('includes navigation link to merge duplicates', () => {
    render(<Home />);
    const mergeDuplicatesLink = screen.getByRole('link', { name: /merge duplicates/i });
    expect(mergeDuplicatesLink).toBeInTheDocument();
  });

  it('includes navigation link to export CSV', () => {
    render(<Home />);
    const exportCsvLink = screen.getByRole('link', { name: /export csv/i });
    expect(exportCsvLink).toBeInTheDocument();
  });
});
