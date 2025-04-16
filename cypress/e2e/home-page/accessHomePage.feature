Feature: Access Home Page
  As a user
  I want to visit the home page
  So that I can see or not the main elements and navigate through the site

  Scenario: User is logged out
    Given the user is not logged in
    When the user visits the home page
    Then the login button should be visible
    And the navigation menu should not be visible
    And the home page should display a message inviting the user to log in
