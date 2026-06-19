"use client";

import { useState, useEffect } from "react";

import dynamic from "next/dynamic";

const LandingPageClient = dynamic(() => import("./page.client").then((m) => m.LandingPageClient), {
  ssr: false,
});

export default function Page() {
  const [showPreloader, setShowPreloader] = useState(true);
  const [stairsActive, setStairsActive] = useState(false);

  useEffect(() => {
    // Start the stair animation after a tiny delay
    const activateTimer = setTimeout(() => {
      setStairsActive(true);
    }, 100);

    // Remove preloader after animation completes (stagger * 4 + duration + buffer)
    const removeTimer = setTimeout(() => {
      setShowPreloader(false);
    }, 2200);

    return () => {
      clearTimeout(activateTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  return (
    <>
      {showPreloader && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 9999,
            pointerEvents: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              display: "flex",
              width: "100%",
              height: "100%",
            }}
          >
            {[0, 1, 2, 3, 4].map((i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: "100%",
                  backgroundColor: "#10b981",
                  transformOrigin: "top",
                  transform: stairsActive ? "scaleY(0)" : "scaleY(1)",
                  transition: `transform 0.8s cubic-bezier(0.76, 0, 0.24, 1) ${0.08 * i + 0.8}s`,
                }}
              />
            ))}
          </div>
          <div
            style={{
              position: "relative",
              color: "white",
              fontSize: "1.5rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              zIndex: 10000,
              opacity: stairsActive ? 0 : 1,
              transform: stairsActive ? "translateY(-20px)" : "translateY(0)",
              transition: "opacity 0.4s cubic-bezier(0.76, 0, 0.24, 1) 0.6s, transform 0.4s cubic-bezier(0.76, 0, 0.24, 1) 0.6s",
            }}
          >
            LOADING
          </div>
        </div>
      )}
      <LandingPageClient />
    </>
  );
}
