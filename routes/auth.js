
import express from 'express';
import pb from '../utils/pocketbaseClient.js';
import logger from '../utils/logger.js';

const router = express.Router();

// Validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Generate 6-digit OTP
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// POST /send-otp-email
router.post('/send-otp-email', async (req, res) => {
  const { email } = req.body;

  // Validate email format
  if (!email || !isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  const normalizedEmail = email.toLowerCase().trim();

  // Query Users collection for email match
  const user = await pb.collection('users').getFirstListItem(`email = "${normalizedEmail}"`);

  // Generate OTP
  const otp = generateOTP();
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();

  // Delete any existing passwordResetOtps record for this email
  try {
    const existingOtp = await pb.collection('passwordResetOtps').getFirstListItem(`email = "${normalizedEmail}"`);
    await pb.collection('passwordResetOtps').delete(existingOtp.id);
  } catch (error) {
    // Ignore if no existing OTP record found
  }

  // Create new passwordResetOtps record
  const otpRecord = await pb.collection('passwordResetOtps').create({
    email: normalizedEmail,
    userId: user.id,
    otp,
    verified: false,
    expiresAt,
    attemptCount: 0,
  });

  logger.info(`OTP sent to ${normalizedEmail}`);

  res.json({
    success: true,
    message: 'Code sent to your email',
    resetSessionId: otpRecord.id,
  });
});

// POST /verify-otp (Registration/Verification Flow)
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  
  try {
    // Verify OTP logic here...
    // Assuming user is created or verified successfully:
    const normalizedEmail = email.toLowerCase().trim();
    const user = await pb.collection('users').getFirstListItem(`email = "${normalizedEmail}"`);
    
    // Check if balance record exists, if not create it
    try {
      await pb.collection('user_balance').getFirstListItem(`uid = "${user.id}"`);
      logger.info(`Balance record already exists for user ${user.id}`);
    } catch (err) {
      if (err.status === 404) {
        // Record doesn't exist, create it
        await pb.collection('user_balance').create({
          uid: user.id,
          balance: 1000,
          totalDeposited: 0,
          totalWithdrawn: 0,
          totalTraded: 0,
          lastUpdatedBy: 'system',
          lastAction: 'account_created',
          lastActionAt: new Date().toISOString()
        });
        logger.info(`Created initial balance record for user ${user.id}`);
      }
    }
    
    res.json({ success: true, message: 'Verified successfully' });
  } catch (error) {
    logger.error(`Verification failed: ${error.message}`);
    res.status(400).json({ error: 'Verification failed' });
  }
});

export default router;
