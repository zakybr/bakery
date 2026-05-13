"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { RefObject } from "react";
import { useEffect, useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function scrollTriggerOnce(trigger: Element, start: string) {
  return {
    trigger,
    start,
    once: true,
  };
}

/** Section h2: fade up. */
export function useScrollH2Fade<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { y: 0, opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: scrollTriggerOnce(el, "top 88%"),
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}

/** Body copy below headings: fade up with slight delay. */
export function useScrollBodyFade<T extends HTMLElement = HTMLElement>(deps: unknown[] = []) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { y: 0, opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.15,
          ease: "power2.out",
          scrollTrigger: scrollTriggerOnce(el, "top 88%"),
        }
      );
    }, el);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- caller controls deps
  }, deps);

  return ref;
}

/** Images entering viewport: scale + fade. */
export function useScrollImageReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { scale: 1, opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { scale: 1.07, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.3,
          ease: "power3.out",
          scrollTrigger: scrollTriggerOnce(el, "top 92%"),
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}

/** Product grid articles: staggered fade up. */
export function useStaggerProductGrid<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const items = container.querySelectorAll<HTMLElement>("article");
    if (!items.length) return;

    if (prefersReducedMotion()) {
      gsap.set(items, { y: 0, opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        items,
        { y: 48, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.12,
          ease: "power2.out",
          scrollTrigger: scrollTriggerOnce(container, "top 82%"),
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return ref;
}

/** Full testimonial block fade in. */
export function useScrollTestimonialBlock<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      gsap.set(el, { y: 0, opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.9,
          ease: "power2.out",
          scrollTrigger: scrollTriggerOnce(el, "top 85%"),
        }
      );
    }, el);

    return () => ctx.revert();
  }, []);

  return ref;
}

/** Count-up for stat numbers; `text` kind only fades in. */
export function useStatCountUp(
  ref: RefObject<HTMLElement | null>,
  kind: "rating" | "count" | "text",
  finalDisplay: string
) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion() || kind === "text") return;
    el.textContent = kind === "rating" ? "0.0★" : "0+";
  }, [kind, ref]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.textContent = finalDisplay;
      return;
    }

    if (kind === "text") {
      const ctx = gsap.context(() => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 16 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: scrollTriggerOnce(el, "top 85%"),
          }
        );
      }, el);
      return () => ctx.revert();
    }

    const target = kind === "rating" ? 4.8 : 10000;

    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: target,
      duration: 1.8,
      ease: "power2.out",
      paused: true,
      onUpdate: () => {
        if (kind === "rating") {
          el.textContent = `${obj.val.toFixed(1)}★`;
        } else {
          el.textContent = `${Math.round(obj.val).toLocaleString("en-NZ")}+`;
        }
      },
      onComplete: () => {
        el.textContent = finalDisplay;
      },
    });

    const trigger = ScrollTrigger.create({
      ...scrollTriggerOnce(el, "top 85%"),
      onEnter: () => tween.play(),
    });

    return () => {
      tween.kill();
      trigger.kill();
    };
  }, [kind, finalDisplay, ref]);
}
