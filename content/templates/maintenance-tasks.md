# Maintenance tasks
## Patching

> How should patches be deployed and tested?

### Normal patch cycle

_(e.g. Use the standard OS patch test cycle together with deployment via Jenkins and Capistrano)_

### Zero-day vulnerabilities

_(e.g. Use the early-warning notifications from UpGuard plus deployment via Jenkins and Capistrano)_

## Daylight-saving time changes

> Is the software affected by daylight-saving time changes (both client and server)?

_(e.g. Server clocks all set to UTC+0. All date/time data converted to UTC with offset before processing)_

## Data cleardown

> Which data needs to be cleared down? How often? Which tools or scripts control cleardown? 

_(e.g. Use `abc-cleardown.ps1` run nightly to clear down the document cache)_
 
### Log rotation

> Is log rotation needed? How is it controlled? 

_(e.g. The Windows Event Log *ABC Service* is set to a maximum size of 512MB)_

