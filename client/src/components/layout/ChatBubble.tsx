"use client";

import { useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";

/**
 * Housecall Pro's chat iframe is cross-origin, so we can't control it
 * directly. This component overlays a close (X) button on top of the chat
 * container — sized/positioned for both the small bubble state and the
 * expanded panel state — and re-exposes a "Chat" pill to reopen the widget
 * once fully dismissed.
 */
export function ChatBubble() {
  const [closed, setClosed] = useState(false);

  // Apply closed state to the HCP container
  useEffect(() => {
    const apply = () => {
      const container = document.getElementById("proChatIframeContainer");
      if (container) {
        container.style.display = closed ? "none" : "block";
      }
    };
    apply();
    const observer = new MutationObserver(apply);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [closed]);

  // Inject a close button, reposition it for bubble vs expanded state
  useEffect(() => {
    const CLOSE_ID = "greenpump-chat-close";

    const positionForSize = (btn: HTMLButtonElement, container: HTMLElement) => {
      const expanded = container.offsetWidth >= 200;
      if (expanded) {
        btn.style.top = "14px";
        btn.style.right = "14px";
        btn.style.width = "28px";
        btn.style.height = "28px";
        btn.style.background = "rgba(255,255,255,0.2)";
        btn.style.color = "#ffffff";
      } else {
        btn.style.top = "-6px";
        btn.style.right = "-6px";
        btn.style.width = "22px";
        btn.style.height = "22px";
        btn.style.background = "#ffffff";
        btn.style.color = "#28251D";
      }
    };

    let sizeObserver: ResizeObserver | null = null;

    const ensureButton = () => {
      const container = document.getElementById("proChatIframeContainer");
      if (!container) return;
      let btn = document.getElementById(CLOSE_ID) as HTMLButtonElement | null;
      if (!btn) {
        btn = document.createElement("button");
        btn.id = CLOSE_ID;
        btn.type = "button";
        btn.setAttribute("aria-label", "Close chat");
        btn.innerHTML =
          '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>';
        Object.assign(btn.style, {
          position: "absolute",
          borderRadius: "999px",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: "10",
          padding: "0",
          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          transition: "transform 0.15s",
        } as Partial<CSSStyleDeclaration>);
        btn.addEventListener(
          "mouseenter",
          () => (btn!.style.transform = "scale(1.1)")
        );
        btn.addEventListener(
          "mouseleave",
          () => (btn!.style.transform = "scale(1)")
        );
        btn.addEventListener("click", (e) => {
          e.stopPropagation();
          setClosed(true);
        });
        container.style.overflow = "visible";
        container.appendChild(btn);
      }
      positionForSize(btn, container);

      if (!sizeObserver) {
        sizeObserver = new ResizeObserver(() => {
          if (btn && container) positionForSize(btn, container);
        });
        sizeObserver.observe(container);
      }
    };

    ensureButton();
    const mo = new MutationObserver(ensureButton);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      mo.disconnect();
      sizeObserver?.disconnect();
    };
  }, []);

  if (!closed) return null;

  return (
    <button
      type="button"
      onClick={() => setClosed(false)}
      aria-label="Open chat"
      className="fixed bottom-6 right-6 z-[1100] flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold text-sm px-5 py-3 rounded-pill shadow-elevated transition-colors"
    >
      <MessageSquare className="w-4 h-4" />
      Chat
    </button>
  );
}
