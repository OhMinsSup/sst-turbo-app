#!/usr/bin/env node
import { main } from './cli-main';

main()
  .then(() => process.exit(0))
  .catch(() => process.exit(1));
