# Listings Page Documentation

## Overview
The Listings page integrates the Appfolio property management widget to display available rental properties. It features comprehensive error handling, loading states, accessibility support, and responsive design.

## Architecture

### Components

#### 1. `/app/listings/page.tsx`
Main page component with:
- SEO metadata (title, description, Open Graph, Twitter cards)
- JSON-LD structured data (BreadcrumbList, LocalBusiness)
- Hero section with property type badges
- ListingsWidget integration
- Info cards highlighting service benefits

#### 2. `/components/listings/ListingsWidget.tsx`
Client-side widget component that:
- Dynamically loads Appfolio script
- Initializes widget with configuration
- Handles loading states with skeleton UI
- Manages error states with user-friendly messaging
- Implements accessibility features (ARIA labels, screen reader announcements)
- Tracks analytics events
- Cleans up resources on unmount

#### 3. `/app/listings/loading.tsx`
Server-side loading UI with skeleton screens

#### 4. `/app/listings/error.tsx`
Error boundary component with recovery options

### Type Definitions

#### `ListingsWidgetConfig` (`/types/listings.ts`)
```typescript
interface ListingsWidgetConfig {
  hostUrl: string;
  propertyGroup?: string;
  themeColor: string;
  height: string;
  width: string;
  defaultOrder: "date_posted" | "price" | "bedrooms" | "name";
}
```

## Configuration

### Default Widget Settings
- **Host URL**: `sierraproppartners.appfolio.com`
- **Theme Color**: `#F8F6F` (matches site design)
- **Height**: `800px`
- **Width**: `100%`
- **Sort Order**: `date_posted`

### Customization
Pass custom config to the widget component:
```tsx
<ListingsWidget 
  config={{
    height: "600px",
    propertyGroup: "Residential"
  }} 
/>
```

## Features

### SEO Optimization
- Static metadata generation
- Open Graph tags for social sharing
- Twitter Card tags
- JSON-LD structured data:
  - BreadcrumbList for navigation
  - LocalBusiness schema
- Semantic HTML structure

### Accessibility
- ARIA labels and roles
- Screen reader announcements for state changes
- Keyboard navigation support
- Focus management
- High contrast error states
- Skip links (via main layout)

### Performance
- Lazy script loading (async)
- Loading skeleton reduces CLS
- Script cleanup on unmount
- 15-second timeout for script load
- Minimal bundle impact (client-side only where needed)

### Error Handling
Three-tier error handling:
1. **Script Load Failure**: Network/CDN issues
2. **Widget Initialization Failure**: Runtime errors
3. **Timeout**: Script takes too long to load

Error UI provides:
- Clear error messaging
- Refresh button
- Contact support link
- Error tracking (digest ID when available)

### Analytics
Built-in event tracking for:
- Widget loaded successfully
- Widget errors (with error type)
- User interactions (ready for implementation)

Integration point for Google Analytics, Plausible, etc.:
```typescript
if (window.gtag) {
  window.gtag('event', eventName, properties);
}
```

## Security Considerations

### Content Security Policy (CSP)
The widget loads external scripts. Ensure your CSP includes:
```
script-src 'self' https://sierraproppartners.appfolio.com;
frame-src 'self' https://sierraproppartners.appfolio.com;
```

### Script Integrity
- Script loaded over HTTPS only
- Error handling for failed loads
- No inline script execution

## Testing

### Unit Tests (`ListingsWidget.test.tsx`)
- Component rendering
- Loading states
- Error states
- Configuration handling
- Cleanup on unmount
- Accessibility features

Run unit tests:
```bash
npm run test
```

### E2E Tests (`tests/e2e/listings.spec.ts`)
- Page metadata
- Widget loading
- Responsive design
- Error scenarios
- Accessibility
- Keyboard navigation

Run E2E tests:
```bash
npm run test:e2e
```

## Responsive Design

### Breakpoints
- **Mobile** (< 768px): Single column, stacked layout
- **Tablet** (768px - 1024px): Adjusted spacing
- **Desktop** (> 1024px): Full multi-column grid

### Widget Responsiveness
- Width: 100% (fluid)
- Height: Fixed at 800px (configurable)
- Appfolio widget handles internal responsiveness

## Maintenance

### Updating Configuration
Edit default config in `ListingsWidget.tsx`:
```typescript
const defaultConfig: ListingsWidgetConfig = {
  hostUrl: "sierraproppartners.appfolio.com",
  themeColor: "#F8F6F",
  // ... other settings
};
```

### Monitoring
Watch for:
- Script load failures (check analytics)
- CSP violations (browser console)
- Widget initialization errors
- Performance metrics (loading time)

### Troubleshooting

**Widget not loading:**
1. Check browser console for CSP errors
2. Verify Appfolio script URL is accessible
3. Check network tab for blocked requests
4. Ensure proper CSP headers

**Styling conflicts:**
- Widget uses iframe, minimal style bleed
- Ensure theme color matches site palette
- Check z-index stacking for overlays

## Future Enhancements

### Planned Features
- [ ] Advanced analytics integration
- [ ] Property favorites/save functionality
- [ ] Direct contact form integration per listing
- [ ] Map view toggle
- [ ] Enhanced filtering UI
- [ ] Share listing functionality
- [ ] Print-friendly view

### Performance Optimizations
- [ ] Preconnect to Appfolio domain
- [ ] Intersection Observer for lazy initialization
- [ ] Service Worker caching for script
- [ ] Progressive enhancement strategy

## Related Documentation
- [Next.js App Router](https://nextjs.org/docs/app)
- [Appfolio API Documentation](https://www.appfolio.com/developers)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [React Testing Library](https://testing-library.com/react)

## Support
For issues or questions:
- Create a GitHub issue
- Contact development team
- Check Appfolio support documentation
