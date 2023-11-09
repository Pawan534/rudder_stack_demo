Feature: Verify customer able to post the event and track event via api

  Scenario: Verify customer able to post the event using an identify endpoint
    Given I publish the identify event
     When I should see response statusCode as 200
     Then I should validate the response as OK
  
  Scenario: Verify customer able to track the event using an track endpoint
    Given I want to track the events using service call
     When I should see response statusCode as 200
     Then I should validate the response as OK
     

     
