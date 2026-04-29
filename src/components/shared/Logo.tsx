export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
        style={{ backgroundColor: 'var(--color-primary)' }}
      >
        W
      </div>
      <span className="font-semibold text-base tracking-tight">WanderMind</span>
    </div>
  )
}
