import { useEffect, useState } from 'react';

interface FloatingElement {
  id: number;
  icon: string;
  x: number;
  y: number;
  delay: number;
  size: string;
}

export default function FloatingElements() {
  const [elements, setElements] = useState<FloatingElement[]>([]);

  useEffect(() => {
    const floatingElements: FloatingElement[] = [
      { id: 1, icon: '○', x: 10, y: 20, delay: 0, size: 'text-xl' },
      { id: 2, icon: '◇', x: 85, y: 40, delay: 1, size: 'text-lg' },
      { id: 3, icon: '△', x: 15, y: 70, delay: 2, size: 'text-lg' },
      { id: 4, icon: '◉', x: 90, y: 80, delay: 3, size: 'text-xl' },
      { id: 5, icon: '◆', x: 50, y: 15, delay: 1.5, size: 'text-sm' },
      { id: 6, icon: '▢', x: 75, y: 60, delay: 2.5, size: 'text-lg' },
    ];
    
    setElements(floatingElements);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {elements.map((element) => (
        <div
          key={element.id}
          className={`absolute animate-float ${element.size} opacity-70`}
          style={{
            left: `${element.x}%`,
            top: `${element.y}%`,
            animationDelay: `${element.delay}s`,
            color: 'hsl(43, 74%, 52%)',
          }}
        >
          {element.icon}
        </div>
      ))}
    </div>
  );
}
