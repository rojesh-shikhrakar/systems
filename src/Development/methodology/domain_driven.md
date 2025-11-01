# Domain Driven Development (DDD)

https://www.domainlanguage.com/

Approach to software design and delivery that centers the project on the domain — the business problem, language, and rules — and uses that domain model to drive the structure of code, teams, and architecture. Domain model is a rich, explicit and selective abstraction model of domain concepts and behavior implemented as code (entities, value objects, aggregates, domain services). A shared vocabulary is created and used by developers and domain experts so code, tests, and conversations use the same terms.

When to use DDD

- Complex business logic or rules that require deep domain understanding, enabling better encapsulation of business rules in code reducing logic scattering and duplication.
- Multiple teams working on different subdomains where language alignment matters.
- Systems that will evolve frequently or need clear boundaries between responsibilities. Clear boundaries reduce coupling and make large systems more maintainable.
- Not ideal for trivial CRUD apps or small utilities where model richness adds unnecessary overhead.

Putting the Domain Model to Work
The Building Blocks of a Model Driven Design
Refactoring Toward Deeper Insight
Strategic Design

- Bounded Contexts: Explicit boundaries within which a particular domain model applies. Different contexts can have different models for the same concepts.
- Context Maps: Diagrams that show the relationships and interactions between different bounded contexts.
- Ubiquitous Language: A shared language between developers and domain experts that is used consistently throughout the project to avoid misunderstandings.
- Aggregates: Clusters of domain objects that are treated as a single unit for data changes. Each aggregate has a root entity that controls access to the other objects.
- Entities: Objects that have a distinct identity that runs through time and different states.
- Value Objects: Objects that are defined by their attributes rather than a unique identity. They are immutable.
- Domain Services: Operations or actions that don't naturally fit within an entity or value object but are part of the domain logic.
- Repositories: Mechanisms for retrieving and storing aggregates, providing an abstraction over data persistence.
- Factories: Objects or methods responsible for creating complex domain objects or aggregates.
Implementing DDD often involves iterative collaboration between developers and domain experts to refine the model and ensure it accurately reflects the business needs.
