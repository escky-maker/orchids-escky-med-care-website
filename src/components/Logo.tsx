export function Logo({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#f43f5e" />
        </linearGradient>
        <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#d946ef" />
        </linearGradient>
      </defs>
      
      {/* Protective Circle - represents care and protection */}
      <circle
        cx="100"
        cy="100"
        r="85"
        fill="none"
        stroke="url(#accentGradient)"
        strokeWidth="3"
        opacity="0.3"
      />
      
      {/* Mother & Baby silhouette combined with heart */}
      <g>
        {/* Heart shape representing maternal love */}
        <path
          d="M100,160 C100,160 50,120 50,90 C50,75 60,65 75,65 C85,65 95,72 100,80 C105,72 115,65 125,65 C140,65 150,75 150,90 C150,120 100,160 100,160 Z"
          fill="url(#heartGradient)"
          opacity="0.9"
        />
        
        {/* Baby silhouette inside heart */}
        <g>
          {/* Baby head */}
          <circle cx="100" cy="95" r="12" fill="#fdf2f8" />
          
          {/* Baby body */}
          <ellipse cx="100" cy="115" rx="14" ry="18" fill="#fdf2f8" />
          
          {/* Arms */}
          <ellipse cx="88" cy="112" rx="4" ry="10" fill="#fdf2f8" transform="rotate(-25 88 112)" />
          <ellipse cx="112" cy="112" rx="4" ry="10" fill="#fdf2f8" transform="rotate(25 112 112)" />
        </g>
        
        {/* Protective hands cradling */}
        <path
          d="M70,105 Q65,115 70,125"
          stroke="url(#accentGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M130,105 Q135,115 130,125"
          stroke="url(#accentGradient)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />
      </g>
      
      {/* Medical cross - top accent */}
      <g opacity="0.8">
        <rect x="95" y="35" width="10" height="20" rx="2" fill="url(#accentGradient)" />
        <rect x="90" y="40" width="20" height="10" rx="2" fill="url(#accentGradient)" />
      </g>
      
      {/* Sparkles for care and wellness */}
      <g opacity="0.6">
        <path d="M165,70 L167,75 L172,77 L167,79 L165,84 L163,79 L158,77 L163,75 Z" fill="#fbbf24" />
        <path d="M40,75 L41,78 L44,79 L41,80 L40,83 L39,80 L36,79 L39,78 Z" fill="#fbbf24" />
        <path d="M170,120 L171,122 L173,123 L171,124 L170,126 L169,124 L167,123 L169,122 Z" fill="#fbbf24" />
      </g>
      
      {/* Heartbeat line - symbolizing life and vitality */}
      <path
        d="M30,145 L50,145 L55,135 L60,155 L65,145 L180,145"
        stroke="url(#heartGradient)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.4"
      />
    </svg>
  );
}

export function LogoIcon({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="iconGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#8b5cf6" />
        </linearGradient>
      </defs>
      
      {/* Simplified version for small sizes */}
      <path
        d="M100,160 C100,160 50,120 50,90 C50,75 60,65 75,65 C85,65 95,72 100,80 C105,72 115,65 125,65 C140,65 150,75 150,90 C150,120 100,160 100,160 Z"
        fill="url(#iconGradient)"
      />
      
      <circle cx="100" cy="95" r="12" fill="white" />
      <ellipse cx="100" cy="115" rx="14" ry="18" fill="white" />
    </svg>
  );
}
