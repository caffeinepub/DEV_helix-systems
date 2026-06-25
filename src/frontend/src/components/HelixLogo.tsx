interface HelixLogoProps {
  size?: number;
  className?: string;
}

export function HelixLogo({ size = 36, className = "" }: HelixLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Helix Systems logo"
    >
      {/* Strand A — left helix curve */}
      <path
        d="M10 4 C10 4, 16 8, 16 13 C16 18, 10 22, 10 27 C10 30, 13 32, 16 32"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Strand B — right helix curve */}
      <path
        d="M26 4 C26 4, 20 8, 20 13 C20 18, 26 22, 26 27 C26 30, 23 32, 20 32"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />
      {/* Cross-rungs */}
      <line
        x1="10"
        y1="8.5"
        x2="26"
        y2="8.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.55"
      />
      <line
        x1="13"
        y1="13.5"
        x2="23"
        y2="13.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.55"
      />
      <line
        x1="10"
        y1="18.5"
        x2="26"
        y2="18.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.55"
      />
      <line
        x1="13"
        y1="23.5"
        x2="23"
        y2="23.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.55"
      />
      <line
        x1="10"
        y1="28.5"
        x2="26"
        y2="28.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.55"
      />
      {/* End nodes */}
      <circle cx="10" cy="4" r="2" fill="currentColor" />
      <circle cx="26" cy="4" r="2" fill="currentColor" opacity="0.85" />
      <circle cx="16" cy="32" r="2" fill="currentColor" />
      <circle cx="20" cy="32" r="2" fill="currentColor" opacity="0.85" />
    </svg>
  );
}
