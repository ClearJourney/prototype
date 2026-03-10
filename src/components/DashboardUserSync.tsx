"use client";

import { useEffect } from "react";
import { setStoredUser } from "@/lib/user";

/** Syncs current user to localStorage so Contact page can pre-fill. Replace with real auth when ready. */
const DASHBOARD_USER = { name: "Liam Mistry", email: "liam@clearjourney.example" };

export function DashboardUserSync() {
  useEffect(() => {
    setStoredUser(DASHBOARD_USER);
  }, []);
  return null;
}
