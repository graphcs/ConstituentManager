import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import userEvent from '@testing-library/user-event';

test('navigates to home page correctly', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const homeLink = screen.getByRole('link', { name: /home/i });
  userEvent.click(homeLink);
  expect(screen.getByText(/Welcome to Constituent Management System/i)).toBeInTheDocument();
});

test('navigates to add constituent page correctly', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const addConstituentLink = screen.getByRole('link', { name: /add constituent/i });
  userEvent.click(addConstituentLink);
  expect(screen.getByLabelText(/Email:/i)).toBeInTheDocument();
});

test('navigates to check duplicates page correctly', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const checkDuplicatesLink = screen.getByRole('link', { name: /merge duplicates/i });
  userEvent.click(checkDuplicatesLink);
  expect(screen.getByText(/Duplicate Checker/i)).toBeInTheDocument();
});

test('navigates to export CSV page correctly', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  const exportCsvLink = screen.getByRole('link', { name: /export csv/i });
  userEvent.click(exportCsvLink);
  expect(screen.getByText(/CSV Generator/i)).toBeInTheDocument();
});
