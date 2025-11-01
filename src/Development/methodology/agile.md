# Agile Software Development

Adaptive, people-centered approach (a philosophy) that delivers working software in short, timeboxed increments and emphasizes collaboration, continuous feedback, and responding to change over following a fixed plan.

[Agile Manifesto](https://agilemanifesto.org/) express four key values and tweleve guiding principles to uncover better ways of developing software.

### Agile Manifesto Values

<details>
<summary>
1. Individuals and interactions over processes and tools
</summary>

- Empowered cross-functional teams
  - Implementation: form stable teams with all skills (frontend, backend, QA, UX, DevOps, product) and give them end-to-end responsibility for features. Assign a clear product owner and a facilitator (Scrum Master or flow coach) but avoid top-down tasking.
  - Practices & tools: shared sprint goals; team-level backlog; rotating or shared on-call; autonomy over technical choices; team-based KPIs like cycle time and team velocity.
  - Metrics and signals: team lead time, mean time to restore, sprint predictability, happiness/engagement surveys.
  - Pitfalls to avoid: siloed specialists, managers assigning tasks directly to developers, diffused ownership.
- open (face-to-face) communication and collaboration
  - Implementation: prioritize synchronous conversations for design and ambiguity-heavy topics (in-person or video); use short design workshops and whiteboard sessions instead of long documents.
  - Practices & tools: brainstorms, backlog refinement sessions, pair-design, shared collaborative boards (Miro/Visio), clear meeting norms (timebox, agenda).
  - Metrics and signals: reduced rework after design, faster decisions, clearer acceptance criteria.
  - Pitfalls to avoid: over-reliance on meetings for trivial coordination; poor meeting facilitation.
- short feedback loops
  - Implementation: deliver small increments frequently and get immediate feedback from users, QA, and monitoring. Embed fast feedback in the pipeline (build → test → deploy → observe).
  - Practices & tools: CI fast builds, short demo cycles, feature flags for incremental release, in-app feedback tools, canary releases.
  - Metrics and signals: lead time for changes, time-to-feedback, percentage of changes rolled back.
  - Pitfalls to avoid: large monolithic releases; long manual test cycles that delay feedback.
- pairing and mobbing
  - Implementation: use pair programming for high-risk or knowledge-critical tasks; mob programming for complex design or onboarding sessions. Schedule pairs/mobs deliberately and rotate participants.
  - Practices & tools: shared IDEs, remote pairing tools (VS Live Share), clear session goals, short timeboxes, role rotation (driver/navigator).
  - Metrics and signals: fewer defects, faster knowledge spread, reduced bus factor.
  - Pitfalls to avoid: pairing without purpose, cognitive overload from too-long sessions.
- working agreements that favor collaboration over heavy processes enforcement
  - Implementation: co-create team norms (definition of done, code review rules, WIP limits, meeting etiquette) and surface them in a visible team charter. Update them during retrospectives.
  - Practices & tools: short team charter, regular retros, public agreement board, escalation path for conflicts.
  - Metrics and signals: adherence to DoD, reduced blockers, improved retrospective action completion.
  - Pitfalls to avoid: rigid rules that block context-driven exceptions; agreements owned by managers instead of the team.

</details>
<details>
<summary>
2. Working software over comprehensive documentation
</summary>

- Demos at the end of each iteration
  - Implementation: timebox a demo session where the team shows working features to stakeholders; make demos for outcomes (user scenarios) not internal tasks. Capture feedback and convert it into backlog items.
  - Practices & tools: scripted user scenarios, recording demos for absent stakeholders, acceptance criteria mapped to demo steps.
  - Metrics and signals: stakeholder approval rate, number of feedback items per demo, demo participation.
  - Pitfalls to avoid: demos that show incomplete work or become slide-heavy status reports.
- Minimum just-in-time documentation as living part of the codebase
  - Implementation: keep docs close to code (README, architecture decision records, inline comments, API docs generated from code), and update them as part of the definition of done. Prefer concise, example-driven docs.
  - Practices & tools: ADRs for key decisions, OpenAPI/Swagger for APIs, doc-as-code workflows, examples and playbooks in repo.
  - Metrics and signals: documentation update rate tied to PRs, reduced onboarding time.
  - Pitfalls to avoid: stale docs, dumping everything into a single giant document, treating docs as optional.
- CI/CD pipelines that produce deployable increments
  - Implementation: automate build, test, and deploy so every merge can produce a deployable artifact. Use trunk-based development or short-lived branches and feature flags to decouple deployment from release.
  - Practices & tools: pipeline-as-code, automated smoke and integration tests, canary or blue/green deployments.
  - Metrics and signals: build success rate, deployment frequency, lead time for changes.
  - Pitfalls to avoid: long-running pipelines with manual gates, privileged manual steps that block flow.
- Automated tests to ensure quality and support refactoring
  - Implementation: test pyramid with fast unit tests, reliable integration tests, and targeted end-to-end tests; maintain tests as first-class artifacts and run them in CI. Use test-driven or example-driven approaches where helpful.
  - Practices & tools: TDD or golden-file tests for APIs, contract tests for services, mutation testing to judge test effectiveness.
  - Metrics and signals: test coverage for critical paths, flaky-test rate, mean time between failures.
  - Pitfalls to avoid: over-reliance on brittle UI tests, ignoring test maintenance debt.

</details>
<details>
<summary>
3. Customer collaboration over contract negotiation
</summary>

- Frequent delivery of small, valuable increments to customers
  - Implementation: break work into small, customer-valued slices that can be released independently; use feature flags to expose or hide functionality. Prioritize experiments and learning.
  - Practices & tools: MVPs, A/B testing, progressive rollouts, product telemetry.
  - Metrics and signals: customer adoption metrics, retention, Net Promoter Score changes.
  - Pitfalls to avoid: shipping features without measuring value; large batch releases that postpone learning.
- Active stakeholder involvement throughout the project
  - Implementation: involve stakeholders in backlog refinement, sprint reviews, acceptance criteria definition, and periodic strategy syncs. Make feedback actionable and visible.
  - Practices & tools: regular stakeholder demos, product discovery workshops, lightweight contracts for expectations.
  - Metrics and signals: stakeholder satisfaction, backlog feedback cycle time.
  - Pitfalls to avoid: stakeholders absent from the process or providing feedback only after large investments.
- Adaptive planning based on feedback and changing requirements
  - Implementation: use rolling-wave planning—plan in detail for the next few sprints and keep the roadmap flexible. Convert learning into backlog reprioritization frequently.
  - Practices & tools: roadmaps with confidence bands, outcome-oriented OKRs, contingency stories and experiments.
  - Metrics and signals: percentage of roadmap changes driven by validated feedback, delivery hit rate vs. planned.
  - Pitfalls to avoid: treating the roadmap as a fixed contract; ignoring downstream dependencies when reordering work.
- Product owner continuously reprioritizes backlog
  - Implementation: product owner (or equivalent) owns value decisions and maintains a prioritized backlog informed by data, user research, and stakeholder inputs. They accept or reject work in demos.
  - Practices & tools: story scoring (value/effort), WSJF for prioritization, visible backlog with clear prioritization rationale.
  - Metrics and signals: lead-to-deploy for top-priority items, stakeholder alignment scores.
  - Pitfalls to avoid: PO as a single bottleneck or a proxy for committees; weak ownership.
- Co-located or frequent remote conversations with domain experts
  - Implementation: embed domain experts in discovery sessions, use office hours and scheduled syncs, record decisions and examples in the ubiquitous language.
  - Practices & tools: domain workshops, three-amigos sessions (dev/test/product), recorded knowledge sessions.
  - Metrics and signals: fewer clarification tickets, improved acceptance pass rates.
  - Pitfalls to avoid: treating domain experts as one-off consultants rather than continuous partners.

</details>
<details>
<summary>
4. Responding to change over following a plan
</summary>

- Short iterations to allow frequent reassessment
  - Implementation: adopt 1–4 week iterations with a consistent cadence for planning, delivery, demo, and retrospective. Timebox discovery and delivery separately.
  - Practices & tools: sprint/iteration calendar, iteration goals, clear DoD for increments.
  - Metrics and signals: iteration predictability, time-to-market for critical features.
  - Pitfalls to avoid: sprint lengths that are too long to provide meaningful feedback; mixing discovery and delivery without separation.
- Backlog refinement and regular retrospectives
  - Implementation: continuous refinement sessions to keep stories ready; run retros every iteration and convert improvement items into the backlog with owners and success criteria.
  - Practices & tools: Definition of Ready, improvement registers, action-tracking boards.
  - Metrics and signals: percent of stories meeting DoR, completion rate of retro action items.
  - Pitfalls to avoid: retros that become venting sessions without concrete actions; backlog bloating without grooming.
- Minimal up-front commitments beyond near-term
  - Implementation: plan in detail only for the upcoming iterations; use high-level roadmaps and hypotheses for longer-term planning with progressive elaboration.
  - Practices & tools: rolling-wave planning, risk-adjusted spike stories, budgeted discovery time.
  - Metrics and signals: percentage of work that required rework due to early decisions, forecast accuracy for near-term periods.
  - Pitfalls to avoid: constant reshaping without stabilizing any path; stakeholder demand for fixed long-term delivery dates without uncertainty acknowledgment.
- Maintaining a prioritized, evolving product backlog
  - Implementation: keep a single source of truth for work (product backlog) with clear priorities, acceptance criteria, and inspection points; groom it continuously and make priorities transparent.
  - Practices & tools: backlog grooming cadence, priority rationale notes, linking backlog items to outcomes and metrics.
  - Metrics and signals: backlog size of ready items, ratio of new vs. stale items, average age of backlog items.
  - Pitfalls to avoid: multiple competing backlogs, hidden work or tribal knowledge outside the backlog.

</details>

### The 12 Agile principles

1. Customer satisfaction through early and continuous delivery of valuable software

    - Practice: deliver a Minimum Viable Product (MVP) quickly, then ship small, useful increments each sprint; measure user outcomes and iterate.

2. Welcome changing requirements, even late in development

    - Practice: maintain a prioritized backlog, practice continuous backlog grooming, use feature toggles and modular design to safely adapt scope.

3. Deliver working software frequently (weeks rather than months)

    - Practice: timebox sprints (1–4 weeks), keep increments deployable, automate builds and deployments to enable short release cycles.

4. Business people and developers must work together daily throughout the project

    - Practice: embed product owners in the team, run daily standups, hold frequent backlog refinement and demo sessions with stakeholders.

5. Build projects around motivated individuals; give them the environment and support they need

    - Practice: remove impediments (Scrum Master/engineering manager), invest in developer tooling and training, trust teams with decision-making and ownership.

6. The most efficient and effective method of conveying information is face-to-face conversation

    - Practice: prefer live conversations (in-person or video), use whiteboards or shared design sessions, keep written docs short and use them to complement discussions.

7. Working software is the primary measure of progress

    - Practice: use automated acceptance tests, demos, and CI build health as progress signals rather than lengthy status reports; track lead time and throughput.

8. Agile processes promote sustainable development (maintainable pace indefinitely)

    - Practice: limit work-in-progress, enforce reasonable sprint commitments, avoid chronic overtime, and invest in technical health (refactoring, automation) to prevent burnout.

9. Continuous attention to technical excellence and good design enhances agility

    - Practice: adopt TDD, pair programming, code reviews, continuous refactoring, and design patterns that allow change with low cost.

10. Simplicity — the art of maximizing the amount of work not done — is essential

    - Practice: focus on core value, avoid over-engineering, use lightweight experiments, and practice YAGNI (You Aren’t Gonna Need It) when designing features.

11. The best architectures, requirements, and designs emerge from self-organizing teams

    - Practice: create cross-functional teams, decentralize decision-making, run spike solutions and design workshops, and encourage continuous learning and shared ownership.

12. Regularly reflect on how to become more effective, then adjust behavior accordingly

    - Practice: hold retrospectives every iteration, capture actionable improvements, assign owners to improvements, and measure outcomes to close the improvement loop

### Scrum Framework

[Scrum Certification](https://www.scrum.org/)

- Sprints: Fixed-length iterations (typically 1-4 weeks)
- Defined roles (Scrum Master, Product Owner, Development Team)
- Ceremonies (Sprint Planning, Daily Standup, Sprint Review, Sprint Retrospective)
- Prioritized backlog.

### Kanban Methodology

Visual workflow management focusing on continuous delivery, limiting work in progress (WIP), and optimizing flow.

### Lean Software Development

Lean Software Development applies lean manufacturing principles to software: eliminate waste, amplify learning, decide as late as possible, deliver fast, empower the team, and build integrity.

Value-stream mapping, process improvement, metrics-driven managementAgile Methodology
