// This file was mistakenly created as a hook but contained migration syntax.
// The correct migration file is: pb_migrations/1778421000_003_add_asset_fields_to_user_balance.js
// This file has been neutralized to prevent startup panics.
// It can be safely deleted manually if needed.

// No-op hook - does nothing
onRecordAfterCreateSuccess((e) => {
  e.next();
}, "*");
