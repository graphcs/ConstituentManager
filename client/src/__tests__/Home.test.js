import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Home from '../components/Home';

describe('Home', () => {
  it('should sort constituents in ascending order when sort button is clicked', () => {
    // Render the Home component
    const { getByText } = render(<Home />);

    // Get the sort button
    const sortButton = getByText('Sort A-Z');

    // Click the sort button
    fireEvent.click(sortButton);

    // Get the table rows
    const tableRows = document.querySelectorAll('tbody tr');

    // Check if the constituents are sorted in ascending order
    let previousName = '';
    tableRows.forEach((row) => {
      const nameCell = row.querySelector('td:nth-child(1)');
      const name = nameCell.textContent;
      expect(name).toBeGreaterThanOrEqual(previousName);
      previousName = name;
    });
  });

  it('should sort constituents in descending order when sort button is clicked twice', () => {
    // Render the Home component
    const { getByText } = render(<Home />);

    // Get the sort button
    const sortButton = getByText('Sort A-Z');

    // Click the sort button twice
    fireEvent.click(sortButton);
    fireEvent.click(sortButton);

    // Get the table rows
    const tableRows = document.querySelectorAll('tbody tr');

    // Check if the constituents are sorted in descending order
    let previousName = '';
    tableRows.forEach((row) => {
      const nameCell = row.querySelector('td:nth-child(1)');
      const name = nameCell.textContent;
      expect(name).toBeLessThanOrEqual(previousName);
      previousName = name;
    });
  });

  it('should filter constituents based on search term', () => {
    // Render the Home component
    const { getByLabelText, getByText } = render(<Home />);

    // Get the search input field
    const searchInput = getByLabelText('Search constituents');

    // Enter a search term
    fireEvent.change(searchInput, { target: { value: 'John' } });

    // Get the table rows
    const tableRows = document.querySelectorAll('tbody tr');

    // Check if the filtered constituents are displayed correctly
    tableRows.forEach((row) => {
      const nameCell = row.querySelector('td:nth-child(1)');
      const name = nameCell.textContent;
      expect(name.toLowerCase()).toContain('john');
    });
  });
});
