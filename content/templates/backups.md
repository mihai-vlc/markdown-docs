# System backup and restore
## Backup requirements

> Which parts of the system need to be backed up?

_(e.g. Only the CoreTransactions database in PostgreSQL and the Puppet master database need to be backed up)_

## Backup procedures

> How does backup happen? Is service affected? Should the system be [partially] shut down first?

_(e.g. Backup happens from the read replica - live service is not affected)_

## Restore procedures

> How does restore happen? Is service affected? Should the system be [partially] shut down first?

_(e.g. The Booking service must be switched off before Restore happens otherwise transactions will be lost)_

