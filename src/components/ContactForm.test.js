import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ContactForm from "./ContactForm";

test("renders without errors", () => {
  render(<ContactForm />);
});

test("renders the contact form header", () => {
  render(<ContactForm />);
  const header = screen.getByText(/Contact Form/i);
  expect(header).toBeInTheDocument();
});

test("renders ONE error message if user enters less then 5 characters into firstname.", async () => {
  render(<ContactForm />);
  const name = screen.getByLabelText(/first Name/i);
  userEvent.type(name, "a");
  const error = screen.getByTestId("error");
  expect(error).toHaveTextContent(
    "Error: firstName must have at least 5 characters."
  );
});

test("renders THREE error messages if user enters no values into any fields.", async () => {
  render(<ContactForm />);
  userEvent.click(screen.getByRole("button"));
  const error = screen.queryAllByTestId("error");
  expect(error[0]).toHaveTextContent(
    "Error: firstName must have at least 5 characters."
  );
  expect(error[1]).toHaveTextContent("Error: lastName is a required field.");
  expect(error[2]).toHaveTextContent(
    "Error: email must be a valid email address."
  );
});

test("renders ONE error message if user enters a valid first name and last name but no email.", async () => {
  render(<ContactForm />);
  const name = screen.getByLabelText(/first Name/i);
  userEvent.type(name, "Jeremy");

  const lastName = screen.getByLabelText(/last Name/i);
  userEvent.type(lastName, "McCully");

  const error = screen.queryAllByTestId("error");
  expect(error.length == 1);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
  render(<ContactForm />);
  const name = screen.getByLabelText(/email/i);
  userEvent.type(name, "Bob");
  const error = screen.getByTestId("error");
  expect(error).toHaveTextContent(
    "Error: email must be a valid email address."
  );
});

test('renders "lastName is a required field" if a last name is not entered and the submit button is clicked', async () => {
  render(<ContactForm />);
  userEvent.click(screen.getByRole("button"));
  const name = screen.getByLabelText(/last name/i);
  const error = screen.queryAllByTestId("error");
  expect(error[1]).toHaveTextContent("Error: lastName is a required field.");
});

test("renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.", async () => {
  render(<ContactForm />);
  const name = screen.getByLabelText(/first Name/i);
  userEvent.type(name, "Jeremy");

  const lastName = screen.getByLabelText(/last Name/i);
  userEvent.type(lastName, "McCully");

  const email = screen.getByLabelText(/email/i);
  userEvent.type(email, "jmccully85@yahoo.com");

  //   const msg = screen.getByLabelText(/Message/i);
  //   userEvent.type(msg, "HUH");

  userEvent.click(screen.getByRole("button"));

  const testFirst = screen.getByTestId("firstnameDisplay");
  expect(testFirst).toHaveTextContent("First Name: Jeremy");

  const testLast = screen.getByTestId("lastnameDisplay");
  expect(testLast).toHaveTextContent("Last Name: McCully");

  const testEmail = screen.getByTestId("emailDisplay");
  expect(testEmail).toHaveTextContent("Email: jmccully85@yahoo.com");

  //   expect(screen.queryByTestId("messageDisplay")).not.toBeInTheDocument;

  const message = screen.getByLabelText(/message/i);
  userEvent.type(message, "This is for Jeremy McCully");

  const testMessage = screen.getByTestId("messageDisplay");
  expect(testMessage).toHaveTextContent("This is for Jeremy McCully");
});

test("renders all fields text when all fields are submitted.", async () => {
  render(<ContactForm />);
  const name = screen.getByLabelText(/first Name/i);
  userEvent.type(name, "Jeremy");

  const lastName = screen.getByLabelText(/last Name/i);
  userEvent.type(lastName, "McCully");

  const email = screen.getByLabelText(/email/i);
  userEvent.type(email, "jmccully85@yahoo.com");

  const message = screen.getByLabelText(/message/i);
  userEvent.type(message, "This is for Jeremy McCully");

  userEvent.click(screen.getByRole("button"));

  const testFirst = screen.getByTestId("firstnameDisplay");
  expect(testFirst).toHaveTextContent("First Name: Jeremy");

  const testLast = screen.getByTestId("lastnameDisplay");
  expect(testLast).toHaveTextContent("Last Name: McCully");

  const testEmail = screen.getByTestId("emailDisplay");
  expect(testEmail).toHaveTextContent("Email: jmccully85@yahoo.com");

  const testMessage = screen.getByTestId("messageDisplay");
  expect(testMessage).toHaveTextContent("This is for Jeremy McCully");
});
