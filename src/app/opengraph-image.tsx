import { ImageResponse } from 'next/og'
 
export const runtime = 'edge'
 
export const alt = 'Sierra Property Partners'
export const size = {
  width: 1200,
  height: 630,
}
 
export const contentType = 'image/png'
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'linear-gradient(to bottom right, #047857, #059669)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          padding: '40px',
        }}
      >
        <div style={{ fontWeight: 'bold', marginBottom: '20px' }}>
          Sierra Property Partners
        </div>
        <div style={{ fontSize: 48, textAlign: 'center' }}>
          Professional Property Management
        </div>
        <div style={{ fontSize: 36, marginTop: '20px' }}>
          Northern California
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
