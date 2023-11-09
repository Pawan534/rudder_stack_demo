Feature: Create new connection between source and destination

  Scenario Outline: Verify customer should not login with invalid login details
    Given I login with invalid details
    Then I should be on Login page
    Then I should see Wrong email or password. error on login page

  Scenario Outline: Verify as a user, I want to create connection between source and destination
    Given I login with valid details
    When I skip Add an extra layer of security page
    Then I should be on Connection page
    When I click on <sourceName> source from the list
    Then I should be on <sourceName> page
    Then I will create connection between <sourceName> and <destinationName> when there is no connection

    Examples: 
      | sourceName | destinationName |
      | sourceDemo | destinationDemo |
