'use client';

interface CTAButtonProps {
  onClick?: () => void;
  href?: string;
  children: React.ReactNode;
}

export function CTAButton({ onClick, href, children }: CTAButtonProps) {
  const buttonContent = (
    <div className="group relative inline-block">
      {/* Glow effect */}
      <div className="absolute -inset-1 gradient-rainbow rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition duration-500" />

      {/* Button */}
      <button
        onClick={onClick}
        className="relative px-12 py-5 bg-black rounded-2xl leading-none flex items-center gap-3 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:scale-105"
      >
        <span className="text-xl font-bold gradient-rainbow bg-clip-text text-transparent">
          {children}
        </span>
        <svg className="w-6 h-6 text-white group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
        </svg>
      </button>
    </div>
  );

  if (href) {
    return <a href={href}>{buttonContent}</a>;
  }

  return buttonContent;
}
