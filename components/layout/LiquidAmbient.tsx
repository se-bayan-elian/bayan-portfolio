/**
 * Full-viewport “liquid” color wash behind content (glass effect reads best on a soft, moving field).
 */
export function LiquidAmbient() {
  return (
    <div className="liquid-ambient" aria-hidden>
      <span className="liquid-ambient__orb liquid-ambient__orb--a" />
      <span className="liquid-ambient__orb liquid-ambient__orb--b" />
      <span className="liquid-ambient__orb liquid-ambient__orb--c" />
    </div>
  );
}
