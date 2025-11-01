### Feature Mapping

Feature Mapping bridges the gap between business goals, user stories, and test scenarios. It’s often used after techniques like Event Storming or OOPSI Mapping to refine and prioritize features for delivery.

A typical Feature Map is organized into three vertical columns:

- User Stories (Left Column) : High-level features or capabilities from the user’s perspective. Example: “As a customer, I want to track my order so I know when it will arrive.”
- Rules (Middle Column): Acceptance criteria or business rules that define when the story is complete. Example: “Only logged-in users can track orders.”
- Examples (Right Column): Concrete scenarios that illustrate the rules. These become BDD test cases. Example: “Given I am logged in, when I view my order, then I see the tracking number.”

Session Workflow:

1. Define a feature or User Story, or pick one from the backlog to explore.
    - e.g. Feature: Teachers can return bad essays to be corrected : "In order to allow students to learn from their mistakes, As a teacher marking student essays, I want to be able to return an essay to a student for corrections when the marks are poor"
2. Identify actors who interact with the system are involved in the story
    - e.g. student and teacher
3. Break the feature into tasks to identify the main flows
    - Map out key steps the actors take to achieve the goal
    - e.g. student submit essay, teacher open essay, teacher record marks for essay category, teacher return for correction, teacher saves the final results.
4. Create examples that illustrates a principle or variant flows.
    - e.g. example of good essay (someone got 8 in every category) vs poor essay (someone got 4 in spelling needs basic correction)
5. Add Rules
    - Define business rules that explain or constrain the examples
    - e.g. “Return essay if any mark is below 6”
6. Ask Questions
    - Ask questions like "But what if...", "what else could lead to this outcome", "what other outcomes might happen",to capture uncertainties or edge cases that need clarification and use the answers to create new examples. Use rules to explain and give context to your examples
    - e.g., “What if all marks are below 4?”
7. Include Consequences
    - Show expected outcomes for each example
    - e.g., essay appears in student’s correction list
8. Handle Negative Scenarios
    - Add counter-examples to test boundaries and ensure robustness.
    - e.g. Marks 9 in all categories, but teacher1 tries to return it, this is not allowed.
9. Add Details
    - Include error messages, data variations, or UI notes as needed.
10. Automate Executable Specifications
    - Translate examples into BDD scenarios using tools like Cucumber or Serenity or ScreenPlay in JUnit.
    - e.g.

    ```gherkin
    Scenario: Returning an essay to the student for correction
    A teacher can return an essay to the student to be corrected if any mark is 6 or less

    Given that Stuart has submitted an essay on 'Politics 101' to be marked
    And that Tess has opened the essay
    When Tess records the following marks:
    | Spelling | Reasoning | Relevance |
    | 6        | 6         | 6         |
    And Tess returns the essay to Stuart to be corrected
    Then Stuart should the 'Politics 101' essay in his Pending Correction list
    ```

Rinse and repeat for other rules and examples

![Feature Mapping Process](https://johnfergusonsmart.com/wp-content/uploads/2017/01/cycle-1024x674.png)

[Feature Mapping](https://johnfergusonsmart.com/feature-mapping-a-simpler-path-from-stories-to-executable-acceptance-criteria/)
