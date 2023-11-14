Feature: Validate rudder stack login feature using api calls

  Scenario: As a user, I am able to access rudderstack account using login service
    Given I call the rudderstack login service with valid login details
    Then I should see response statusCode as 200
    Then I should validate the response body

  Scenario Outline: As a user, I should not login with invalid details
    Given I call the rudderstack login service using invalid <email> and <password>
    Then I should see response statusCode as <status>
    Then I should validate the response as <message>

    Examples: 
      | email               | password | message                           | status |
      | test@test.com       |   123456 | Unable to initiate authentication |    500 |
      | mpavan531@gmail.com |    98712 | Incorrect username or password.   |    400 |
      | mpavan531@gmail.com |          | Password is missing               |    400 |
      |                     |    12345 | Email is missing                  |    400 |
