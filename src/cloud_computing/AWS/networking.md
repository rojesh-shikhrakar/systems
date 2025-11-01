# Networks

## Virtual Private Cloud (VPC) Network

The Default VPC is entirely private and isolated, one per region per account, can be removed or recreated. VPCs cannot communicate outside their network unless you specifically allow using VPC peering or Transit Gateway.

Custom VPC are created in almost all AWS deployments tailored to specific needs. AWS allows up to 5 VPCs per region per account, limit can be increased by requesting to AWS. You often need to create separate VPCs for:

- Development, staging, and production environments
- Isolating workloads for security or compliance
- Multi-tenant architectures

**VPC CIDER (Classless Inter-Domain Routing):** Every VPC is allocated a range of IP addresses. If you allow anything to communicate to a VPC, it needs to communicate to that VPC CIDR. Any outgoing connection is going to originate from that VPC CIDR. Custom VPCs can have multiple CIDR ranges, but the default VPC only gets one, which is always the same: `172.31.0.0/16`

Subnets assign public IPv4 addresses. Each subnet within a VPC is located within a AZ, and can never be changed. Default VPC is configured to have a subnet in every AZ. /20 subnet in each AZ in the region (/17 is half the size of /16). Each use a part of the IP range and cannot overlap. This is how a VPC is resilient.

IGW: Internet Gateway

**SG: Security Group**: (EC2) Instances
    - Stateful
        - Incoming rule change = allow outgoing response traffic
            - Open port 80 for incoming will allow port 80 for outgoing response
    - Allow rules only
    - Instances can have multiple SGs
    - Allow CIDR, IP, SG as destination

**NACL: Network Access Control List**
    - Subnet
    - Stateless
        - Open rule 80 for incoming does not allow port 80 for outgoing
    - Allow and deny rules
    - Subnets can have only one NACL
    - Only allow CIDR as destination

```admonish tip
Best practice is not to use default VPC
```

## Load Balancers

## AWS Route 53 : Domain Name System (DNS) & Traffic Management

{{#include ..\cloud_services.md:dns}}

AWS Route 53 acts as an authoritative DNS service for your domains and stores and serves DNS records (A, CNAME, MX, TXT, etc.). Responds to queries once the resolver reaches your domain’s authoritative server. It host global servers in different zones managing single database.

- Domain registration: You can buy and manage domains.
- Hosted zones: Define DNS records for your domain.
- Traffic routing: Use latency-based, geolocation, or weighted routing.
- Health checks: Automatically reroute traffic if endpoints fail.
- Private DNS: Manage DNS within your VPCs.

### DNS Resolution

## Network Security

## Network Monitoring
