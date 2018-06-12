# Service or system overview

**Service or system name:** 

## Business overview

> What business need is met by this service or system? What expectations do we have about availability and performance?

_(e.g. Provides reliable automated reconciliation of logistics transactions from the previous 24 hours)_

## Technical overview

> What kind of system is this? Web-connected order processing? Back-end batch system? Internal HTTP-based API? ETL control system?

_(e.g. Internal API for order reconciliation based on Ruby and RabbitMQ, deployed in Docker containers on Kubernetes)_

## Service Level Agreements (SLAs)

> What explicit or implicit expectations are there from users or clients about the availability of the service or system?

_(e.g. Contractual 99.9% service availability outside of the 03:00-05:00 maintenance window)_

## Service owner

> Which team owns and runs this service or system?

_(e.g. The *Sneaky Sharks* team (Bangalore) develops and runs this service: sneaky.sharks@company.com / *#sneaky-sharks* on Slack / Extension 9265)_

## Contributing applications, daemons, services, middleware

> Which distinct software applications, daemons, services, etc. make up the service or system? What external dependencies does it have?

_(e.g. Ruby app + RabbitMQ for source messages + PostgreSQL for reconciled transactions)_

