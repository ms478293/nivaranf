type ImpactRingBadgeProps = {
  value?: string;
  className?: string;
};

export function ImpactRingBadge({
  value = "96%",
  className = "",
}: ImpactRingBadgeProps) {
  return (
    <div className={`relative w-32 h-32 group select-none ${className}`}>
      <div className="absolute -inset-2 rounded-full bg-[radial-gradient(circle,_rgba(44,119,187,0.28)_0%,_rgba(235,88,52,0.22)_46%,_transparent_72%)] blur-md opacity-90 transition-all duration-500 group-hover:blur-lg group-hover:opacity-100" />

      <div className="absolute inset-0 rounded-full [background:conic-gradient(from_0deg,_#eb5834_0deg,_#f36f44_74deg,_#2c77bb_160deg,_#2aa89a_248deg,_#eb5834_360deg)] animate-spin [animation-duration:8s] transition-all duration-500 group-hover:[animation-duration:2.8s] group-hover:scale-[1.03]" />

      <div className="absolute inset-[6px] rounded-full bg-white/95 shadow-[inset_0_0_0_2px_rgba(255,255,255,0.95)]" />

      <div className="absolute inset-[12px] rounded-full border border-primary-100/80 bg-white flex items-center justify-center shadow-sm">
        <span className="text-primary-main font-semibold text-[28px] leading-none tracking-tight">
          {value}
        </span>
      </div>

      <span className="absolute top-[12px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full bg-secondary-main shadow-[0_0_12px_rgba(44,119,187,0.9)] animate-pulse" />
      <span className="absolute bottom-[14px] right-[16px] w-2 h-2 rounded-full bg-primary-main shadow-[0_0_10px_rgba(235,88,52,0.9)] animate-pulse [animation-delay:300ms]" />
    </div>
  );
}
