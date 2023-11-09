Feature: Validate rudder stack login feature using api calls

  Scenario: As a user, I am able to access rudderstack account using login service
    Given I call the rudderstack login service with valid login details
    When I should see response statusCode as 200
    Then I should validate the response body

  Scenario Outline: As a user, I should not login with invalid details
    Given I call the rudderstack login service using invalid <type>
    When I should see response statusCode as <status>
    Then I should validate the response as <message>

    Examples: 
      | type           | message                           | status |
      | email          | Unable to initiate authentication |    500 |
      | password       | Incorrect username or password.   |    400 |
      | empty password | Password is missing               |    400 |
      | empty email    | Email is missing                  |    400 |