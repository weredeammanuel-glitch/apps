
#!/bin/bash

echo "Starting cleanup of unused files..."

FILES_TO_DELETE=(
  "apps/web/src/pages/auth/ForgotPasswordPage.jsx"
  "apps/web/src/pages/auth/VerifyResetOtpPage.jsx"
  "apps/web/src/pages/auth/ResetPasswordPage.jsx"
  "apps/web/src/pages/auth/ResetPasswordCard.jsx"
  "apps/web/src/pages/DepositCardPage.jsx"
  "apps/web/src/hooks/useDepositHashTemplate.js"
  "apps/web/src/pages/admin/components/AdminUsdcDepositPanel.jsx"
  "apps/web/src/pages/admin/components/DepositHashSubmissionPanel.jsx"
  "apps/web/src/pages/admin/components/DepositHashManagementSection.jsx"
  "apps/web/src/pages/admin/components/DepositHashDisplay.jsx"
  "apps/web/src/pages/admin/components/AssetAllocationControl.jsx"
)

for file in "${FILES_TO_DELETE[@]}"; do
  if [ -f "$file" ]; then
    rm -f "$file"
    echo "Deleted: $file"
  else
    echo "Skipped (not found): $file"
  fi
done

echo "Cleanup complete!"
