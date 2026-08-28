import React from "react";

export type CountryCode = "KE" | "UG" | "TZ" | "US" | "EU" | "GB" | "GLOBAL" | "CHROMEX";

interface FlagIconProps extends React.SVGProps<SVGSVGElement> {
  country: CountryCode | string;
  className?: string;
  size?: number;
}

// Static, precomputed coordinates for 12 EU stars to eliminate floating-point hydration discrepancies
const EU_STARS = [
  { cx: 0, cy: -150 },
  { cx: 75, cy: -129.9 },
  { cx: 129.9, cy: -75 },
  { cx: 150, cy: 0 },
  { cx: 129.9, cy: 75 },
  { cx: 75, cy: 129.9 },
  { cx: 0, cy: 150 },
  { cx: -75, cy: 129.9 },
  { cx: -129.9, cy: 75 },
  { cx: -150, cy: 0 },
  { cx: -129.9, cy: -75 },
  { cx: -75, cy: -129.9 },
];

export function FlagIcon({ country, className = "w-5 h-3.5 rounded-[2px] shadow-2xs inline-block flex-shrink-0", ...props }: FlagIconProps) {
  const code = (country || "").toUpperCase();

  switch (code) {
    case "KE":
    case "KENYA":
    case "KES":
      return (
        <svg viewBox="0 0 900 600" className={className} {...props}>
          {/* Kenya Flag */}
          <rect width="900" height="180" fill="#000000" />
          <rect y="180" width="900" height="30" fill="#FFFFFF" />
          <rect y="210" width="900" height="180" fill="#990000" />
          <rect y="390" width="900" height="30" fill="#FFFFFF" />
          <rect y="420" width="900" height="180" fill="#006600" />
          {/* Shield & Spears */}
          <g transform="translate(450, 300)">
            <ellipse rx="70" ry="120" fill="#990000" stroke="#000000" strokeWidth="6" />
            <path d="M-70,0 Q0,-60 70,0 Q0,60 -70,0" fill="#FFFFFF" opacity="0.9" />
            <ellipse rx="20" ry="50" fill="#000000" />
            <circle cx="0" cy="0" r="10" fill="#FFFFFF" />
          </g>
        </svg>
      );

    case "UG":
    case "UGANDA":
    case "UGX":
      return (
        <svg viewBox="0 0 900 600" className={className} {...props}>
          {/* Uganda Flag */}
          <rect width="900" height="100" fill="#000000" />
          <rect y="100" width="900" height="100" fill="#FCDC04" />
          <rect y="200" width="900" height="100" fill="#D90000" />
          <rect y="300" width="900" height="100" fill="#000000" />
          <rect y="400" width="900" height="100" fill="#FCDC04" />
          <rect y="500" width="900" height="100" fill="#D90000" />
          {/* Crest Circle */}
          <circle cx="450" cy="300" r="85" fill="#FFFFFF" />
          <circle cx="450" cy="300" r="50" fill="#808080" opacity="0.3" />
          <path d="M430,320 Q450,260 470,320 Z" fill="#000000" />
        </svg>
      );

    case "TZ":
    case "TANZANIA":
    case "TZS":
      return (
        <svg viewBox="0 0 900 600" className={className} {...props}>
          {/* Tanzania Flag */}
          <defs>
            <clipPath id="tz-clip">
              <rect width="900" height="600" />
            </clipPath>
          </defs>
          <g clipPath="url(#tz-clip)">
            <polygon points="0,0 900,0 0,600" fill="#1EB53A" />
            <polygon points="900,0 900,600 0,600" fill="#00A3DD" />
            <polygon points="0,600 0,460 900,0 900,140" fill="#FCD116" />
            <polygon points="0,600 0,500 900,0 900,100" fill="#000000" />
          </g>
        </svg>
      );

    case "CHROMEX":
    case "CHROMEX COLOURANT":
      return (
        <svg viewBox="0 0 600 400" className={className} {...props}>
          {/* Chromex Colourant Flag / Palette Emblem */}
          <rect width="600" height="400" fill="#32298A" rx="40" />
          <circle cx="180" cy="200" r="70" fill="#DCB353" />
          <circle cx="300" cy="200" r="70" fill="#E11D48" />
          <circle cx="420" cy="200" r="70" fill="#0284C7" />
          <path d="M200,200 L400,200" stroke="#FFFFFF" strokeWidth="12" strokeLinecap="round" opacity="0.6" />
        </svg>
      );

    case "US":
    case "USD":
    case "USA":
      return (
        <svg viewBox="0 0 7410 3900" className={className} {...props}>
          {/* US Flag */}
          <rect width="7410" height="3900" fill="#b22234" />
          <path
            d="M0,300H7410M0,900H7410M0,1500H7410M0,2100H7410M0,2700H7410M0,3300H7410"
            stroke="#fff"
            strokeWidth="300"
          />
          <rect width="2964" height="2100" fill="#3c3b6e" />
          <circle cx="1482" cy="1050" r="300" fill="#ffffff" opacity="0.8" />
        </svg>
      );

    case "EU":
    case "EUR":
    case "EUROPE":
      return (
        <svg viewBox="0 0 810 540" className={className} {...props}>
          {/* EU Flag with static coordinates */}
          <rect width="810" height="540" fill="#003399" />
          <g fill="#FFCC00" transform="translate(405, 270)">
            {EU_STARS.map((star, i) => (
              <circle key={i} cx={star.cx} cy={star.cy} r={14} />
            ))}
          </g>
        </svg>
      );

    case "GB":
    case "GBP":
    case "UK":
      return (
        <svg viewBox="0 0 60 30" className={className} {...props}>
          {/* UK Union Jack */}
          <clipPath id="uk-clip">
            <path d="M0,0 v30 h60 v-30 z" />
          </clipPath>
          <g clipPath="url(#uk-clip)">
            <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
            <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
            <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" />
            <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
            <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
          </g>
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      );
  }
}
