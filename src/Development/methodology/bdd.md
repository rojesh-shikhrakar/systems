# Behavior Driven Development (BDD)

Behavior-driven development was introduced by [Daniel Terhorst-North](http://dannorth.net/introducing-bdd/) evolved from Test-Driven Development (TDD). BDD does not replace your existing agile process or Test Driven Development, it enhances it by adding practices that improve communication and collaboration.

BDD is software development process that emphasizes collaboration between developers, QA, and non-technical stakeholders to define application behavior through examples in plain language following a set of rules called Gherkin.

This shared understanding helps ensure the software meets business requirements.

It also enables team working in rapid, small iterations to increase feedback and and do only the minimal work necessary to meet those needs. It encourages to break down your user's problems into small pieces of values (similar to User Stories in Agile) that are worked on small iterations.

A nice side effect of BDD is that the system documentation and automated tests are produced in the process.

## BDD Process

BDD activity is a simple three sequential stepped iterative process:

![BDD practices: Discovery, Formulation and Automation](https://cucumber.io/img/docs/bdd-practices-diagram.png)

### 1. Discovery - "What it could do"

Take a small upcoming feature or user story just before development and discuss and refine the desired behavior using concrete examples of the new functionality to explore, discover and agree on the details of what's expected to be done with the team and stakeholders (Three Amigos: *Product Owner* - identify problem & scope, *Developer* - add details & solution steps, and *Tester* - address any edge cases ).

> The hardest single part of building a software system is deciding precisely what to build.
> -- Fred Brooks, The Mythical Man Month

**Discovery Workshop** (20-30 min per story) for structured conversations about the desired behavior for a *User Story* that focus around real-world examples of the system from user's perspective. This grows teams understanding of the needs of the users, of the rules that govern how the system should function, of the scope of what needs to be done, and may even reveal gaps in our understanding. BDD helps teams to have the right conversations at the right time so you minimize the amount of time spent in meetings and maximizing the amount of valuable code you produce.

<details>
<summary>Workshop Activities</summary>

- {{#include example_mapping.md}}
- {{#include event_storming.md}}
- {{#include OOPSI_mapping.md}}
- {{#include feature_mapping.md}}

</details>

### Formulation - "What it should do"

Write executable specifications in Gherkin syntax that describe the desired behavior of the system in a way that can be automated and check for agreement. This is the shared language for talking about the system.

- Gherkin is a business-readable, domain-specific language that lets you describe software's behavior without detailing how that functionality is implemented. Gherkin serves two purposes: 1) It is your project's documentation; 2) It is your project's automated tests.
  - "Given/When/Then" template (evolved from user stories "As a ..., I ..., so that ...") is used to capture a story's acceptance criteria in an executable form.

### 3. Automation - "What it actually does"

Implement the behavior described by each documented example, starting with an automated test based on the specifications to guide the development of the code and to validate the system's behavior.

- Write Automated Tests that verify the behavior of the system matches the specifications. These tests serve as living documentation and regression tests to ensure that the system continues to meet the desired behavior as it evolves.
- Initially test fails and we implement the minimum code necessary to make the test pass. Once the test passes, we can refactor the code while ensuring that the behavior remains intact. The automated examples work like guide-rails, helping us to keep our development work on track.

This rapid, repeatable feedback reduces the burden of manual regression testing, freeing people up to do more interesting work, like exploratory testing.

## Gherkin Syntax

Gherkin is line-oriented language with a set of grammar rules. Gherkin enables us to write unambiguous executable specification that can be automated testing using Cucumber while documenting how the system actually behaves. The grammar exist in different flavors for different spoken languages (supports over 70 languages, even Nepali).

Gherkin documents are stored in `.feature` text files and are typically versioned in source control alongside the software.

Each line called step and starts with keyword optionally followed by a colon (:) and end of the terminals with a stop. Tab or space are used for the indentation. The trailing portion (after the keyword) of each step is matched to a code block, called a step definition.

Primary Keywords

- `Feature` : Describes a high-level functionality
- `Example` (or `Scenario`): Represents a specific behavior or test case, a concrete example
- Steps in a scenario
  - `Given`: Sets up the initial context (scene) a known state, a precondition for use cases
  - `When`: Describes an action or event, person interacting with the system or event triggered by another system
  - `Then`: Specifies the expected outcome or result (observable to users), uses an assertion to compare the actual outcome (what system actually does) with the expected outcome (what the step says the system is supposed to do)
  - `And`, `But` (or `*`): Used to add multiple steps or conditions
- `Rule`: (Optional) Groups scenarios under one business rule that should be implemented
- `Background`: Shared setup (`Given`) steps for multiple scenarios, can only have one set of background for Feature or Rule
- `Scenario Outline` (or `Scenario Template`): Allows steps with `<>` delimited parameter that reference headers in examples table
  - `Examples` (or `Scenarios`): example table for scenario outline

Free-form text descriptions can be added underneath `Feature`, `Example`/`Scenario`, `Background`, `Scenario Outline` and `Rule`.

Secondary Keywords

- `"""` (Doc Strings): Multi-line text input for steps, three double-quote marks starts on a new line, can annotate docstrings with type of content
- `|` (Data Tables): Structured data input for Scenario Outline example table
- `@` (Tags)
- `#` (Comments) : should always be in a new line

```gherkin
# language: en
@regression @login
Feature: User Authentication

  This feature describes the login functionality for registered users.

  Background:
    Given the application is running
    And the database is seeded with test users

  Rule: Only registered users can log in
    # can be written as Example or Scenario
    Example: Successful login with valid credentials
      Given a user exists with username "jdoe" and password "secure123"
      When the user logs in with username "jdoe" and password "secure123"
      Then the user should be redirected to the dashboard
      And a welcome message should be displayed

    Example: Failed login with invalid credentials
      Given a user exists with username "jdoe" and password "secure123"
      When the user logs in with username "jdoe" and password "wrongpass"
      Then an error message should be shown
      But the user should remain on the login page

  Rule: Password reset functionality

    Background:
      Given the user navigates to the "Forgot Password" page

    Example: Reset password with valid email
      Given the user enters their registered email "jdoe@example.com"
      When the user submits the password reset form
      Then a reset link should be sent to "jdoe@example.com"

  Scenario Outline: Login attempts with various credentials
    Given a user exists with username "<username>" and password "<password>"
    When the user logs in with username "<username>" and password "<attempted_password>"
    Then the login result should be "<result>"

    Examples:
      | username | password   | attempted_password | result         |
      | jdoe     | secure123  | secure123          | success        |
      | jdoe     | secure123  | wrongpass          | failure        |

  Scenario: View user profile with data table
    Given the following user exists:
      | username | email             | role     |
      | jdoe     | jdoe@example.com  | standard |
    When the user logs in with username "jdoe" and password "secure123"
    Then the profile page should display:
      | field    | value            |
      | username | jdoe             |
      | email    | jdoe@example.com |
      | role     | standard         |

  Scenario: Submit feedback with doc string
    Given the user is logged in
    When the user submits feedback with the message:
      """markdown
      # Feedback
      I really enjoy using this app.
      The interface is clean and intuitive.
      Keep up the great work!
      """
    Then the feedback should be recorded successfully

```

A simpler example

```gherkin
Feature: User Registration
  
  Scenario: Successful registration with valid details
    Given the user is on the registration page
    When the user enters a valid username, email, and password
    And the user clicks the register button
    Then the user should be redirected to the welcome page
    And the user should see a registration confirmation message

  Scenario: Unsuccessful registration with invalid email
    Given the user is on the registration page
    When the user enters a valid username and password, but an invalid email address
    And the user clicks the register button
    Then the user should see an error message indicating an invalid email

  Scenario: Unsuccessful registration with missing fields
    Given the user is on the registration page
    When the user leaves the username and email fields blank
    And the user clicks the register button
    Then the user should see a validation error message indicating required fields
```

Try writing Gherkin with following examples:

- User Login: A user logs in with valid and invalid credentials.
- Shopping Cart: Adding and removing items from a cart.
- Search Functionality: Searching for a product and verifying results.
- Form Submission: Filling out and submitting a contact form.
- Booking System: Booking a hotel room or flight with different options.

### Gherkin Best Practices

- Keep scenarios concise (3–5 steps recommended) to maintain the expressive power of documentation.
- Use vivid, short, meaningful names and descriptions.
- Avoid technical details in step text—focus on behavior.
- Prefer observable outcomes over internal system states.

## Cucumber

[Cucumber](https://cucumber.io/docs/) reads executable specification written in plain text with set of grammar rules (Gherkin) and validates that the software does what those specifications say. The specifications consist of multiple examples, or scenarios. Each scenario is a list of steps for Cucumber to work through. Cucumber verifies that the software conforms with the specification and generates a report indicating ✅ success or ❌ failure for each scenario.

Step definitions connect Gherkin steps to programming code. A step definition carries out the action that should be performed by the step. So step definitions hard-wire the specification to the implementation.

Cucumber is available for most mainstream programming languages.

Projects often start with all step definitions in a single file. Regardless of the directory structure employed, Cucumber effectively flattens the `features/` directory tree when running tests and treats as a step. It is recommend to create a separate `*_steps.ext` or `*StepDefinitions.java`  file for each domain concept for a large project to improve maintainability.

- Avoid Unused Steps: Only implement steps that appear in scenarios.
- Prevent Duplication: Use helper methods to abstract similar steps. eg: Consolidate steps like “Given I go to the home page”, "... about page" into a single reusable method  "Given I go to the {} page".

### Cucumber for Python

There are two semi-official libraries: [behave](https://behave.readthedocs.io/en/latest/) and [pytest-bdd](https://github.com/pytest-dev/pytest-bdd)

Here's an example with `behave`

`pip install behave`

Behave operates on directories containing

1. **Features**: Make a directory called `features/` and create files for features `example.feature`:

    ```gherkin
    Feature: Showing off behave

      Scenario: Run a simple test
        Given we have behave installed
        When we implement 5 tests
        Then behave will test them for us!
    ```

2. Steps directory with **Python implementation**: Create step files `features/steps/example_steps.py`

    ```python
    from behave import given, when, then, step

    @given('we have behave installed')
    def step_impl(context):
        pass

    @when('we implement {number:d} tests')
    def step_impl(context, number):  # NOTE: number is converted into integer
        assert number > 1 or number == 0
        context.tests_count = number

    @then('behave will test them for us!')
    def step_impl(context):
        assert context.failed is False
        assert context.tests_count >= 0
    ```

Run behave:  `$behave`
