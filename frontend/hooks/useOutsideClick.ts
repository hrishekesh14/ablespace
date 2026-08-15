"use client";

import { useEffect, type RefObject } from "react";

export function useOutsideClick(
  refs: RefObject<HTMLElement>[],
  onOutside: () => void,
  active = true
) {
  useEffect(() => {
    if (!active) return;

    function handlePointerDown(event: PointerEvent) {
      const target = event.target as Node;
      const isInside = refs.some((ref) => ref.current?.contains(target));
      if (!isInside) onOutside();
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onOutside();
    }

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, onOutside]);
}
