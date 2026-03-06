"use client";

import { useState, useEffect } from "react";
import { hasSavedPreferences } from "@/lib/preferences";
import { RegionalPreferencesOnboarding } from "./RegionalPreferencesOnboarding";

export function OnboardingGate({ children }: { children: React.ReactNode }) {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setShowOnboarding(!hasSavedPreferences());
  }, []);

  if (!mounted) return <>{children}</>;
  return (
    <>
      {children}
      {showOnboarding && (
        <RegionalPreferencesOnboarding
          onComplete={() => setShowOnboarding(false)}
        />
      )}
    </>
  );
}
