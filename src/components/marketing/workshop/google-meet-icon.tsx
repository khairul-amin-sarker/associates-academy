import React from "react";

export function GoogleMeetIcon({
  className = "h-5 w-5 shrink-0",
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 96 80"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Google Meet logo"
    >
      {/* Google Meet authentic multi-polygon vector camera */}
      {/* Top Left Quadrant - Red */}
      <path
        d="M32 0H10C4.48 0 0 4.48 0 10V32H32V0Z"
        fill="#EA4335"
      />
      {/* Top Right Quadrant - Yellow */}
      <path
        d="M58 0H32V32H64V6C64 2.69 61.31 0 58 0Z"
        fill="#FBBC04"
      />
      {/* Bottom Left Quadrant - Blue */}
      <path
        d="M0 32V54C0 59.52 4.48 64 10 64H32V32H0Z"
        fill="#4285F4"
      />
      {/* Bottom Right Quadrant - Green */}
      <path
        d="M32 32V64H58C61.31 64 64 61.31 64 58V32H32Z"
        fill="#34A853"
      />
      {/* Right Projector Cone - Green / Blue / Red / Yellow blends */}
      <path
        d="M64 22.4L79.4 10.9C83.2 8 88.6 10.7 88.6 15.5V48.5C88.6 53.3 83.2 56 79.4 53.1L64 41.6V22.4Z"
        fill="#34A853"
      />
      <path
        d="M64 22.4L79.4 10.9C83.2 8 88.6 10.7 88.6 15.5V26L64 36V22.4Z"
        fill="#EA4335"
        opacity="0.15"
      />
      <path
        d="M64 41.6L79.4 53.1C83.2 56 88.6 53.3 88.6 48.5V38L64 28V41.6Z"
        fill="#4285F4"
        opacity="0.15"
      />
    </svg>
  );
}
