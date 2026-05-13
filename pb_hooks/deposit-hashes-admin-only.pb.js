/// <reference path="../pb_data/types.d.ts" />
onRecordUpdateRequest((e) => {
  // Check if depositHashes field is being modified
  if (e.requestInfo.data && e.requestInfo.data.depositHashes !== undefined) {
    // Only allow admins to update depositHashes
    if (!e.auth || !e.auth.get("is_admin")) {
      throw new BadRequestError("Only admins can update deposit hashes");
    }
  }
  e.next();
}, "users");