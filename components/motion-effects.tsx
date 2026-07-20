"use client";

import { useEffect } from "react";

const revealSelector = [
  "main > section",
  "main .soft-card",
  "main article",
  "main figure",
  "main [data-reveal]",
].join(",");

export function MotionEffects() {
  useEffect(() => {
    const body = document.body;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (reducedMotion.matches || !("IntersectionObserver" in window)) {
      body.classList.add("motion-ready");
      return;
    }

    body.classList.add("motion-enabled");

    const registered = new WeakSet<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add("is-revealed");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );

    const register = (element: Element) => {
      if (registered.has(element)) return;
      registered.add(element);
      element.classList.add("reveal-item");
      observer.observe(element);
    };

    const registerTree = (root: ParentNode) => {
      if (root instanceof Element && root.matches(revealSelector)) register(root);
      root.querySelectorAll(revealSelector).forEach(register);
    };

    registerTree(document);

    const mutations = new MutationObserver((entries) => {
      for (const entry of entries) {
        entry.addedNodes.forEach((node) => {
          if (node instanceof Element) registerTree(node);
        });
      }
    });

    mutations.observe(document.body, { childList: true, subtree: true });

    const readyFrame = window.requestAnimationFrame(() => {
      body.classList.add("motion-ready");
    });

    return () => {
      window.cancelAnimationFrame(readyFrame);
      mutations.disconnect();
      observer.disconnect();
      body.classList.remove("motion-enabled", "motion-ready");
    };
  }, []);

  return (
    <div className="page-wash" aria-hidden="true">
      <span className="page-wash-mark">
        <span />
      </span>
    </div>
  );
}
