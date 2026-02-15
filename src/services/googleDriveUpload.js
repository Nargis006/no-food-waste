/**
 * Google Drive Upload Integration Example
 * 
 * This module demonstrates how to integrate Google Drive upload functionality
 * for storing pickup images.
 */

// Frontend: Upload images to backend
export async function uploadImagesToGoogleDrive(files) {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append('images', file);
  });

  const response = await fetch('/api/upload-images', {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('nofoodwaste_token')}`,
    },
  });

  if (!response.ok) {
    throw new Error('Upload failed');
  }

  return response.json();
}

/**
 * Backend Example (Node.js/Express)
 * 
 * This is a sample backend implementation using Google Drive API.
 * Place this in your backend server.
 */

/*
// backend/routes/upload.js

const { google } = require('googleapis');
const multer = require('multer');
const stream = require('stream');

// Configure multer for memory storage
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Google Drive authentication
const auth = new google.auth.GoogleAuth({
  keyFile: 'service_account.json',
  scopes: ['https://www.googleapis.com/auth/drive.file'],
});

const drive = google.drive({ version: 'v3', auth });

// Folder ID for NOFoodWaste uploads
const FOLDER_ID = 'your_google_drive_folder_id';

router.post('/upload-images', upload.array('images', 5), async (req, res) => {
  try {
    const uploadedFiles = [];

    for (const file of req.files) {
      // Create a readable stream from buffer
      const bufferStream = new stream.PassThrough();
      bufferStream.end(file.buffer);

      // Upload to Google Drive
      const response = await drive.files.create({
        requestBody: {
          name: `pickup_${Date.now()}_${file.originalname}`,
          parents: [FOLDER_ID],
        },
        media: {
          mimeType: file.mimetype,
          body: bufferStream,
        },
        fields: 'id, webViewLink, webContentLink',
      });

      // Make file publicly accessible
      await drive.permissions.create({
        fileId: response.data.id,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        },
      });

      uploadedFiles.push({
        id: response.data.id,
        url: response.data.webViewLink,
        downloadUrl: response.data.webContentLink,
      });
    }

    res.json({
      success: true,
      files: uploadedFiles,
    });
  } catch (error) {
    console.error('Google Drive upload error:', error);
    res.status(500).json({ error: 'Upload failed' });
  }
});

module.exports = router;
*/

/**
 * Service Account Setup Instructions:
 * 
 * 1. Go to Google Cloud Console (https://console.cloud.google.com)
 * 2. Create a new project or select existing one
 * 3. Enable Google Drive API
 * 4. Create a Service Account:
 *    - Go to "IAM & Admin" > "Service Accounts"
 *    - Click "Create Service Account"
 *    - Give it a name and description
 *    - Click "Create and Continue"
 * 5. Create a key:
 *    - Click on the created service account
 *    - Go to "Keys" tab
 *    - Add Key > Create New Key > JSON
 *    - Save the downloaded file as 'service_account.json'
 * 6. Share the Google Drive folder with the service account email
 *    (found in the JSON file as "client_email")
 */

export default {
  uploadImagesToGoogleDrive,
};
