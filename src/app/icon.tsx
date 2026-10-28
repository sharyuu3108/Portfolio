import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export const size = {
  width: 32,
  height: 32,
};

export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 16,
          background: '#08090D',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#F04452',
          fontWeight: 700,
          borderRadius: '6px',
          border: '1.5px solid #F04452',
          fontFamily: 'monospace',
          letterSpacing: '-1px'
        }}
      >
        SP
      </div>
    ),
    {
      ...size,
    }
  );
}
