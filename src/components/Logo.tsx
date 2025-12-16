interface LogoProps {
  className?: string;
}

export const Logo = ({ className = "w-12 h-12" }: LogoProps) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#ea580c", stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: "#f43f5e", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#fb923c", stopOpacity: 1 }} />
        </linearGradient>
        <linearGradient id="accentGradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#fbbf24", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#f59e0b", stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      {/* Protective Circle - represents care and protection */}
      <circle
        cx="50"
        cy="50"
        r="40"
        fill="none"
        stroke="url(#accentGradient)"
        strokeWidth="2"
        opacity="0.3"
      />
      
      {/* Mother & Baby silhouette combined with heart */}
      <g>
        {/* Heart shape representing maternal love */}
        <path
          d="M50 75 C 35 65, 20 50, 20 35 C 20 25, 28 18, 35 18 C 42 18, 48 22, 50 28 C 52 22, 58 18, 65 18 C 72 18, 80 25, 80 35 C 80 50, 65 65, 50 75 Z"
          fill="url(#heartGradient)"
          stroke="url(#accentGradient)"
          strokeWidth="2"
        />
        
        {/* Baby silhouette inside heart */}
        <g>
          {/* Baby head */}
          <circle cx="50" cy="45" r="6" fill="#fdf2f8" />
          
          {/* Baby body */}
          <ellipse cx="50" cy="65" rx="8" ry="12" fill="#fdf2f8" />
          
          {/* Arms */}
          <ellipse cx="38" cy="62" rx="2" ry="6" fill="#fdf2f8" transform="rotate(-25 38 62)" />
          <ellipse cx="62" cy="62" rx="2" ry="6" fill="#fdf2f8" transform="rotate(25 62 62)" />
        </g>
        
        {/* Protective hands cradling */}
        <path
          d="M30,45 Q25,55 30,65"
          stroke="url(#accentGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />
        <path
          d="M70,45 Q75,55 70,65"
          stroke="url(#accentGradient)"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />
      </g>
      
      {/* Medical cross - top accent */}
      <g opacity="0.8">
        <rect x="45" y="25" width="10" height="20" rx="2" fill="url(#accentGradient)" />
        <rect x="40" y="30" width="20" height="10" rx="2" fill="url(#accentGradient)" />
      </g>
      
      {/* Sparkles for care and wellness */}
      <g opacity="0.6">
        <path d="M85,30 L87,35 L92,37 L87,39 L85,44 L83,39 L78,37 L83,35 Z" fill="#fbbf24" />
        <path d="M15,35 L16,38 L19,39 L16,40 L15,43 L14,40 L11,39 L14,38 Z" fill="#fbbf24" />
        <path d="M80,60 L81,62 L83,63 L81,64 L80,66 L79,64 L77,63 L79,62 Z" fill="#fbbf24" />
      </g>
      
      {/* Heartbeat line - symbolizing life and vitality */}
      <path
        d="M20,65 L40,65 L45,55 L50,75 L55,65 L90,65"
        stroke="url(#heartGradient)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
        opacity="0.4"
      />
      
      <circle cx="35" cy="25" r="2" fill="#fbbf24" opacity="0.8">
        <animate attributeName="opacity" values="0.8;1;0.8" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="70" cy="30" r="1.5" fill="#fbbf24" opacity="0.6">
        <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="25" cy="40" r="1.5" fill="#fb923c" opacity="0.7">
        <animate attributeName="opacity" values="0.7;1;0.7" dur="3s" repeatCount="indefinite" />
      </circle>
    </svg>
  );
};

export const LogoIcon = ({ className = "w-8 h-8" }: LogoProps) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="heartGradientIcon" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: "#ea580c", stopOpacity: 1 }} />
          <stop offset="50%" style={{ stopColor: "#f43f5e", stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: "#fb923c", stopOpacity: 1 }} />
        </linearGradient>
      </defs>

      <path
        d="M50 75 C 35 65, 20 50, 20 35 C 20 25, 28 18, 35 18 C 42 18, 48 22, 50 28 C 52 22, 58 18, 65 18 C 72 18, 80 25, 80 35 C 80 50, 65 65, 50 75 Z"
        fill="url(#heartGradientIcon)"
      />
    </svg>
  );
};