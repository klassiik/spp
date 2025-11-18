# Sierra Property Partners - Vercel Deployment

## Production Domain
- **Primary**: https://sierrapropertypartners.com
- **Vercel**: https://spp-website.vercel.app (auto-generated)

## Environment Variables to Set in Vercel

Navigate to Vercel Dashboard > Your Project > Settings > Environment Variables

### Required Variables:
\\\
NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=UvsIVcqNlpf3VN3yPaFYH0ea72SpmkwJMpHHS4kqb10
UNSPLASH_SECRET_KEY=7zUtlDZMdDX5cK2I0MAU41DVcqzBxzwKwK5CSECQWw8
UNSPLASH_APP_ID=830902
NEXT_PUBLIC_SITE_URL=https://sierrapropertypartners.com
\\\

## Deployment Steps

1. **Push to GitHub**
   \\\powershell
   git add .
   git commit -m "Initial Sierra Property Partners website setup"
   git push origin main
   \\\

2. **Connect to Vercel**
   - Visit https://vercel.com/new
   - Import your GitHub repository
   - Configure project settings:
     - Framework Preset: Next.js
     - Root Directory: ./
     - Build Command: npm run build
     - Output Directory: .next

3. **Add Environment Variables**
   - Copy all variables from above
   - Set them in Vercel dashboard for Production, Preview, and Development

4. **Configure Custom Domain**
   - Go to Project Settings > Domains
   - Add: sierrapropertypartners.com
   - Add DNS records at your domain registrar:
     - Type: A, Name: @, Value: 76.76.21.21
     - Type: CNAME, Name: www, Value: cname.vercel-dns.com

5. **Deploy**
   - Vercel will automatically deploy on every push to main
   - Preview deployments for all pull requests

## Post-Deployment Checklist

- [ ] Verify all 60 location pages work: /services/placer/roseville
- [ ] Check all 21 service pages: /services/residential-property-management
- [ ] Test Unsplash images load correctly
- [ ] Validate schema.org structured data with Google Rich Results Test
- [ ] Run Lighthouse audit (target 90+ scores)
- [ ] Test mobile responsiveness
- [ ] Verify sitemap.xml is accessible
- [ ] Submit sitemap to Google Search Console
- [ ] Configure Google My Business integration
- [ ] Set up Google Analytics/Tag Manager

## Performance Optimization on Vercel

- ✅ Automatic image optimization (Next.js Image component)
- ✅ Edge caching for static assets
- ✅ Serverless functions for API routes
- ✅ Turbopack for faster dev builds
- ✅ Automatic HTTPS/SSL

## Monitoring

- **Vercel Analytics**: Enable in dashboard for performance insights
- **Error Tracking**: Consider Sentry or Vercel's built-in monitoring
- **Uptime**: Vercel provides 99.99% uptime SLA

## Support

Contact Vercel support for deployment issues: https://vercel.com/support
