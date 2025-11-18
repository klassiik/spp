import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Sierra Property Partners',
    short_name: 'SPP',
    description: 'Professional property management services across Northern California',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#047857',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
  }
}
