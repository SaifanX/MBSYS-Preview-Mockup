import React, { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  age: number;
  color: string;
  size: number;
}

interface CursorTrailProps {
  darkMode: boolean;
}

const CursorTrail: React.FC<CursorTrailProps> = ({ darkMode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Adjust colors based on theme
    const colors = darkMode 
      ? ['#EF4444', '#06B6D4'] // Neon Red, Cyan for Dark Mode
      : ['#DC2626', '#0891B2']; // Darker Red, Darker Cyan for Light Mode

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      
      // Add a few points for density
      for (let i = 0; i < 2; i++) {
        pointsRef.current.push({
          x: e.clientX + (Math.random() - 0.5) * 5,
          y: e.clientY + (Math.random() - 0.5) * 5,
          age: 0,
          color: colors[Math.floor(Math.random() * colors.length)],
          size: Math.random() * 3 + 1,
        });
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    handleResize();

    const maxAge = 40;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      pointsRef.current = pointsRef.current.filter((p) => {
        p.age += 1;
        if (p.age > maxAge) return false;

        const opacity = 1 - p.age / maxAge;
        ctx.globalAlpha = opacity;
        ctx.fillStyle = p.color;
        
        // Slight movement to give it a "floaty" comet feel
        p.x += (Math.random() - 0.5) * 0.5;
        p.y += (Math.random() - 0.5) * 0.5;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * opacity, 0, Math.PI * 2);
        ctx.fill();

        return true;
      });

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [darkMode]); // Re-run effect when theme changes to update colors

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ mixBlendMode: darkMode ? 'screen' : 'normal' }}
    />
  );
};

export default CursorTrail;