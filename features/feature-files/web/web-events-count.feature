Feature: As a customer, I should be able to see the number of events passed and failed in destination

  Scenario Outline: Verify as a user, I want to create connection between source and destination
    Given I login with valid details
    When I skip Add an extra layer of security page
    Then I should be on Connection page
    When I naviagete to <destinationName> destination events page
    Then I should valid the Delivered count for destination events

    Examples: 
      | sourceName | destinationName |
      | sourceDemo | destinationDemo |
