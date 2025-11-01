# IAM : Identity and Access Management

AWS Account: Container for **identities** (users) and **resources.**

Account **root user** has full control over all of the AWS account and any resources created within in. The root user can’t be restricted.

IAM **User Groups** and **Roles** can also be created and given full or limited permissions. All identities start with no permissions.

May be good practice to create multiple AWS Accounts for different uses (prod, dev, test).

- Every AWS account comes with its own running copy of IAM, which is a database.
- IAM is a globally resilient service, so any data is always secure across all AWS regions. (Exam Q)
- The IAM in each of your accounts is your own dedicated instance of IAM, separate from other accounts.
- IAM
    - User
        - IDs which represent humans or apps that need access to your account
    - Group
        - Collection of related users, e.g. dev team, finance or HR
    - Role
        - Can be used by **AWS Services**, or for granting **external access** to your account
        - Used when the number of things is uncertain.
- IAM Policy
    - Allow or deny access to AWS services when and only when they’re attached to IAM users, groups or roles.
- IAM three main jobs
    - **Manage identities** - *An ID Provider (IDP)*
        - Create, modify and delete IDs such as users and roles
    - **Authenticate identities**
        - Prove you are who you claim to be - generally username and passwords
    - **Authorize**
        - Allow or deny access to resources
- IAM is provided for free
    - No cost for users, groups and roles. Limits for number of each.
- IAM is global service.
- Allow or deny its ids on its AWS account
- No direct control on external accounts or users - only control local ids in your account
- **Identity federation and MFA**
    - Use Facebook, Twitter, Google etc. to access AWS resources

## IAM Access Keys

- Long-term (Don’t update manually)
- IAM User don’t need username and password - for CLI access key is enough
- IAM User can have up to two access keys that can be created, deleted, made inactive or made active

### Access Keys consist of two parts

- Both are provided when created an access key
- These are only provided once - no ability to get access to the keys again. Need to be stored safely.
- Both parts are used when accessing AWS via CLI
- Access keys need to be deleted and recreated if they are leaked
- Possible to have two sets of keys such that you can create a new one, update all applications using the keys and then delete the old set

**Access Key ID** , **Secret Access Key**

## IAM Policy Document

- At high level just one or more statements that grant or deny access
- Need to identify
- Statement only applies if the interaction with AWS match the action and the resource
- Wildcards (*) match any action
- Effect defines what to do if the action and resource match
- Often statements overlap, and you may be allowed and denied at the same time.
- Explicit denies are first priority. Deny always win.

Priority list

1. Explicit DENY
2. Explicit ALLOW
3. Default DENY

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "AllowListHostedZones",
      "Effect": "Allow",
      "Action": [
        "route53:ListHostedZones",
        "route53:GetHostedZone"
      ],
      "Resource": "*"
    },
    {
      "Sid": "AllowManageSpecificHostedZone",
      "Effect": "Allow",
      "Action": [
        "route53:ChangeResourceRecordSets",
        "route53:GetChange"
      ],
      "Resource": "arn:aws:route53:::hostedzone/Z1D633PJN98FT9"
    }
  ]
}
```

Inline Policy

- Write a JSON for multiple users individually
- Bad practice for many users - have to change a lot of JSONs if there are 100 users
-Only use in special or exceptional allow or deny situations

Managed Policy

- Reusable
- Low management overhead
- Should be the default


## IAM Users and ARNs

> *IAM Users are an identity used for anything requiring **long-term** AWS access e.g. **humans, applications or service accounts***
> 
- **Principal:** Something or someone wanting access resources in AWS
    - Must authenticate to gain access
        - Access Keys
        - Username/password
- When a principal is authenticated, it is known as a **authenticated identity**
- When the authenticated user tries to do an action, e.g. upload something to a S3 bucket, IAM checks that the authenticated user have access to perform that action (authorization)

## Amazon Resource Name (ARN)

> Uniquely identify resources within any AWS accounts
> 

```yaml
aws:partition:service:region:account-id:resource-id
aws:partition:service:region:account-id:resource-type
aws:partition:service:region:account-id:resource-type:resource-id

arn:aws:s3:::catgifs # Bucket
arn:aws:s3:::catgifs/* # Objects in bucket

# These two don't overlap. First is access to manage the bucket, second is to manage objects in bucket. 
```

- **5000 IAM Users per account**
- IAM User can be a member of 10 groups
- This has systems design impacts
    - Internet-scale applications
    - Large orgs and org merges
- IAM Roles and Identity Federation fix this (more later)

## IAM Groups

> ***IAM Groups are containers for Users***
> 
- Allow for easier management
- Groups can have (identity) policies attached to them
    - Users can have individual (identity) policies too
- Trick question exam: “All users” group does not exist natively (but you can technically create it)
- ❗300 groups ❗
- ❗10 groups per user ❗
- **No nesting**
- Resource policies (e.g. for a bucket) can allow one or more specific user to allow access
- **Resource policies cannot grant access to a group!**
    - Further, cannot be referenced from a resource policy at all

## IAM Roles

> *An IAM role is an IAM identity that you can create in your account that has specific permissions. An IAM role is similar to an IAM user, in that it is an AWS identity with permission policies that determine what the identity can and cannot do in AWS. However, instead of being uniquely associated with one person, a role is intended to be assumable by anyone who needs it. Also, a role does not have standard long-term credentials such as a password or access keys associated with it. Instead, when you assume a role, it provides you with temporary security credentials for your role session.

[](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles.html)

- Role best suited for unknown number of principals or more than 5000 users
- IAM Roles are assumed. You become that role.
- ❗**Two types of policy for a role:**❗
    - **Trust policy**
    - **Permissions policy**
- If a role is assumed by something that is allowed to assume it, temporary security credentials are created.
    - ❗**STS: Secure Token Service** ❗
        - Generates the security tokens
        - sts:AssumeRole
    - Permissions policy define what they have access to
    - When they expire the role has to be assumed again to regain access

### ❓When to use IAM Roles

- Most common use case is for other AWS services
- E.g. AWS Lambda
    - No permissions by default
    - **Lambda Execution Role**
    - Runtime environment assumes the role.
    - Better to use a role than to hardcode access keys to the Lambda function
- Emergency or unusual situations
- E.g. team with read-only access:
    - 99% read-only access is OK
    - “Break glass for key”
    - User of team can assume an emergency role to perform a certain write action
- A corporation with > 5000 ids
    - **ID federation**
    - Can allow an organization to use previous existing accounts for SSO (Active Directory)
    - AD users are allowed to assume a role to gain access to e.g. a bucket
- App with millions of users
    - **Web Identity Federation**
    - Users might need to interact with a DynamoDB
    - Users are allowed to assume a role to interact with the db
    - No AWS credentials on the app
    - Uses existing customer logins (twitter, fb, google)
    - Scales to large number of accounts
- Cross AWS accounts

## Service-linked Roles & PassRole

> A service-linked role is a unique type of IAM role that is linked directly to an AWS service. Service-linked roles are predefined by the service and include all the permissions that the service requires to call other AWS services on your behalf. The linked service also defines how you create, modify, and delete a service-linked role. A service might automatically create or delete the role. It might allow you to create, modify, or delete the role as part of a wizard or process in the service. Or it might require that you use IAM to create or delete the role.
> 
- IAM role linked to a specific AWS service
- Predefined by a service
- Providing permissions that a service needs to interact with other AWS services on your behalf
- Or allow you to during the setup or within IAM
- You can’t delete the role until it’s no longer required
- **PassRole**: Grant a user permission to pass a role to an AWS service
    - Bad: Bob may create and assign a role to a AWS service that has permissions that exceeds the permissions that Bob has himself
        - E.g. create resources
    - Good: Bob cannot assign roles with permissions that exceeds his own
    

## AWS Organizations

 *Suitable for organization with multiple AWS accounts*

- Use a standard AWS account to create a AWS organization
    - This account will be the **management account** or **master account - can only be one**
    - The organization is not *within* the AWS account
- Invite other standard accounts into the organization
- Organization Root is a container within AWS Organization which contains either **other AWS account or other organizational units**
- Consolidated billing: Member accounts pass their billing to the payment/management/master account
    - Removes financial overhead
    - Consolidation of reservation and volume discounts
- **Two important concepts of AWS Organizations:**
    - In a organization you can create accounts directly within the organization - one step process instead of invitation
    - Don’t need to have IAM Users inside every AWS account. IAM Roles can be used. Can role switch into different accounts.

## Service Control Policies (SCP)

JSON doc with policies. Can be attached to organizations as a whole. Cascade to all orgs below that which it is attached to.
**Management account is special and is unaffected by SCP!**

- SCPs are **account permissions boundaries**
- They limit what the account (including account root user) can do
- SCPs can e.g. limit the size of an EC2 instance within a specific region
- **SCPs don’t grant any permissions!**
- **Allow list vs Deny list**
    - Default is a deny list
    - FullAWSAccess Default for new account
    - DenyS3 - Deny S3 to organizations - even though they have FullAWSAccess (deny, access, deny)
- To implement allow list:
    - Remove FullAWSAccess - add a new list: AllowS3EC2
        - Explicit say which services are allowed
        - More overhead, may block access to services you don’t intend to block
- Best practice is deny list architecture

## CloudWatch Logs

> *CloudWatch Logs is a service which can accept logging data, store it and monitor it.
It is often the default place where AWS Services can output their logging too.
CloudWatch Logs is a public service and can also be utilized in an on-premises environment and even from other public cloud platforms.*

💡 **Public Service:** Usable from AWS or on-premises


- **Store, Monitor** and **access** logging data
- **AWS Integrations** - EC2, VPC Flow logs, Lambda, CloudTrail, R53 and more
- **Metric filter:** Can generate metrics based on logs
- Regional service

## CloudTrail Essentials

### CloudTrail Basic

![Untitled](img/Untitled%2010.png)

- Logs API calls/activities as a **CloudTrail Event**
- 90 days stored by default in **Event History**
- Enabled by default - no cost for 90 day history. No S3.
- To customize the service, create one or more **Trails**
- **Management events**
    - Provide information about management operation that are performed on resources in your AWS account
    - AKA **Control Plane Operations**
    - Create EC2 instance etc
    - **Enabled by default**
- **Data events**
    - Objects being uploaded to S3
    - Lambda being invoked
    - **Not enabled by default. Come at an extra cost.**
- Trails can be set to one region or all regions
- Organizational trail - it is what it sounds like
- **Trails are how you configure S3 and CWLogs.**
- Management event **only** by default
- **IAM, STS, CloudFront → Global Service Events**
    - Only these logs global
- **NOT REALTIME** - There is a delay
    - Typical 15 minutes ❗

## AWS Control Tower

> *AWS Control Tower offers a straightforward way to set up and govern an AWS multi-account environment, following prescriptive best practices. AWS Control Tower orchestrates the capabilities of several other [AWS services](https://docs.aws.amazon.com/controltower/latest/userguide/integrated-services.html), including AWS Organizations, AWS Service Catalog, and AWS IAM Identity Center (successor to AWS Single Sign-On), to build a landing zone in less than an hour. Resources are set up and managed on your behalf.

AWS Control Tower orchestration extends the capabilities of AWS Organizations. To help keep your organizations and accounts from drift, which is divergence from best practices, AWS Control Tower applies preventive and detective controls (guardrails). For example, you can use guardrails to help ensure that security logs and necessary cross-account access permissions are created, and not altered.*
> 

![Untitled](img/Untitled%2011.png)

- Quick and easy setup of multi-account environment
- Orchestrates other AWS services to provide this functionality
- Organizations, IAM Identity Center, CloudFormation, Config and more
- Landing Zone - multi-account environment
- SSO/ID Federation, Centralized Logging and Auditing
- Guard Rails - Detect/Mandate rules/standard across all accounts
- Account Factory - Automates and standardizes new account creation
- Dashboard - single page oversight of the entire environment

### Landing Zone

- **Well Architected** multi-account environment. **Home region.**
- Built with AWS Organizations, AWS Config, CloudFormation
- Security **OU (Organizational Unit)** - Log Archive and Audit Accounts (CloudTrail & Config Logs)
- Sandbox OU - Test/less rigid security
- You can create other OU’s and Accounts
- IAM Identity Center (AWS SSO) - SSO, multiple-accounts, ID Federation
- Monitoring and Notifications - CloudWatch and SNS
- End User account provisioning via Service Catalog

### Guard Rails

- Guardrails are rules for multi-account governance
- **Mandatory, strongly recommended** or **elective**
- **Preventive -** Stop you doing things (AWS ORG SCP)
- Enforced or not enabled. i.e. allow or deny regions or disallow bucket policy changes
- Detective - compliance checks (AWS CONFIG Rules)
- Clear, in violation or not enabled
- Detect CloudTrail enabled or EC2 Public IPv4

### Account Factory

- **Automated Account Provisioning**
- Cloud admins or end users (with appropriate permissions)
- **Guardrails** - automatically added
- Account admin given to a named user (IAM Identity Center)
- Account & network standard configuration
- Account can be closed or repurposed
- Can be fully integrated with a business SDLC (Software Development Life Cycle)

### S3 Bucket Policies

S3 is private **by default***

- A form of **resource policy** ❗
- Like identity policies, but attached to a bucket
- Resource perspective permissions
- ALLOW/DENY same or **different** accounts
- ALLOW/DENY **anonymous** principals

### Access Control Lists (ACLs)

- ACLs on objects and bucket
- A sub-resource
- **LEGACY!**❗
- Inflexible and simple permissions

### Block Public Access

- Fail safe

### Summary

- Identity: Controlling different resources
- Identity: You have a preference for IAM
- Identity: Same account
- Bucket: Just controlling S3
- Bucket: Anonymous or Cross-Account
- ACLs: **Never** - unless you must