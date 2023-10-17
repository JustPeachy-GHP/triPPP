import React from "react";
import Login from "../Features/Auth/Login";
import { render } from "@testing-library/react";
// cypress/integration/login_spec.js

describe("Login Functionality", () => {
  it("renders without errors", () => {
    render(<Login />);
  });

  it("logs in with valid credentials", () => {
    cy.visit("/login");

    // Enter valid email and password
    cy.get("#username").type("joe@example.com");
    cy.get("#password").type("password1");

    // Submit the form
    cy.get("form").submit();

    cy.url().should("include", "/userlanding");
  });

  it("displays an error message for invalid credentials", () => {
    cy.visit("/login");

    cy.get("#username").type("invalid@example.com");
    cy.get("#password").type("invalid_password");

    // Submit the form
    cy.get("form").submit();

    cy.get(".loginform p").should("include.text", "Something went wrong!");
  });
});
