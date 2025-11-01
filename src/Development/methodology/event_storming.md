### Event Storming

Collaborative workshop introduced by Alberto Brandolini as a way to rapidly model business processes and system behavior by exploring complex domains and identifying key events, commands, and aggregates. It’s especially useful in Domain-Driven Design (DDD) and Behavior-Driven Development (BDD) discovery workshops.

Workshop Workflow:

1. Gather a cross-functional team (product owner, developers, domain experts, testers, etc.).

2. Start with a blank wall or digital canvas.

3. Place domain events in <span style="color: Orange;">Orange notes</span> in chronological order.
    - These are key occurrences in the system, written in past tense (e.g., “Order Placed”, “Payment Received”, :Book Added to Catalog”, “User Registered”).
    - They form the backbone of the timeline.

4. Add commands, aggregates, policies, and other elements.

    - Commands on <span style="color: blue;">blue notes</span>: Actions that trigger events (e.g., “Place Order”, "Add Book", "Register User"). Represent user intentions or system operations.
    - Aggregates on <span style="color: purple;">purple notes</span>): Entities that handle commands (**Book** handles "Add Book", **User** handles "Register User) and produce events. Help define boundaries and consistency rules.
    - Policies on <span style="color: gold;">yellow notes</span>: Business rules or automated decisions that react to events. eg: “Send Confirmation Email After Payment”, “Trigger Shipment After Payment Confirmation”
    - Read Models / Queries on <span style="color: green;">green notes</span> : Represent data views or queries needed by users. What users want to see such as “View Book Details”, “View Order History”, "Track Shipment".
    - External Systems on <span style="color: pink;">pink notes</span>: Interfaces or services outside the domain (e.g., payment gateways, shipping providers).

5. Discuss and refine the flow, identifying hotspots and gaps.

    - Hotspots (Red Notes) : Areas of uncertainty, conflict, or risk that need further discussion. eg: “What happens if payment fails?”, “Can users cancel orders after payment?”

6. Use the map to inform architecture, user stories, and test scenarios.
