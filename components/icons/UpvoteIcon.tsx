
import React from 'react';

interface IconProps {
    filled?: boolean;
    className?: string;
}

const UpvoteIcon: React.FC<IconProps> = ({ filled = false, className = "w-5 h-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M12 19V5M5 12l7-7 7 7" />
  </svg>
);


export default UpvoteIcon;
