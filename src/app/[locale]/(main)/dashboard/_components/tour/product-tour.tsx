"use client";

import { useEffect, useState } from "react";

import { HelpCircle, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface TourStep {
  title: string;
  description: string;
  position: "center" | "left" | "top-right";
}

const TOUR_STEPS: TourStep[] = [
  {
    title: "Welcome to Dashdeck!",
    description: "Your modern command center is ready. Let's take a quick 3-step tour of the main features.",
    position: "center",
  },
  {
    title: "Multi-Module Sidebar",
    description:
      "Navigate through 15+ interactive dashboards: AI Agents, SecOps, FinOps, Developer Tools, MarTech, and more.",
    position: "left",
  },
  {
    title: "Theme & Layout Panel",
    description: "Customize presets, fonts, and dark mode instantly using these top header controls.",
    position: "top-right",
  },
  {
    title: "You're all set!",
    description: "Start exploring our interactive views or press CMD+K to open the global search palette.",
    position: "center",
  },
];

export function ProductTour() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const isCompleted = localStorage.getItem("dashdeck_tour_completed");
    if (!isCompleted) {
      // Small timeout to let the page load
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleNext = () => {
    if (step < TOUR_STEPS.length - 1) {
      setStep((prev) => prev + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep((prev) => prev - 1);
    }
  };

  const handleComplete = () => {
    localStorage.setItem("dashdeck_tour_completed", "true");
    setIsOpen(false);
  };

  const handleResetTour = () => {
    setStep(0);
    setIsOpen(true);
  };

  if (!isOpen) {
    return (
      <Button
        variant="outline"
        size="icon"
        onClick={handleResetTour}
        className="fixed right-4 bottom-4 z-40 size-10 rounded-full border-primary/20 bg-card/80 shadow-lg backdrop-blur-xs hover:bg-muted"
        title="Take Dashboard Tour"
      >
        <HelpCircle className="size-5 text-primary" />
      </Button>
    );
  }

  const currentStep = TOUR_STEPS[step];

  // Helper class for positioning the tour card
  const getPositionClass = (pos: TourStep["position"]) => {
    switch (pos) {
      case "left":
        return "fixed left-4 md:left-[280px] top-[160px] md:top-[220px] max-w-[340px]";
      case "top-right":
        return "fixed right-4 md:right-[200px] top-[60px] max-w-[340px]";
      default:
        return "fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[400px] w-[90%]";
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div className="pointer-events-auto fixed inset-0 z-50 bg-black/60 backdrop-blur-xs transition-opacity duration-300" />

      {/* Tour Card */}
      <div
        className={`${getPositionClass(currentStep.position)} fade-in zoom-in-95 z-50 animate-in transition-all duration-200 duration-300`}
      >
        <Card className="border border-primary/20 bg-card/95 shadow-2xl backdrop-blur-md">
          <CardHeader className="relative pb-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleComplete}
              className="absolute top-2 right-2 h-7 w-7 text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" />
            </Button>
            <CardTitle className="font-semibold text-base text-primary">{currentStep.title}</CardTitle>
            <CardDescription className="text-xs">
              Step {step + 1} of {TOUR_STEPS.length}
            </CardDescription>
          </CardHeader>
          <CardContent className="py-2">
            <p className="text-muted-foreground text-sm leading-relaxed">{currentStep.description}</p>
          </CardContent>
          <CardFooter className="flex items-center justify-between pt-4">
            <Button
              variant="link"
              onClick={handleComplete}
              className="h-auto p-0 text-muted-foreground text-xs hover:text-foreground"
            >
              Skip tour
            </Button>
            <div className="flex gap-2">
              {step > 0 && (
                <Button variant="outline" size="sm" onClick={handleBack} className="h-8 text-xs">
                  Back
                </Button>
              )}
              <Button size="sm" onClick={handleNext} className="h-8 text-xs">
                {step === TOUR_STEPS.length - 1 ? "Get Started" : "Next"}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
