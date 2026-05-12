export function SectionDivider() {
  return (
    <div
      className="flex w-full items-center gap-4 px-4 py-5 sm:px-6 sm:py-6"
      role="separator"
      aria-hidden
    >
      <div className="h-px flex-1 bg-[var(--glass-border)]" />
      <span className="font-mono-accent text-xs text-[var(--gold)]">◆</span>
      <div className="h-px flex-1 bg-[var(--glass-border)]" />
    </div>
  );
}
