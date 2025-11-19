# Pexels Images Fix - Debugging Guide

## Problem
Pexels images were not displaying on many pages of the website, showing placeholder images instead.

## Root Cause
The issue was caused by:
1. **Missing API Key**: The `NEXT_PUBLIC_PEXELS_API_KEY` environment variable was not configured in Vercel
2. **Silent Failures**: The Pexels API client was failing silently without proper error logging
3. **No Retry Logic**: Transient API failures were not being retried

## Solution Implemented

### 1. Enhanced Error Logging (`src/lib/pexels.ts`)
- Added comprehensive logging for API initialization
- Added detailed error messages with stack traces
- Added logging for API key validation
- Added request/response logging for debugging

### 2. Retry Logic (`src/lib/pexels.ts`)
- Implemented exponential backoff retry mechanism
- Configured for 3 retries with 1-second initial delay
- Backoff multiplier of 2x for each retry
- Helps handle transient API failures

### 3. Improved Fallback Behavior (`src/lib/hero-images.ts`)
- Added detailed logging for image search and validation
- Better error handling with specific error messages
- Graceful fallback to placeholder images when API fails
- Logs which images are filtered out and why

## How to Fix Pexels Images

### Step 1: Get a Pexels API Key
1. Go to https://www.pexels.com/api/
2. Sign up for a free account
3. Generate an API key (free tier: 200 requests/hour)

### Step 2: Configure Environment Variables

#### For Local Development:
1. Copy `.env.local.example` to `.env.local`:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and add your API key:
   ```
   NEXT_PUBLIC_PEXELS_API_KEY=your_actual_api_key_here
   ```

3. Restart your development server:
   ```bash
   npm run dev
   ```

#### For Vercel Deployment:
1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add a new environment variable:
   - **Name**: `NEXT_PUBLIC_PEXELS_API_KEY`
   - **Value**: Your Pexels API key
   - **Environments**: Select Production, Preview, and Development
4. Click **Save**
5. Redeploy your application:
   ```bash
   vercel --prod
   ```
   Or trigger a redeploy from the Vercel dashboard

### Step 3: Verify the Fix

#### Check Browser Console:
After deploying, open your browser's developer console and look for:
- `[Pexels] API client initialized successfully` - API key is configured
- `[Pexels] Searching for images: query="..."` - API calls are being made
- `[Pexels] Successfully retrieved X images` - Images are loading

#### Check for Errors:
If you see these messages, the API key is missing or invalid:
- `[Pexels] WARNING: NEXT_PUBLIC_PEXELS_API_KEY is not configured`
- `[Pexels] Cannot search images: API key not configured`

#### Check Server Logs:
In Vercel dashboard, check the **Functions** logs for:
- Pexels API errors
- Rate limiting issues
- Network failures

## Monitoring

The enhanced logging will help you identify issues:

### Success Indicators:
```
[Pexels] API client initialized successfully
[HeroImages] Searching for hero images with config: {...}
[Pexels] Searching for images: query="...", count=10
[Pexels] Successfully retrieved 10 images
[HeroImages] Successfully validated 3 images
```

### Failure Indicators:
```
[Pexels] WARNING: NEXT_PUBLIC_PEXELS_API_KEY is not configured
[Pexels] API call failed, retrying in 1000ms... (2 retries left)
[Pexels] Search failed after retries
[HeroImages] No photos returned from Pexels API, using fallback images
```

## Rate Limits

Pexels Free Tier:
- 200 requests per hour
- Rate limiting is implemented in the code to prevent exceeding limits
- Fallback images are used when rate limits are exceeded

## Fallback Behavior

When Pexels images fail to load:
1. The system automatically falls back to placeholder images from placehold.co
2. Placeholder images are branded with "Sierra Property Partners"
3. No broken images or layout issues occur
4. Users still get a functional experience

## Testing

To test if Pexels images are working:

1. **Homepage**: Should show a property-related hero image
2. **Services Page**: Should show a service-related hero image
3. **Location Pages**: Should show location-specific images
4. **Check Network Tab**: Look for requests to `images.pexels.com`

## Troubleshooting

### Images Still Not Loading?

1. **Check API Key**: Verify it's correctly set in Vercel environment variables
2. **Check Rate Limits**: You may have exceeded the 200 requests/hour limit
3. **Check Browser Console**: Look for error messages with `[Pexels]` prefix
4. **Check Network Tab**: See if requests to Pexels are being made
5. **Redeploy**: After adding environment variables, you must redeploy

### API Key Not Working?

1. Verify the API key is valid at https://www.pexels.com/api/
2. Check if the API key has the correct permissions
3. Ensure there are no extra spaces in the environment variable value
4. Try regenerating the API key

## Files Modified

- `src/lib/pexels.ts` - Added logging, retry logic, and error handling
- `src/lib/hero-images.ts` - Enhanced logging and fallback behavior
- `.env.local.example` - Created example environment file

## Next Steps

1. Configure `NEXT_PUBLIC_PEXELS_API_KEY` in Vercel
2. Redeploy the application
3. Monitor browser console for success/error messages
4. Verify images are loading on all pages

## Support

If issues persist after following this guide:
1. Check the browser console for detailed error messages
2. Check Vercel function logs for server-side errors
3. Verify the API key is valid and has available quota
4. Consider upgrading to Pexels Pro for higher rate limits if needed
