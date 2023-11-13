Feature: Create new connection between source and destination

  Scenario Outline: Verify customer should not login with invalid login details
    Given I login with invalid <email> and <password> details
    Then I should be on Login page
    Then I should see Wrong email or password. error on login page

    Examples: 
      | email         | password |
      | test@tset.com | pass     |

  Scenario Outline: Verify as a user, I want to create connection between source and destination
    Given I login with valid email and password details
    When I skip Add an extra layer of security page
    Then I should be on Connection page
    When I click on <sourceName> source from the list
    Then I should be on Destination page
    Then I will create connection between <sourceName> and <destinationName> when there is no connection

    Examples: 
      | sourceName | destinationName | 
      | sourceDemo | destinationDemo |
