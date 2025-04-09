import { google } from 'googleapis';

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'https://developers.google.com/oauthplayground'
);

async function getTokens() {
  try {
    const { tokens } = await oauth2Client.getToken('4/0Ab_5qlkJ4Y0gNBxs5MLQCqHB0MxAZ7QDI6BJvjV8hQrtn6RNaPyjDSNCOtbYNBoOKTuLUA');
    console.log('Access Token:', tokens.access_token);
    console.log('Refresh Token:', tokens.refresh_token);
    console.log('Expiry:', tokens.expiry_date);
  } catch (error) {
    console.error('Error getting tokens:', error);
  }
}

getTokens();