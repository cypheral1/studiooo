"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { Mic, Square, Loader2 } from "lucide-react";

const VAPI_PUBLIC_KEY = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY?.trim() || "";
const VAPI_ASSISTANT_ID = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID?.trim() || "";

export function VapiAssistant() {
  const vapiRef = useRef<any>(null);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Dynamically import Vapi only on client side
  useEffect(() => {
    if (!VAPI_PUBLIC_KEY) {
      console.error("[Vapi] Missing NEXT_PUBLIC_VAPI_PUBLIC_KEY");
      return;
    }

    let mounted = true;

    import("@vapi-ai/web").then((mod) => {
      if (!mounted) return;
      const Vapi = mod.default;
      const vapi = new Vapi(VAPI_PUBLIC_KEY);
      vapiRef.current = vapi;

      vapi.on("call-start", () => {
        if (!mounted) return;
        console.log("[Vapi] Call started");
        setIsSessionActive(true);
        setIsConnecting(false);
        setError(null);
      });

      vapi.on("call-end", () => {
        if (!mounted) return;
        console.log("[Vapi] Call ended");
        setIsSessionActive(false);
        setIsConnecting(false);
      });

      vapi.on("error", (e: any) => {
        if (!mounted) return;
        console.error("[Vapi] Error event:", e);
        let msg = "Connection failed. Please try again.";
        try {
          const str = JSON.stringify(e, Object.getOwnPropertyNames(e));
          console.error("[Vapi] Error details:", str);
          if (str.includes("NotAllowedError") || str.includes("permission")) {
            msg = "Microphone access denied. Please allow microphone in browser settings.";
          } else if (str.includes("Bad Request")) {
            msg = "Assistant not configured. Please check Vapi dashboard.";
          }
        } catch {}
        setError(msg);
        setIsConnecting(false);
        // Auto-clear error after 5 seconds
        setTimeout(() => {
          if (mounted) setError(null);
        }, 5000);
      });
    });

    return () => {
      mounted = false;
      if (vapiRef.current) {
        try { vapiRef.current.stop(); } catch {}
        vapiRef.current = null;
      }
    };
  }, []);

  const toggleCall = useCallback(async () => {
    if (!vapiRef.current) return;
    if (!VAPI_ASSISTANT_ID) {
      setError("Assistant ID missing. Check environment variables.");
      return;
    }

    if (isSessionActive) {
      setIsConnecting(true);
      vapiRef.current.stop();
    } else {
      setIsConnecting(true);
      setError(null);
      try {
        console.log("[Vapi] Starting call with assistant:", VAPI_ASSISTANT_ID);
        await vapiRef.current.start(VAPI_ASSISTANT_ID);
      } catch (err: any) {
        console.error("[Vapi] Start failed:", err);
        setError(err?.message || "Could not start voice assistant.");
        setIsConnecting(false);
      }
    }
  }, [isSessionActive]);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Error message */}
      {error && (
        <div className="max-w-xs bg-red-500/90 backdrop-blur-sm text-white text-sm px-4 py-3 rounded-xl shadow-lg animate-in slide-in-from-bottom-2">
          {error}
        </div>
      )}

      {/* Button with tooltip */}
      <div className="group flex items-center">
        {/* Tooltip */}
        <div
          className={`mr-4 bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 px-4 py-2 rounded-full shadow-lg border border-zinc-200 dark:border-zinc-700 text-sm font-medium whitespace-nowrap transition-all duration-300
            ${isSessionActive || isConnecting
              ? "opacity-0 translate-x-2 pointer-events-none"
              : "opacity-0 md:-translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 pointer-events-none"
            }`}
        >
          Talk to AI Assistant
          <div className="absolute w-2 h-2 bg-white dark:bg-zinc-800 transform rotate-45 border-r border-t border-zinc-200 dark:border-zinc-700 -right-1 top-1/2 -translate-y-1/2 z-0"></div>
        </div>

        {/* Button */}
        <button
          onClick={toggleCall}
          disabled={isConnecting}
          className={`relative flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-300 cursor-pointer
            ${isSessionActive
              ? "bg-red-500 hover:bg-red-600 shadow-red-500/30"
              : "bg-black dark:bg-white hover:scale-110 hover:shadow-black/30 dark:hover:shadow-white/30"
            } disabled:opacity-70 disabled:hover:scale-100`}
          aria-label={isSessionActive ? "Stop voice assistant" : "Start voice assistant"}
        >
          {/* Pulse ring when active */}
          {isSessionActive && (
            <span className="absolute inset-0 rounded-full bg-red-500 animate-ping opacity-30"></span>
          )}

          {isConnecting ? (
            <Loader2 className="w-6 h-6 animate-spin text-white dark:text-black" />
          ) : isSessionActive ? (
            <Square className="w-5 h-5 fill-current text-white" />
          ) : (
            <Mic className="w-6 h-6 text-white dark:text-black" />
          )}
        </button>
      </div>
    </div>
  );
}
