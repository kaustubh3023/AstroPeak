interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export default function Logo({ size = 'md', className = '' }: LogoProps) {
  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className={`${sizeClasses[size]} ${className}`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full"
        style={{ filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))' }}
      >
        {/* Outer Circle */}
        <circle
          cx="50"
          cy="50"
          r="48"
          fill="none"
          stroke="hsl(43, 74%, 52%)"
          strokeWidth="2"
        />
        
        {/* Inner Circle */}
        <circle
          cx="50"
          cy="50"
          r="42"
          fill="none"
          stroke="hsl(43, 74%, 52%)"
          strokeWidth="1"
          opacity="0.6"
        />
        
        {/* Background */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="hsl(216, 47%, 8%)"
        />
        
        {/* Eye at top */}
        <g transform="translate(50, 20)">
          <ellipse cx="0" cy="0" rx="6" ry="4" fill="none" stroke="hsl(43, 74%, 52%)" strokeWidth="1.5"/>
          <circle cx="0" cy="0" r="2" fill="hsl(43, 74%, 52%)"/>
          <circle cx="0" cy="0" r="1" fill="hsl(216, 47%, 8%)"/>
          {/* Three dots above eye */}
          <circle cx="-4" cy="-8" r="0.8" fill="hsl(43, 74%, 52%)" opacity="0.7"/>
          <circle cx="0" cy="-8" r="0.8" fill="hsl(43, 74%, 52%)" opacity="0.7"/>
          <circle cx="4" cy="-8" r="0.8" fill="hsl(43, 74%, 52%)" opacity="0.7"/>
        </g>
        
        {/* Lotus Flower */}
        <g transform="translate(50, 50)">
          {/* Outer petals */}
          <path d="M0,-12 Q-8,-8 -6,0 Q-8,8 0,12 Q8,8 6,0 Q8,-8 0,-12 Z" fill="none" stroke="hsl(43, 74%, 52%)" strokeWidth="1.5"/>
          <path d="M-8.5,-8.5 Q-12,-4 -8.5,0 Q-12,4 -8.5,8.5 Q-4,12 0,8.5 Q4,12 8.5,8.5 Q12,4 8.5,0 Q12,-4 8.5,-8.5 Q4,-12 0,-8.5 Q-4,-12 -8.5,-8.5 Z" fill="none" stroke="hsl(43, 74%, 52%)" strokeWidth="1"/>
          {/* Inner petals */}
          <path d="M0,-8 Q-5,-6 -4,0 Q-5,6 0,8 Q5,6 4,0 Q5,-6 0,-8 Z" fill="none" stroke="hsl(41, 73%, 77%)" strokeWidth="1"/>
          {/* Center */}
          <circle cx="0" cy="0" r="2" fill="hsl(43, 74%, 52%)" opacity="0.3"/>
        </g>
        
        {/* SSCS Text */}
        <text x="50" y="70" textAnchor="middle" className="font-bold" style={{ fill: 'hsl(43, 74%, 52%)', fontSize: '14px', fontFamily: 'Playfair Display, serif' }}>
          SSCS
        </text>
        
        {/* Moon on left */}
        <g transform="translate(18, 50)">
          <path d="M0,-4 Q-4,0 0,4 Q2,0 0,-4 Z" fill="hsl(43, 74%, 52%)" opacity="0.8"/>
        </g>
        
        {/* Star on right */}
        <g transform="translate(82, 35)">
          <path d="M0,-3 L1,0 L3,0 L1,2 L2,4 L0,3 L-2,4 L-1,2 L-3,0 L-1,0 Z" fill="hsl(43, 74%, 52%)" opacity="0.8"/>
        </g>
        
        {/* Radiating lines */}
        <g stroke="hsl(43, 74%, 52%)" strokeWidth="1" opacity="0.4">
          {/* Top rays */}
          <line x1="50" y1="5" x2="50" y2="12" />
          <line x1="60" y1="8" x2="58" y2="14" />
          <line x1="69" y1="15" x2="65" y2="19" />
          <line x1="75" y1="25" x2="70" y2="27" />
          <line x1="40" y1="8" x2="42" y2="14" />
          <line x1="31" y1="15" x2="35" y2="19" />
          <line x1="25" y1="25" x2="30" y2="27" />
          
          {/* Bottom rays */}
          <line x1="50" y1="95" x2="50" y2="88" />
          <line x1="60" y1="92" x2="58" y2="86" />
          <line x1="69" y1="85" x2="65" y2="81" />
          <line x1="75" y1="75" x2="70" y2="73" />
          <line x1="40" y1="92" x2="42" y2="86" />
          <line x1="31" y1="85" x2="35" y2="81" />
          <line x1="25" y1="75" x2="30" y2="73" />
        </g>
        
        {/* Small decorative dots */}
        <g fill="hsl(43, 74%, 52%)" opacity="0.3">
          <circle cx="20" cy="30" r="0.5" />
          <circle cx="80" cy="30" r="0.5" />
          <circle cx="20" cy="70" r="0.5" />
          <circle cx="80" cy="70" r="0.5" />
          <circle cx="30" cy="15" r="0.5" />
          <circle cx="70" cy="15" r="0.5" />
          <circle cx="30" cy="85" r="0.5" />
          <circle cx="70" cy="85" r="0.5" />
        </g>
        
        {/* Bottom decorative elements */}
        <g transform="translate(50, 85)">
          <path d="M-6,0 L-3,-2 L0,0 L3,-2 L6,0" fill="none" stroke="hsl(43, 74%, 52%)" strokeWidth="1" opacity="0.6"/>
          <circle cx="-8" cy="0" r="0.8" fill="hsl(43, 74%, 52%)" opacity="0.5"/>
          <circle cx="8" cy="0" r="0.8" fill="hsl(43, 74%, 52%)" opacity="0.5"/>
          <path d="M-2,2 Q0,4 2,2" fill="none" stroke="hsl(43, 74%, 52%)" strokeWidth="1" opacity="0.6"/>
          <path d="M2,2 Q4,4 6,2" fill="none" stroke="hsl(43, 74%, 52%)" strokeWidth="1" opacity="0.6"/>
          <path d="M-6,2 Q-4,4 -2,2" fill="none" stroke="hsl(43, 74%, 52%)" strokeWidth="1" opacity="0.6"/>
        </g>
      </svg>
    </div>
  );
}