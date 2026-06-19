"use client";

import { Link } from "@/i18n/navigation";

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-5">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const footerLinks = {
  Console: [
    { label: "Dashboard", href: "/dashboard/default" },
    { label: "Predictive Map", href: "/dashboard/projects" },
    { label: "Metrics", href: "/dashboard/sales" },
  ],
  Resources: [
    { label: "Documentation", href: "/docs" },
    { label: "GitHub Code", href: "https://github.com/Santosh-Prasad-Verma/Dashdeck" },
  ],
};

const socialLinks = [
  { icon: GitHubIcon, href: "https://github.com/Santosh-Prasad-Verma/Dashdeck", label: "GitHub" },
  { icon: XIcon, href: "https://x.com/TarunVerma_121", label: "X" },
];

export function LandingFooter() {
  return (
    <footer className="relative overflow-hidden border-white/[0.06] border-t bg-transparent">
      {/* Background ambient glow in footer */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-[200px] w-[600px] -translate-x-1/2 rounded-full bg-[#10b981]/[0.02] blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-16 pb-8 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <img
                src="/Dashdeck-logo.svg"
                alt="Dashdeck"
                className="h-8 w-auto select-none object-contain opacity-90 brightness-0 invert"
              />
            </Link>
            <p className="mt-4 max-w-xs text-gray-500 text-sm">Your personal command center.</p>
            <div className="mt-6 flex gap-3.5">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg p-1.5 text-gray-500 transition-colors hover:bg-white/[0.04] hover:text-white"
                  aria-label={link.label}
                >
                  <link.icon />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="mb-4 font-bold font-mono text-white text-xs uppercase tracking-wider">{heading}</h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="font-medium text-gray-500 text-sm transition-colors hover:text-gray-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Big styled DASHDECK header at the bottom - Full width outside container to prevent clipping */}
      <div className="pointer-events-none mt-6 w-full select-none overflow-hidden whitespace-nowrap px-4 text-center">
        <h1 className="inline-block w-full bg-gradient-to-b from-white/[0.04] to-transparent bg-clip-text font-black font-sans text-[clamp(2.5rem,11.5vw,11.5rem)] text-transparent uppercase leading-none tracking-[0.1em]">
          DASHDECK
        </h1>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-8 lg:px-8">
        {/* Bottom copyright only, no Privacy/Terms/Cookies */}
        <div className="mt-4 flex flex-col items-center justify-between gap-4 border-white/[0.06] border-t pt-8 md:flex-row">
          <p className="font-mono text-gray-600 text-xs">© 2025 Dashdeck. All rights reserved.</p>
          <p className="font-mono text-gray-600 text-xs">Built for everyone. Open Source.</p>
        </div>
      </div>
    </footer>
  );
}
