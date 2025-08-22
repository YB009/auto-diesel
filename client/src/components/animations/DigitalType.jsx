// client/src/components/animations/DigitalType.jsx
import React, { useEffect, useState } from "react";

// Minimal digital/terminal-style typewriter for sub-content under the main header
export default function DigitalType({
  phrases = [],
  typeSpeed = 40,
  deleteSpeed = 24,
  pause = 1200,
}) {
  const [index, setIndex] = useState(0);
  const [sub, setSub] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!phrases.length) return;
    const current = phrases[index % phrases.length];

    if (!deleting && sub.length < current.length) {
      const t = setTimeout(() => setSub(current.slice(0, sub.length + 1)), typeSpeed);
      return () => clearTimeout(t);
    }

    if (!deleting && sub.length === current.length) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }

    if (deleting && sub.length > 0) {
      const t = setTimeout(() => setSub(current.slice(0, sub.length - 1)), deleteSpeed);
      return () => clearTimeout(t);
    }

    if (deleting && sub.length === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % phrases.length);
    }
  }, [sub, deleting, index, phrases, typeSpeed, deleteSpeed, pause]);

  return (
    <span>
      {sub}
      <span className="inline-block w-2 h-5 align-middle ml-1 bg-brand-500 animate-pulse" aria-hidden />
    </span>
  );
}
