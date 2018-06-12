# System characteristics

## Hours of operation

> During what hours does the service or system actually need to operate? Can portions or features of the system be unavailable at times if needed?

### Hours of operation - core features

_(e.g. 03:00-01:00 GMT+0)_

### Hours of operation - secondary features

_(e.g. 07:00-23:00 GMT+0)_

## Data and processing flows

> How and where does data flow through the system? What controls or triggers data flows?

_(e.g. mobile requests / scheduled batch jobs / inbound IoT sensor data )_

## Infrastructure and network design

> What servers, containers, schedulers, devices, vLANs, firewalls, etc. are needed?

_(e.g. '10+ Ubuntu 14 VMs on AWS IaaS + 2 AWS Regions + 2 VPCs per Region + Route53')_

## Resilience, Fault Tolerance (FT) and High Availability (HA)

> How is the system resilient to failure? What mechanisms for tolerating faults are implemented? How is the system/service made highly available?

_(e.g. 2 Active-Active data centres across two cities + two or more nodes at each layer)_

## Throttling and partial shutdown

> How can the system be throttled or partially shut down e.g. to avoid flooding other dependent systems? Can the throughput be limited to (say) 100 requests per second? etc. What kind of connection back-off schemes are in place?

### Throttling and partial shutdown - external requests

_(e.g. Commercial API gateway allows throttling control)_

### Throttling and partial shutdown - internal components

_(e.g. Exponential backoff on all HTTP-based services + `/health` healthcheck endpoints on all services)_

## Expected traffic and load

> Details of the expected throughput/traffic: call volumes, peak periods, quiet periods. What factors drive the load: bookings, page views, number of items in Basket, etc.)

_(e.g. Max: 1000 requests per second with 400 concurrent users - Friday @ 16:00 to Sunday @ 18:00, driven by likelihood of barbecue activity in the neighborhood)_

### Hot or peak periods

_

### Warm periods

_

### Cool or quiet periods

_

## Environmental differences

> What are the main differences between Production/Live and other environments? What kinds of things might therefore not be tested in upstream environments?

_(e.g. Self-signed HTTPS certificates in Pre-Production - certificate expiry may not be detected properly in Production)_

## Tools

> What tools are available to help operate the system?

_(e.g. Use the `queue-cleardown.sh` script to safely cleardown the processing queue nightly)_
