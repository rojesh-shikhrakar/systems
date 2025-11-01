# AWS Storage Services

File storage, block storage, and object storage are three distinct methods of storing data, each with unique characteristics and use cases.

## S3: Simple Storage Service Object Storage

{{#include ../cloud_services.md:object_storage}}

### Objects and Buckets

S3 stores data as **objects** within **buckets**. Objects is the data you store, Buckets are container for objects.

Objects

- Two parts key : value, key is the object name, value is the content being.
- 0 - 5 TB data
- Single PUT upload support up to 5 GB.
- Objects have Version ID, Metadata, Access Control and Sub-resources

Buckets:

- can contain folders with objects
- Buckets - 100 soft limit, 1000 hard per account but can contain unlimited objects
- name must be a unique DNS-complaint name, unique across all AWS accounts i.e. globally unique.
        - 3-63 characters, all lower case, no underscores, can't be IP formatted 1.1.1.1
- name is immutable after creation
- “private” by default
- never leaves a region unless you configure it to do so
- No file system and has Flat Structure i.e. all objects are stored at root level in the bucket.
        - Folders are prefixed names - but objects are still stored at the same level
        - You can’t mount an S3 bucket as (K:\ or /images)

Access to S3 buckets are configured using Bucket Policy and Access Control List (ACL). ACLs are legacy mechanism to handle access control

Bucket authorization within S3 is controlled using Identity Policies on AWS identities, as well as Bucket policies in the form of resource policies on the bucket and bucket or object ACLs. Bucket Policies can be used to authorize access to a bucket or objects inside a bucket to IAM identities, IAM identities in a different AWS account (cross-account access) or anonymous accesses.

```admonish warning
Block public access is a setting applied on top of any existing settings as a protection. It can disallow all public access granted to a bucket and objects using ACLs or bucket policies.
```

### Storage Tiers / Classes

Storage classes influence that cost, durability, availability and “first byte latency” for objects in S3. The class used for an object can be changed manually or using lifecycle policies.

1. Standard [Default]: All purpose storage or when usage is unknown
    - 99.999999999 (11 nines) durability and 4 nines availability
    - Replicated in 3+AZs
    - no minimum object size or retrieval fee
2. Standard Infrequent Access (Standard - IA): for long-lived objects where real-time access is required but infrequent
    - 99.9% Availability, 3+ AZ replication, cheaper than Standard
    - Minimum storage duration of 30-day and 128 KB minimum charge and object retrieval fee
3. One Zone - IA: Non-critical and/or reproducible objects (Non Mission Critical)
    - 99.5% availability, only 1 AZ (99.5% Availability),
    - Minimum storage duration of 30 days and 128KB minimum charges and object retrieval fee
    - Cheaper than Standard and Standard IA
4. Glacier: Long-term archival storage (warm and cold backups)
    - Archived objects are not available for real-time access. You must first restore the objects before you can access them
    - Retrievals could take minutes or hours (faster = higher cost)
    - 3+ AZ replication, 90 day and 40KB minimum charge and retrieval fee
5. Glacier Deep Archive: Long-term archival (cold backups)
    - for data that is accessed rarely in a year
    - 180 days and 40KB minimum charges and retrieval fee
    - Lowest cost storage lower than Glacier - replacement for tape-style storage

Intelligent Tiering is designed for unknown or unpredictable access patterns, that moves objects automatically between two tiers - one designed for frequent access, the others for infrequent. It monitors access patterns and move objects that have not been accessed for 30 consecutive days to the infrequent access tier. This optimize the storage costs automatically based on changes in data access patterns, without performance impact or operational overhead.

### Lifecycle Rules

Storage classes can be controlled via Lifecycle Rules, which allow for the automated transition of object between storage classes, or in certain cases allow for the expiration of objects that are no longer required.

S3 lifecycle rules can apply to buckets, prefixes, and tags for buckets or objects, along with current or previous versions of an object.

### S3 Cross Region Replication (S3 CRR)

S3 cross-region replication (S3 CRR) is a feature that can be enabled on S3 buckets allowing one-way replication of data from a source bucket to a destination bucket in another region.

You must have versioning enabled in the source and destination bucket to enable CRR. You can have CRR replicate to bucket in another AWS Account. Replication requires an IAM role with permission to replicate objects, With the replication configuration, it is possible to override the storage class and object permission as they are written to the destination.

By default, replicated objects keep their:

- Storage Class
- Object name(key)
- Owner
- Object permission

Objects added before the replication configuration added won’t be added as part of the replication process.

Object ownership and its associated storage tiers can be altered when going to a new region.

Lifecycle rules do not carry over for S3 CRR

SSE-C is not supported for CRR

### Transferring Data to S3

S3 can be economical & accessed via UI/CLI/API/HTTP.

Uploads to S3 are generally done using the S3 console, CLI or directly using the APIs

Single PUT Upload (Default): Single data stream to S3, if stream fails, upload fails and requires reupload

- Limit of 5 GB of Data, can cause performance issues, and if the upload fails the whole upload fails.
- Object is uploaded in a single stream of data, speed = speed of 1 stream

Multi Part Upload: An object is broken up into parts, each part is 5MB to 5GB (10000 parts max)

- Multipart upload is faster, and the individual parts can fail and can be retried individually.
- Transfer rate = combination of all parts

```admonish note
AWS recommends multipart for anything over 100 MB, but it’s required for anything beyond 5 GB.
```

S3 Transfer Acceleration enables fast, easy, and secure transfers of files over long distances between your client and an S3 bucket. Uses the network of edge locations. Turned off by default. Transfers data via the AWS network - more efficient than public internet. Lower, consistent latency. The worse the initial connection, the bigger the gain of uses accelerated transfer

### Data Encryption and Security

Data between a client and S3 is encrypted in transit. Encryption at rest can be configured on a per-object basis. We can specify default encryption type

- Client-Side Encryption - The client/application is responsible for managing both the encryption/decryption process and its keys. This method is generally only used when strict security compliance is required. It has significant admin and processing overhead.
- Server-Side Encryption
        - with Customer Managed Keys (SSE-C) - S3 handles the encryption and decryption process (no CPU usage on client). The customer is still responsible for key management, and key must be supplied with each PUT or GET request.
        - with S3-Managed Keys (SSE-S3) - Objects are encrypted using AES-256 by S3. The unique keys are generated and managed by S3 for every object. Keys are stored with objects encrypted with a root key. User don't have access to keys or control over rotation of keys.
        - with AWS KMS-Managed Keys (SSE-KMS) - Objects are encrypted using individual keys generated by KMS. Encrypted keys are stored with the encrypted objects. Decryption of an object needs both S3 and KMS key permission (role separation). You can control permissions and rotation.

### Object Versioning

By Default Object Versioning is turned off. Once enabled, objects are given a VersionID (previously identified only by their keys), any operation that would otherwise modify objects generate new versions of that original object, both versions are kept. Once a bucket is version-enabled, it can never be fully switched off - only suspended.

With versioning enabled, an AWS account is billed for all versions of all objects. Object deletions by default don’t delete an object - instead, a delete marker is added to indicate the object is deleted. To fully delete you must provide the id of the object you want to delete.

MFA Delete is a feature designed to prevent accidental deletion of object. Once enabled, a one-time password is required to delete an object version or when changing the version state of a bucket. To enable MFA delete, versioning should be turned on.

### Presigned URL

A presigned URL is a temporary URL that allows users to see assigned S3 objects using the creator’s credentials. A presigned URL can be created by an identity in AWS, providing access to an object using the creator’s access permission. When the presigned URL is used, AWS verifies the creator’s access to the object. The URL is encoded with authentication built in and has an expiry time.

Presigned URLs can be used to download or upload objects.

For generating pre-signed URLs, do not generate presigned URLs using Roles and use identities with long term credentials.

### Hosting Static Website

Amazon S3 buckets can be configured to host websites. Content can be uploaded to the bucket and when enabled, static web hosting will provide a unique endpoint URL that can be accessed by any web browsers. S3 can host many types of content, including HTML, CSS, JavaScript and Media(Audio, Movies, Images).

S3 can be used to host front-end code for serverless application or an offload location for static content. CloudFront can also be added to improve the speed and efficiency of content delivery for global users or to add SSL for custom domains.

TODO Example

## EBS: Elastic Block Storage

{{#include ../cloud_services.md:block_storage}}

## FSx, EFS: Elastic File Storage

{{#include ../cloud_services.md:file_storage}}

### Amazon Elastic File System (Amazon EFS)

Fully managed elastic NFS file system for use with AWS Cloud services, and on-premises resource. File system can be created and mounted on multiple Linux instances at the same time.

Designed for large scale parallel access of data. Shared media, Logging solutions where various clients need to access Shared Data, Amazon EFS is a good use case. BigData Analytics. Amazon EFS is Region Resilient. Security groups are used to control access to NFS mount targets.

Amazon EFS offers two storage classes:

1. The Standard storage class,
2. Infrequent Access Storage Class.

Throughput modes

- Bursting Throughput - (Default)
- Provisioned Throughput - Throughput Mode

Performance Mode

- General Purpose (Default)
- Max I/O (Designed for large number of instances)

## AWS Storage Gateway

Hybrid storage service that allows you to migrate data into AWS, extending your on-premises storage capacity using AWS

There are three main types of Storage Gateway:

- File gateway: supports a file interface into AWS S3 and combines a server and a virtual software appliance. Using File gateway, you can store and retrieve objects in Amazon S3 using NFS and SMB
- Volume gateway: provides cloud-backed storage volumes that you can mount as Internet Small Computer System Interface (iSCSI). The volume gateway is deployed into your on-premises environment as a VM running on VMWare ESXI, KVM or Microsoft Hyper-V hypervisor
- Tape gateway: provides cloud-backed virtual tape storage. The tape gateway is deployed into your on-premises environment as a VM running on VMware ESXi, KVM or Microsoft Hyper-V hypervisor

## [AWS Cloud Front](https://aws.amazon.com/cloudfront/): Content Delivery Network (CDN)

{{#include ../cloud_services.md:cdn}}

700+ global edge locations and Integrated with AWS services (S3, EC2, Lambda@Edge)

DDoS protection via AWS Shield

SSL/TLS encryption

Real-time metrics and logs

### Origin Access Identity (OAI)

OAI is a virtual identity associated with Cloud Front Distribution. It only works for S3 Buckets.

Restrict S3 Bucket access only via Cloud Front for Performance and User Experience
