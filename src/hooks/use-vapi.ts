import { useEffect, useRef, useState, useCallback } from 'react';
import Vapi from '@vapi-ai/web';
import { useToast } from "@/hooks/use-toast";

const publicKey = process.env.NEXT_PUBLIC_VAPI_PUBLIC_KEY?.trim();
const assistantId = process.env.NEXT_PUBLIC_VAPI_ASSISTANT_ID?.trim();

export const useVapi = () => {
  const vapiRef = useRef<any>(null);
  const [isSessionActive, setIsSessionActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    console.log("[Vapi] Public Key present:", !!publicKey, "| Assistant ID present:", !!assistantId);
    
    if (!publicKey) {
      console.error("[Vapi] Public Key is missing! Check NEXT_PUBLIC_VAPI_PUBLIC_KEY in .env");
      return;
    }
    
    vapiRef.current = new Vapi(publicKey);

    vapiRef.current.on('call-start', () => {
      console.log("[Vapi] Call started successfully");
      setIsSessionActive(true);
      setIsConnecting(false);
    });
    
    vapiRef.current.on('call-end', () => {
      console.log("[Vapi] Call ended");
      setIsSessionActive(false);
      setIsConnecting(false);
    });
    
    vapiRef.current.on('error', (e: any) => {
      console.error('[Vapi] Error:', e);
      let errorMsg = "Voice assistant encountered an error. Please try again.";
      try {
        const str = JSON.stringify(e, Object.getOwnPropertyNames(e));
        if (str.includes("NotAllowedError") || str.includes("permission")) {
          errorMsg = "Microphone permission denied. Please allow mic access in your browser settings.";
        } else if (str.includes("Bad Request")) {
          errorMsg = "Voice assistant configuration error. The assistant ID may be invalid or the assistant is not fully configured in the Vapi dashboard.";
        } else if (e?.message) {
          errorMsg = e.message;
        }
      } catch (err) {}
      
      toast({
        title: "Voice Assistant Error",
        description: errorMsg,
        variant: "destructive",
      });
      setIsConnecting(false);
    });

    return () => {
      if (vapiRef.current) {
        vapiRef.current.stop();
        vapiRef.current = null;
      }
    };
  }, []);

  const toggleCall = useCallback(async () => {
    if (!vapiRef.current) return;
    
    if (!assistantId) {
      toast({
        title: "Configuration Error",
        description: "Assistant ID is missing. Please check your environment variables.",
        variant: "destructive",
      });
      return;
    }
    
    if (isSessionActive) {
      setIsConnecting(true);
      vapiRef.current.stop();
    } else {
      setIsConnecting(true);
      try {
        console.log("[Vapi] Starting call with assistant:", assistantId);
        await vapiRef.current.start(assistantId);
      } catch (err: any) {
        console.error("[Vapi] Failed to start call:", err);
        toast({
          title: "Connection Failed",
          description: err?.message || "Could not connect to the voice assistant. Please try again.",
          variant: "destructive",
        });
        setIsConnecting(false);
      }
    }
  }, [isSessionActive, toast]);

  return { isSessionActive, isConnecting, toggleCall };
};
