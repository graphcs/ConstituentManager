import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Axios from 'axios';
import ConstituentForm from '../components/ConstituentForm';

jest.mock('axios');

describe('ConstituentForm', () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  beforeEach(() => {
    Axios.post.mockClear();
  });

  it('submits form with valid data', async () => {
    const { getByLabelText, getByText } = render(<ConstituentForm />);
    fireEvent.change(getByLabelText(/Email:/i), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText(/Name:/i), { target: { value: 'Test User' } });
    fireEvent.change(getByLabelText(/Address:/i), { target: { value: '123 Test St' } });

    Axios.post.mockResolvedValue({ data: { message: 'Constituent added successfully!' } });

    fireEvent.click(getByText(/Submit/i));

    await waitFor(() => {
      expect(Axios.post).toHaveBeenCalledWith(`${apiUrl}/api/constituents`, {
        email: 'test@example.com',
        name: 'Test User',
        address: '123 Test St',
      });
    });
  });

  it('does not submit form with invalid data', async () => {
    const { getByLabelText, getByText } = render(<ConstituentForm />);
    fireEvent.change(getByLabelText(/Email:/i), { target: { value: '' } });
    fireEvent.change(getByLabelText(/Name:/i), { target: { value: '' } });
    fireEvent.change(getByLabelText(/Address:/i), { target: { value: '' } });

    fireEvent.click(getByText(/Submit/i));

    await waitFor(() => {
      expect(Axios.post).not.toHaveBeenCalled();
    });
  });
});
