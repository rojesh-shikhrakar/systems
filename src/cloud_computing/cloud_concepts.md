# Cloud Concepts & Terminologies

## High-Availability (HA)

Aims to ensure an agreed level of operational performance, usually uptime, for a higher than normal period.
**Maximizing a system’s uptime / minimize outages.***

E.g.

- 99.9% = 8.77 hours /year downtime
- 99.999% = 5.26 minutes /year downtime

- User disruption, such as re-login, is okay
- If a server goes down, but another is ready on standby, users may notice small disruptions, but thats okay
- Often require redundant service or architecture to achieve the agreed SL

## Fault-Tolerance (FT)

Is the property that enables a system to **continue operating properly** in the event of the **failure of some** (one or more faults within) of its components.

Operate through faults.

- High availability is not enough
- If a server goes down, disruption is not okay
- The system must be able to tolerate the failure
    - Levels of redundancy and system of components which can route around failures
- Implementing FT when you need HA is expensive and is harder to implement
- Implementing HA when you need FT can be a disaster

## Disaster Recovery (DR)

A set of policies, tools and procedures to **enable the recovery** or **continuation** of **vital** technology infrastructure and system following a natural or human-induced disaster.

Used when FT and HA don’t work

- Parachute
