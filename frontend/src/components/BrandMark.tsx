interface BrandMarkProps {
  compact?: boolean;
}

/** A small, accessible brand mark based on the C + growth curve in the CRECE logo. */
export default function BrandMark({ compact = false }: BrandMarkProps) {
  return (
    <div
      aria-hidden="true"
      className={`${compact ? "w-10 h-10" : "w-11 h-11"} rounded-2xl bg-[#183B45] shadow-[0_8px_18px_rgba(24,59,69,0.2)] flex items-center justify-center shrink-0`}
    >
      <svg viewBox="0 0 64 64" className="w-[76%] h-[76%]">
        <path d="M45 17.5A20 20 0 1 0 45 46.5" fill="none" stroke="#F7F7F0" strokeWidth="7" strokeLinecap="round" />
        <path d="M28 43c8 3 15 .7 19-5" fill="none" stroke="#D8B77D" strokeWidth="3.5" strokeLinecap="round" />
        <circle cx="47.5" cy="38" r="3" fill="#97C1A4" />
      </svg>
    </div>
  );
}
