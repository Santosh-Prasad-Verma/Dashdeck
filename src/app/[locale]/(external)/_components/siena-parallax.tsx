"use client";

import * as React from "react";

import { motion, useScroll, useTransform } from "framer-motion";

import { Link } from "@/i18n/navigation";

// Arrow indicator icon
function ArrowIndicator({ className }: { className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 100 100" width="100%" className={className}>
      <title>Arrow Down Indicator</title>
      <path
        fill="currentColor"
        d="M69.022 85.363c16.693-13.32 20.658-33.261 20.16-43.736H77.95c0 17.454-11.106 29.106-20.543 35.517-4.676 3.177-10.818 2.998-15.414-.293-17.124-12.264-19.958-27.753-18.988-35.224H10.305c0 20.438 9.697 34.444 20.244 43.16 11.033 9.118 27.285 9.503 38.473.576Z"
      />
      <path fill="currentColor" fillRule="evenodd" d="M56.016 5v79.243H43.56V5h12.455Z" clipRule="evenodd" />
    </svg>
  );
}

// Custom Film-Frame clipPath Mask SVG path scaled to 0-1 range
function ClipPathSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 1836 1053"
      width="0"
      height="0"
      className="absolute"
    >
      <defs>
        <clipPath id="siena-clip-path" clipPathUnits="objectBoundingBox">
          <path
            fill="currentColor"
            d="M457.525 1.148c-20.789-3.198-193.979 1.16-283.854 2.496 11.104-.178 1.297-2.868-81.146-2.496-103.5.468-86 102.499-86 109.999s-7 524.5-6.5 547.5 10 59 6.5 99c-2.8 32-1.167 234.667 0 332.003.5 75 62.5 66.5 67 68.5s38.5 0 81.5 0 436 6 526 10.5 438.995-.5 505.495 0 330.01-12.5 417.51-12.5 230.99 2 270.99 0 40.5-16 51-31.5 12.5-61 12.5-105.5c0-44.503 7.01-274.504 7.01-348.004s-3.51-159.998-7.01-230.998 0-256.002 0-318.002 7.01-92.998-22.5-110.999c-18.79-11.471-81.99-9.999-133.49-9.999H853.525c-29 0-370 4-396 0Z"
            transform="scale(0.0005139987561, 0.0008543065594)"
          />
        </clipPath>
      </defs>
    </svg>
  );
}

// Watch trailer overlay button
function TrailerButton() {
  return (
    <div className="absolute z-20 flex scale-50 flex-col items-center justify-center gap-3 text-center text-[#d4fc34] lg:scale-100 transition-transform duration-300 hover:scale-110">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 100 100"
        width="100%"
        className="size-24 text-[#d4fc34]"
      >
        <title>Play Button</title>
        <path
          fill="currentColor"
          d="M80.593 43.765c4.543 3.072 4.543 9.762 0 12.834L28.219 92.021c-5.145 3.48-12.087-.206-12.087-6.417V14.76c0-6.21 6.942-9.897 12.087-6.417l52.374 35.422Z"
        />
      </svg>
      <p className="text-xs uppercase tracking-widest font-mono font-bold">Launch System</p>
      <h1 className="text-2xl uppercase leading-none font-bold">Open Console</h1>
    </div>
  );
}

export function SienaParallax() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const videoRef = React.useRef<HTMLDivElement>(null);

  // Scroll Progress relative to the outer container (for header image offset)
  const { scrollYProgress: scrollYContainer } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Scroll Progress relative to the mask section (for scale and zoom offsets)
  const { scrollYProgress: scrollYVideo } = useScroll({
    target: videoRef,
    offset: ["start end", "end start"],
  });

  // Replicate original Siena Parallax animation values
  const yImage = useTransform(scrollYContainer, [0.6, 1], ["0%", "30%"]);
  const scaleVideo = useTransform(scrollYVideo, [0, 1], [1, 0.75]);
  const scaleInnerImage = useTransform(scrollYVideo, [0, 1], [1, 1.25]);

  return (
    <div
      ref={containerRef}
      className="flex w-full flex-col items-center overflow-hidden bg-[#050505] text-white py-24 select-none"
    >
      <ClipPathSvg />

      {/* Header parallax image layer */}
      <div className="relative flex h-[70vh] w-full items-end overflow-hidden">
        {/* Top left category indicator */}
        <div className="absolute left-6 top-6 lg:left-10 lg:top-10 z-30 flex items-center justify-center gap-3">
          <div className="flex size-8 items-center justify-center rounded-full bg-white/10 p-2 text-white shadow-sm border border-white/10">
            <ArrowIndicator className="rotate-90" />
          </div>
          <p className="text-xs uppercase tracking-widest text-zinc-400 font-bold font-mono">Visual Builder</p>
        </div>

        {/* Shadow Overlay */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/80 via-black/20 to-transparent h-1/2 w-full" />

        {/* Parallax Image */}
        <motion.img
          src="/Preview-img1.png"
          alt="Dashboard UI Layout"
          className="absolute inset-0 h-[120vh] w-full object-cover"
          style={{ y: yImage }}
        />
      </div>

      {/* Headline Text section */}
      <div className="flex w-full flex-col items-center justify-center py-20 px-6 text-center">
        <p className="my-6 text-xs uppercase tracking-widest font-bold text-neutral-500 font-mono">
          Advanced Workspace
        </p>
        <h1 className="w-full border-b border-t border-white/10 py-6 text-4xl font-extrabold uppercase leading-[0.9] sm:text-6xl lg:text-8xl tracking-tight max-w-6xl text-white">
          Dashdeck Console
        </h1>
        <div className="my-8 flex size-8 items-center justify-center rounded-full bg-white/10 p-2 text-white shadow-md animate-bounce border border-white/10">
          <ArrowIndicator />
        </div>
      </div>

      {/* Cinematic Mask Section (ClipPath Scaling Video placeholder) */}
      <Link href="/dashboard/default" className="relative flex w-full justify-center">
        <motion.div
          ref={videoRef}
          style={{
            scale: scaleVideo,
            clipPath: "url(#siena-clip-path)",
          }}
          className="relative flex aspect-video w-full cursor-pointer items-center justify-center overflow-hidden shadow-2xl lg:w-[80%]"
        >
          {/* Faded overlay */}
          <div className="absolute inset-0 z-10 bg-black/35 hover:bg-black/20 transition-colors duration-300" />

          {/* Hover Trailer Button */}
          <TrailerButton />

          {/* Mask Background Image Zoom */}
          <motion.img
            src="/dashboard.png"
            alt="Dashdeck Preview"
            className="absolute inset-0 h-full w-full object-cover"
            style={{ scale: scaleInnerImage }}
          />
        </motion.div>
      </Link>

      {/* Production terms grid/scroller */}
      <div className="mt-32 flex w-full flex-col items-center justify-center uppercase font-mono">
        <h2 className="w-full border-t border-white/10 py-5 text-center text-3xl font-extrabold leading-[0.9] sm:text-5xl lg:text-7xl">
          15+ Dashboards
        </h2>
        <h2 className="w-full border-t border-white/10 py-5 text-center text-3xl font-extrabold leading-[0.9] sm:text-5xl lg:text-7xl">
          Custom Charts
        </h2>
        <h2 className="w-full border-b border-t border-white/10 py-5 text-center text-3xl font-extrabold leading-[0.9] sm:text-5xl lg:text-7xl">
          Fully Interactive
        </h2>
      </div>

      {/* Sitemap / Links Section */}
      <div className="my-36 flex flex-col items-center justify-center uppercase font-mono gap-6">
        <p className="my-4 text-xs uppercase tracking-widest text-neutral-500 font-bold">Navigation</p>
        <Link
          href="/dashboard/default"
          className="text-2xl font-bold opacity-30 transition-all hover:opacity-100 duration-300 hover:scale-105"
        >
          Open App
        </Link>
        <Link
          href="/dashboard/projects"
          className="text-2xl font-bold opacity-30 transition-all hover:opacity-100 duration-300 hover:scale-105"
        >
          Predictive Map
        </Link>
        <Link
          href="/dashboard/sales"
          className="text-2xl font-bold opacity-30 transition-all hover:opacity-100 duration-300 hover:scale-105"
        >
          Metrics Dashboard
        </Link>
      </div>
    </div>
  );
}
