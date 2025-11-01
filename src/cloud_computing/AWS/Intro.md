# AWS

## AWS Global Infrastructure

AWS Regions + AWS Edge Locations

**Geographic Separation:** Isolated **Fault Domain**

**Geopolitical Separation:** Different **governance**

**Location Control:** Performance

Region Code: us-east-1

Region Name: N. Virginia

**Availability Zone (AZ):** Level of granularity below regions. Isolated infrastructure within a region.

us-east-1a, us-east-1b, …, us-east-1f

**Service Resilience:**

- **Globally** resilient: IAM and Route 53. Can tolerate failure of multiple regions without affecting service.
- **Region** resilient: If an AZ in a region fails, the service can continue operating. If all AZ fails, the service fails.
- **AZ** resilient

## Local Zones

“1” zone - so no built in resilience
Think of them like an AZ, but near your location
They are closer to you - so lower latency
Not all products support them - many are opt in w/ limitations
DX to a local zone IS support (extreme performance needs)
Utilize parent region - i.e. EBS Snapshots are TO parent
Use Local zones when you need THE HIGHEST performance ❗
