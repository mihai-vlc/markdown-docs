# Operational tasks

## Shortcuts
### What to do when...
> List of local links (HTLML Anchor Tags) to specific runbooks to run in stressful situations (on call)
 
### How do I...
> List of local links (HTLML Anchor Tags) to general administration texts that explain how to perform different administration tasks.

## Deployment

> How is the software deployed? How does roll-back happen?

_(e.g. We use GoCD to coordinate deployments, triggering a Chef run pulling RPMs from the internal yum repo)_

## Batch processing

> What kind of batch processing takes place?

_(e.g. Files are pushed via SFTP to the media server. The system processes up to 100 of these per hour on a `cron` schedule)_

## Power procedures

> What needs to happen when machines are power-cycled?

_(e.g. *** WARNING: we have not investigated this scenario yet! ***)_

## Routine and sanity checks
### How do I...
> What kind of checks need to happen on a regular basis?

_(e.g. All `/health` endpoints should be checked every 60secs plus the synthetic transaction checks run every 5 mins via Pingdom)_

## Troubleshooting
### What to do when...
> How should troubleshooting happen? What tools are available?

_(e.g. Use a combination of the `/health` endpoint checks and the `abc-*.sh` scripts for diagnosing typical problems)_

