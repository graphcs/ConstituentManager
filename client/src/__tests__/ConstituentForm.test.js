import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import ConstituentForm from '../components/ConstituentForm';

describe('ConstituentForm', () => {
  it('should submit the form and display success alert', () => {
    // Render the ConstituentForm component
    const { getByLabelText, getByText } = render(<ConstituentForm />);

    // Get form elements
    const emailInput = getByLabelText('Email:');
    const nameInput = getByLabelText('Name:');
    const addressInput = getByLabelText('Address:');
    const submitButton = getByText('Submit');

    // Enter values into form fields
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(nameInput, { target: { value: 'Test User' } });
    fireEvent.change(addressInput, { target: { value: '123 Test St' } });

    // Submit the form
    fireEvent.click(submitButton);

    // Check if success alert is displayed
    expect(window.alert).toHaveBeenCalledWith('Constituent added successfully!');
  });

  it('should display error alert when form submission fails', () => {
    // Render the ConstituentForm component
    const { getByLabelText, getByText } = render(<ConstituentForm />);

    // Get form elements
    const emailInput = getByLabelText('Email:');
    const nameInput = getByLabelText('Name:');
    const addressInput = getByLabelText('Address:');
    const submitButton = getByText('Submit');

    // Enter invalid values into form fields
    fireEvent.change(emailInput, { target: { value: 'invalid-email' } });
    fireEvent.change(nameInput, { target: { value: '' } });

    // Submit the form
    fireEvent.click(submitButton);

    // Check if error alert is displayed
    expect(window.alert).toHaveBeenCalledWith('Error adding constituent. Please try again.');
  });
});
