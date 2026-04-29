// Ported from github.com/nicolereyes-design/hyperframes
// registry/components/grain-overlay/grain-overlay.html

export function GrainOverlay({ opacity = 0.12, speed = 0.5, zIndex = 50 }: {
  opacity?: number
  speed?: number
  zIndex?: number
}) {
  return (
    <>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex,
          overflow: 'hidden',
        }}
      >
        <div className="hf-grain-texture" />
      </div>

      <style>{`
        @keyframes hf-grain-noise {
          0%,100% { transform: translate(0,0); }
          10%  { transform: translate(-5%,-5%); }
          20%  { transform: translate(-10%,5%); }
          30%  { transform: translate(5%,-10%); }
          40%  { transform: translate(-5%,15%); }
          50%  { transform: translate(-10%,5%); }
          60%  { transform: translate(15%,0); }
          70%  { transform: translate(0,10%); }
          80%  { transform: translate(-15%,0); }
          90%  { transform: translate(10%,5%); }
        }

        .hf-grain-texture {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          opacity: ${opacity};
          animation: hf-grain-noise ${speed}s steps(1) infinite;
        }
      `}</style>
    </>
  )
}
