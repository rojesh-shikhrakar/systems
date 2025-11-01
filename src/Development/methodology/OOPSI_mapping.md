### OOPSI Mapping (Outcomes, Outputs, Process, Scenarios, Inputs)

OOPSI Mapping is a collaborative technique used in BDD Discovery workshops to break down user stories by exploring the flow of value from business goals to system behavior.

OOPSI Mapping Steps

1. Outcomes: Why are we doing this?
    - Define the business value or goals or user needs the feature aims to fulfill.
    - Use tools like Impact Mapping or user stories to define desired results
    - Example: “As a customer, I want to track my order so that I know when it will arrive.”

2. Outputs: What will be delivered?
    - Tangible results or deliverables that support the outcome.
    - Use real-world examples and mockups to clarify outputs.
    - Example: “Order confirmation email”, “Updated order history page”.

3. Process: What steps are involved?
    - High-level interaction, workflow or system behavior that connects inputs to outputs.
    - Techniques like Story Mapping or Event Storming help visualize steps
    - Example: “User adds item to cart → enters payment info → receives confirmation”.

4. Scenarios: What behaviors should we test?
    - Concrete examples of how the system should behave in different situations.
    - Brainstorm paths or rules through the process.
    - Use tables of examples to clarify behavior and support Gherkin scenarios.
    - Example: “Given a valid credit card, when the user submits payment, then the order is confirmed.”

5. Inputs: What triggers the process?
    - Define preconditions, events, data, or user actions that initiate the process.
    - Collaborate around example tables to spot gaps and dragons (hidden complexities).
    - Example: “User clicks ‘Buy Now’”, “Payment details submitted”.

[BDD Discovery and OOPSI](https://jennyjmar.com/2016/04/16/bdd-discovery-and-oopsi/)
