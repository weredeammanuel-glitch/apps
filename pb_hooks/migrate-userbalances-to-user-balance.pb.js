/// <reference path="../pb_data/types.d.ts" />

onBootstrap((e) => {
  console.log("🔄 Starting userBalances to user_balance migration...");

  try {
    // Check if user_balance collection exists
    try {
      e.app.dao().findCollectionByNameOrId("user_balance");
    } catch (err) {
      console.log("⚠️ user_balance collection does not exist. Skipping migration.");
      e.next();
      return;
    }

    // Check if migration has already been done by checking if user_balance has any records
    const existingUserBalances = e.app.dao().findRecordsByFilter(
      "user_balance",
      "id != ''",
      "-created",
      1,
      0
    );

    if (existingUserBalances && existingUserBalances.length > 0) {
      console.log("✅ Migration already completed (user_balance has records). Skipping.");
      e.next();
      return;
    }

    // Fetch all records from userBalances collection
    let userBalancesRecords;
    try {
      userBalancesRecords = e.app.dao().findRecordsByFilter(
        "userBalances",
        "id != ''",
        "-created",
        500,
        0
      );
    } catch (err) {
      console.log("⚠️ userBalances collection does not exist or is empty. Skipping migration.");
      e.next();
      return;
    }

    if (!userBalancesRecords || userBalancesRecords.length === 0) {
      console.log("ℹ️ No records found in userBalances collection. Nothing to migrate.");
      e.next();
      return;
    }

    console.log(`📊 Found ${userBalancesRecords.length} records to migrate from userBalances`);

    // Get the user_balance collection
    const userBalanceCollection = e.app.dao().findCollectionByNameOrId("user_balance");

    let successCount = 0;
    let errorCount = 0;

    // Migrate each record
    for (let i = 0; i < userBalancesRecords.length; i++) {
      const oldRecord = userBalancesRecords[i];
      
      try {
        // Create new record in user_balance collection
        const newRecord = new Record(userBalanceCollection);
        
        newRecord.set("uid", oldRecord.get("uid"));
        newRecord.set("balance", oldRecord.get("balance") || 0);
        newRecord.set("lastUpdatedBy", "system");
        newRecord.set("lastAction", "account_created");

        // Save the new record
        e.app.dao().saveRecord(newRecord);
        successCount++;
        
        if ((i + 1) % 10 === 0) {
          console.log(`✅ Migrated ${i + 1}/${userBalancesRecords.length} records...`);
        }
      } catch (err) {
        errorCount++;
        console.error(`❌ Error migrating record ${oldRecord.id}:`, err.message);
      }
    }

    console.log(`✅ Migration completed: ${successCount} successful, ${errorCount} errors`);
  } catch (err) {
    console.error("❌ Migration failed with error:", err.message);
  }

  e.next();
});
