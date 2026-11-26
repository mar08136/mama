import { ImageResponse } from 'next/og';

export const alt = "Mama's Kitchen – Ethiopian restaurant in Addis Ababa";
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Typographic share card (no photography, so nothing here can misrepresent the restaurant).
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1f1315',
          color: '#fffaf8',
          border: '14px solid #de1e2d',
        }}
      >
        <div style={{ fontSize: 120, fontWeight: 700, letterSpacing: -2 }}>Mama&apos;s Kitchen</div>
        <div style={{ fontSize: 38, color: '#ff8d95', marginTop: 18 }}>Ethiopian &amp; International · Addis Ababa</div>
        <div style={{ width: 120, height: 4, background: '#c0152a', marginTop: 40 }} />
        <div style={{ fontSize: 34, marginTop: 40, opacity: 0.9 }}>Where Every Meal Feels Like Home.</div>
      </div>
    ),
    size,
  );
}
