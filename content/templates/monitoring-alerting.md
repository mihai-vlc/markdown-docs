# Monitoring and alerting
## Log aggregation solution

> What log aggregation & search solution will be used?

_(e.g. The system will use the existng in-house ELK cluster. 2000-6000 messages per minute expected at normal load levels)_

## Log message format

> What kind of log message format will be used? Structured logging with JSON? `log4j` style single-line output?

_(e.g. Log messages will use log4j compatible single-line format with wrapped stack traces)_

## Events and error messages

> What significant events, state transitions and error events may be logged?

_(e.g. IDs 1000-1999: Database events; IDs 2000-2999: message bus events; IDs 3000-3999: user-initiated action events; ...)_

## Metrics

> What significant metrics will be generated?

_(e.g. Usual VM stats (CPU, disk, threads, etc.) + around 200 application technical metrics + around 400 user-level metrics)_

## Health checks

> How is the health of dependencies (components and systems) assessed? How does the system report its own health?

### Health of dependencies

_(e.g. Use `/health` HTTP endpoint for internal components that expose it. Other systems and external endpoints: typically HTTP 200 but some synthetic checks for some services)_

### Health of service

_(e.g. Provide `/health` HTTP endpoint: 200 --> basic health, 500 --> bad configuration + `/health/deps` for checking dependencies)_

