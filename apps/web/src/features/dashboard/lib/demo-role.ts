"use client";

import { useSyncExternalStore } from "react";

const roleKey = "transporter-demo-role";
const roleEvent = "transporter-demo-role-change";

export function setDemoRole(role: "individual" | "business" | null) {
  if (role) localStorage.setItem(roleKey, role);
  else localStorage.removeItem(roleKey);
  window.dispatchEvent(new Event(roleEvent));
}

function subscribe(onChange: () => void) {
  window.addEventListener("storage", onChange);
  window.addEventListener(roleEvent, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(roleEvent, onChange);
  };
}

export function useBusinessDemo() {
  return useSyncExternalStore(
    subscribe,
    () => { try { return localStorage.getItem(roleKey) === "business"; } catch { return false; } },
    () => false,
  );
}
