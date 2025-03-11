"use client";

import { cn } from "@/lib/utils";
import { motion, MotionProps } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { ReactNode } from "react";

interface TextSegment {
  text: string;
  className?: string;
}

// Separate the base props from motion props to avoid type conflicts
interface BaseTypingAnimationProps {
  children: string | TextSegment[];
  className?: string;
  duration?: number;
  delay?: number;
  as?: React.ElementType;
  startOnView?: boolean;
}

// Combine with motion props but omit children to avoid conflicts
type TypingAnimationProps = BaseTypingAnimationProps & Omit<MotionProps, 'children'>;

export function TypingAnimation({
  children,
  className,
  duration = 100,
  delay = 0,
  as: Component = "div",
  startOnView = false,
  ...props
}: TypingAnimationProps) {
  const MotionComponent = motion.create(Component, {
    forwardMotionProps: true,
  });

  const [displayedText, setDisplayedText] = useState<string>("");
  const [started, setStarted] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);
  
  // Convert children to string for typing animation
  const fullText = typeof children === "string" 
    ? children 
    : children.map(segment => segment.text).join("");

  useEffect(() => {
    if (!startOnView) {
      const startTimeout = setTimeout(() => {
        setStarted(true);
      }, delay);
      return () => clearTimeout(startTimeout);
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setStarted(true);
          }, delay);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [delay, startOnView]);

  useEffect(() => {
    if (!started) return;

    let i = 0;
    const typingEffect = setInterval(() => {
      if (i < fullText.length) {
        setDisplayedText(fullText.substring(0, i + 1));
        i++;
      } else {
        clearInterval(typingEffect);
      }
    }, duration);

    return () => {
      clearInterval(typingEffect);
    };
  }, [fullText, duration, started]);

  // Render the text with segments if provided
  const renderText = () => {
    if (typeof children === "string") {
      return displayedText;
    }
    
    let currentPos = 0;
    return children.map((segment, index) => {
      const start = currentPos;
      const end = start + segment.text.length;
      currentPos = end;
      
      const visibleText = displayedText.substring(start, Math.min(end, displayedText.length));
      if (!visibleText) return null;
      
      return (
        <span key={index} className={segment.className}>
          {visibleText}
        </span>
      );
    });
  };

  return (
    <MotionComponent
      ref={elementRef}
      className={cn(
        "text-4xl font-bold leading-[5rem] tracking-[-0.02em]",
        className,
      )}
      {...props}
    >
      {renderText()}
    </MotionComponent>
  );
}