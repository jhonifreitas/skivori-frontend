import confetti from "canvas-confetti";

export function fireConfetti() {
  const defaults = { spread: 80, startVelocity: 45, ticks: 200, zIndex: 50 };

  confetti({ ...defaults, particleCount: 120, origin: { x: 0.5, y: 0.7 } });
  confetti({
    ...defaults,
    particleCount: 60,
    angle: 60,
    origin: { x: 0, y: 0.8 },
  });
  confetti({
    ...defaults,
    particleCount: 60,
    angle: 120,
    origin: { x: 1, y: 0.8 },
  });
}
