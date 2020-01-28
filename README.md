# Preamble
In this challenge, the applicant will use the Angular CLI to generate a project, then design a simple time tracking application. The test is designed to take 3-5 hours for an intermediate level Angular developer.

# Instructions
1) If you do not already have a GitHub account, create one.

2) Fork this repository, clone the fork to your computer, open a command prompt, then CD to the repo folder.

3) Using the Angular CLI, generate a new project with the following settings:
  Project name: blcchallenge
  Use Routing: Yes
  CSS Style: SCSS
  
 4) Create an application that meets the acceptance criteria of the below user story.
 
 5) Create 3 to 5 unit, integration, or e2e tests beyond the Angular generated ones. Code coverage is not a concern.
 
 6) When complete, submit a pull request to merge into this repository.
 
# User Story
As a manager, I need to be able to add, edit, and delete a collection of employees:

* Employee
  * Id: number
  * FirstName: string (alphabetical only, max 25 chars)
  * LastName: string (alphabetical only, max 40 chars)
  * Email: string (email format required, max 256 chars)
  
I will then need to be able to add, edit, and delete an unlimited number of "punches" to each employee. Schema:

* EmployeePunch
  * Id: number
  * Employee: Employee
  * StartTime: Date
  * EndTime: Date

I should not be able to enter a StartTime for a punch that is before a previous punch's EndTime, and the StartTime must come before the punch's EndTime. 

Validation messages should be shown to the user in an appropriate place.

There is no server for this application, but the data should persist if I close and reopen the browser.

# Restrictions & Acceptance Criteria
The actual implementation and interface for the user story is intentionally vague and the submitted pull request should be considered a rough prototype, meant for refinement through an interative process. The number of pages/routes in the application is not important, but the application should be heavily component based, applying strong SOLID principles.

All internet resources are available for reference. In a followup interview, there will be questions to determine if the applicant wrote the code themselves and truly understands the logic flow. There may also be "what if" questions about how the applicant would deal with hypothetical blockers.

Use of third party Angular libraries or components is allowed and encouraged.

Documentation does not need to be extensive as this is just a prototype. However, inline comments clarifying potentially confusing code for other developers is strongly encouraged.

For questions or clarification, create an issue in this repository.
