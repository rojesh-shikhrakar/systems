# Cloud Computing

“Cloud computing is a model for enabling ubiquitous, convenient, on-demand network access to a shared pool of configurable computing resources that  can be rapidly provisioned and released with minimal management effort or service provider interaction” - NIST

Five Essential Characteristics from NIST Definition

- On-Demand Self-Service: Users can unilaterally provision or release computing resources as needed without human intervention using UI/CLI/API.
- Broad Network Access: Services are accessible over the network or the internet (**"the cloud"**) through standard protocols and methods that promote use by heterogeneous thick/fat (Desktop PC, Workstations, Laptops, Servers) or thin client platforms (e.g., mobile phones, tablets, web browsers, virtual desktop terminals).
- Resource Pooling: Computing resources (physical or virtual) are pooled to serve multiple consumers dynamically using a multi-tenant model, with different physical and virtual resources dynamically assigned and reassigned according to consumer demand, independent of location. Allows economies of scale and cheaper service.
- Rapid Elasticity: Resources can be elastically provisioned and released (manually/automatically) to scale rapidly outward or inward (add/remove instances) based on demand.
- Measured Service: Resource usage can be monitored, controlled, reported and billed for transparency. Customers can pay only for what they use (*Consumption-based model*), or reserve as they go. If they stop using resources, they stop paying.

There's no upfront cost, no need to purchase and manage costly infrastructure which might not be fully utilized, the users can scale up or down their resource need based on their requirement and pay for only what they use. Furthermore, the the user don't have to worry about the managing the technology and the technology being obsolete.

Here are some other benefits of cloud services

- High Availability (uptime): Guarantee to ensuring maximum availability, regardless of disruptions or events that may occur as part of the service-level agreements (SLAs). 99% uptime -> 43.2min/month of downtime while 99.9% -> 432 min/month of downtime, hence there's a huge difference. Each service comes with its own SLA.
- Scalability: Ability to adjust resources to meet demand. A user can perform both vertical scaling (adding more powerful processing system) and horizontal scaling (adding more resource infrastructure) with the cloud services.
- Reliability (resilience): ability of a system to recover from failure and continue to run. With decentralized design, user can deploy in multiple regions around the world, that allows the system to be working even if a region faces a catastrophic event.
- Predictability of performance and cost: with autoscaling, load balancing and high availability, we can predict and automatically manage the resources resource needed for high customer demand. Furthermore, the cost can also be forecasted with cloud pricing calculators.

With a traditional corporate datacenter, the company is responsible for maintaining the physical space, ensuring security, and maintaining or replacing the servers and keep the datacenter up and running. But the cloud service provider works with **the shared responsibility model**, that defines a clear boundary between what the cloud provider secures and what the customer must manage though the core principles are consistent, each provider implements them slightly differently. The extent to which the cloud provider or the customer is responsible might very upon use cases and type of services but the cloud providers are always responsible for the physical component (datacenter, network, hosts), while the customer are always responsible for the devices allowed to connect to the cloud, the account and identities of the people using the services.

Cloud Provider responsible for the security of the cloud

- Hardware/AWS Global Infrastructure
- Regions, AZ, Edge Locations
- Compute, Storage, Database, Networking
-Software

Customer responsible for security in the cloud

- Client-side data encryption, integrity & authentication
- Server-side encryption (File system and/or data)
- Networking traffic protection (encryption, integrity, identity)
- OS, Network and Firewall rules and configuration
- Platform, applications, identity and access management i.e access policies, role assignments
- Customer Data

## Deployment Models

- Private Cloud is used and accessed by a single entity (organization) only, and the company manages a greater control over the cloud. It may be hosted at a dedicated datacenter offsite by a third party, hence cost are higher. eg: AWS Outpost, Azure Stack, Anthos.
- Public Cloud are built, controlled and maintained by a third-party cloud provider where anyone can purchase the cloud services to access and use their infrastructure and services over the public internet. The resources can also be shared among multiple users (multi-tenant).
- Hybrid cloud uses both public and private clouds in an inter-connected environment for greater flexibility. This is usually done to handle increased demand for private users by allocating  public cloud resources for the temporary surge in demand. Some extra layers of security is provided over the public cloud.
- Multi-cloud is a scenario where an entity can use multiple cloud providers eg: for migrating to different cloud service provider.

In On-Premise, the user has to manage all the infrastructure and services while in public cloud Facilities and other aspects are managed by the vendors based on the service model.

## Cloud Service Models: **X** **a**s **a** **S**ervice

- IaaS (Infrastructure as a Service): Provides virtualized computing resources such as processing, storage, networks, and other fundamental computing resources over the internet (e.g., AWS EC2, GCP Compute Engine, Azure Virtual Machines).
- PaaS (Platform as a Service): Offers hardware and software tools over the internet (e.g., Google App Engine).
- SaaS (Software as a Service): Delivers software applications via the web (e.g., Microsoft 365, Dropbox).

| Layer             | IaaS  | PaaS  | SaaS  |
|------------------|--------|-------|-------|
| Application       | ✅    | ✅   | ✅  |
| Data              | ✅    | ✅   | ❌  |
| Runtime           | ✅    | ✅   | ❌  |
| Container         | ✅    | ❌   | ❌  |
| Operating System  | ✅    | ❌   | ❌  |
| Virtualization    | ❌    | ❌   | ❌  |
| Servers           | ❌    | ❌   | ❌  |
| Infrastructure    | ❌    | ❌   | ❌  |
| Facilities        | ❌    | ❌   | ❌  |
| Example         | EC2, S3, VM | Heroku| Dropbox, Office365   |

✅ = Managed by the user      ❌ = Managed by the vendor

There are other service models that simplify different aspects of application development and deployment:

- Function as a Service (FaaS): developers write and deploy individual functions that run in response to events.
        - No need to manage servers or infrastructure
        - Ideal for microservices, event-driven tasks, and automation.
        - AWS Lambda, Azure Functions, Google Cloud Functions.
- Container as a Service (CaaS): manage and deploy containerized applications using APIs or web interfaces.
        - Offers orchestration, scaling, and lifecycle management for containers.
        - Great for microservices architecture, CI/CD pipelines, and hybrid cloud setups.
        - Google Kubernetes Engine (GKE), Amazon ECS, Azure Kubernetes Service (AKS).
- Database as a Service (DBaaS): access to a database without the need to manage hardware, software, or maintenance.
        - Fully managed database operations including backups, scaling, and updates, reducing operational overhead for secure data management and high availability.
        - Useful for web apps, analytics platforms, and enterprise data storage.
        - Amazon RDS, Google Cloud SQL, Azure SQL Database.

## Major Cloud Service Providers

| **Provider** | **Approx. global market share (2025)** | **Key strengths and notes** |
|---|---|---|
| **Amazon Web Services (AWS)** | **~30–33%** | Broadest service catalog; leader in hyperscale IaaS and enterprise adoption |
| **Microsoft Azure** | **~22–25%** | Strong hybrid and enterprise integrations; Microsoft ecosystem advantage |
| **Google Cloud Platform (GCP)** | **~10–12%** | Strengths in data, analytics, and AI/ML services |
| **Alibaba Cloud** | **~6–8%** | Leading presence in China and Asia Pacific for cloud infrastructure |
| **Other providers (Oracle, IBM, Tencent, regional players)** | **~15–20% combined** | Specialized or vertical-focused offerings; sizable regional markets |

Even though each cloud provider has its own branding, interface, and ecosystem, the core services, underlying technologies, and architectural principles are remarkably similar across the board. All providers use hypervisors to abstract physical hardware into virtual machines, and they all support containers and orchestration through industry standards like Docker and Kubernetes. Role-based access control (RBAC), encryption at rest/in transit, and shared responsibility models are universal.

Common Services Across Providers

| Category | AWS | Azure | Google Cloud | Common Purpose |
|---|---|---|---|---|
| **IAM & Security** | IAM | Azure AD, RBAC | IAM | Identity and access control |
| **Compute** | [EC2](./AWS/ec2.md) | Virtual Machines | Compute Engine | Run virtual servers |
| **Serverless** | [Lambda](./AWS/lambda.md) | Azure Functions | Cloud Functions | Event-driven compute without managing servers |
| **Object Storage** | [S3](./AWS/storage.md) | Blob Storage | Cloud Storage | Store objects |
| **Block Storage** | [EBS](./AWS/storage.md) | Disk Storage | Persistent Disk or Local | Store data in fixed size blocks |
| **File Storage** | [FSx, EFS](./AWS/storage.md) | Blob Storage | Cloud Storage | Store objects |
| **Networking** | [VPC](./AWS/networking.md) | Virtual Network | VPC | Isolated cloud networks |
| **Databases** | [RDS](./AWS/databases.md), DynamoDB | SQL Database, Cosmos DB | Cloud SQL, Firestore | Managed relational and NoSQL databases |
| **DNS** | Route 53 | Azure DNS | Cloud DNS | Domain name resolution |
| **Load Balancers** | ELB | Azure Load Balancer | Cloud Load Balancing | Distribute traffic across resources |
| **Containers** | ECS, EKS | AKS | GKE | Managed Kubernetes services |
| **Monitoring** | CloudWatch | Azure Monitor | Cloud Monitoring | Logs, metrics, and alerts |
| **Infrastructure as Code** | CloudFormation | ARM Templates | Deployment Manager | Automate resource provisioning |
| **CDN** | CloudFront | Azure CDN | Cloud CDN | Deliver content globally with low latency |
| **AI/ML Services** | SageMaker | Azure ML | AI Platform | Build, train, and deploy machine learning models |

This similarities in service offerings and underlying technologies across cloud providers means that skills are transferable, and multi-cloud strategies are feasible.
