
import React, { useState, useEffect } from 'react';

/**
 * Props for the Hero component
 */
interface HeroProps {
  /** The main heading text */
  heading?: string;
  /** Array of labels to cycle through in typewriter animation */
  labels?: string[];
  /** Typing speed in milliseconds per character */
  typingSpeed?: number;
  /** Pause duration in milliseconds after typing completes */
  pauseDuration?: number;
  /** Erasing speed in milliseconds per character */
  erasingSpeed?: number;
  /** Additional CSS classes for the container */
  className?: string;
  /** CSS classes for the heading */
  headingClassName?: string;
  /** CSS classes for the typewriter text */
  typewriterClassName?: string;
}

/**
 * Hero component with typewriter animation
 * 
 * Features:
 * - Responsive layout (inline on desktop, stacked on mobile)
 * - Typewriter animation with letter-by-letter typing
 * - Blinking cursor
 * - Customizable fonts, colors, and timing
 * 
 * @example
 * ```tsx
 * <Hero 
 *   heading="Hi I'm Prabhas"
 *   labels={["AI & ML Student", "Tech Enthusiast", "Vibe Coder"]}
 *   typingSpeed={100}
 *   pauseDuration={1500}
 * />
 * ```
 */
const Hero: React.FC<HeroProps> = ({
  heading = "Hi I'm Prabhas",
  labels = [
    "AI & ML Student",
    "Tech Enthusiast", 
    "Vibe Coder",
    "Creator",
    "Freelancer"
  ],
  typingSpeed = 100,
  pauseDuration = 1500,
  erasingSpeed = 50,
  className = "",
  headingClassName = "",
  typewriterClassName = ""
}) => {
  const [currentLabelIndex, setCurrentLabelIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 530);

    return () => clearInterval(cursorInterval);
  }, []);

  // Typewriter animation logic
  useEffect(() => {
    const currentLabel = labels[currentLabelIndex];
    
    let timeout: NodeJS.Timeout;

    if (isTyping) {
      // Typing phase
      if (currentText.length < currentLabel.length) {
        timeout = setTimeout(() => {
          setCurrentText(currentLabel.slice(0, currentText.length + 1));
        }, typingSpeed);
      } else {
        // Finished typing, pause then start erasing
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, pauseDuration);
      }
    } else {
      // Erasing phase
      if (currentText.length > 0) {
        timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, erasingSpeed);
      } else {
        // Finished erasing, move to next label
        setCurrentLabelIndex((prev) => (prev + 1) % labels.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentText, currentLabelIndex, isTyping, labels, typingSpeed, pauseDuration, erasingSpeed]);

  return (
    <div className={`text-center ${className}`}>
      {/* Desktop Layout - Inline */}
      <div className="hidden md:flex md:items-center md:justify-center md:flex-wrap md:gap-2">
        <h1 className={`text-4xl lg:text-6xl font-light text-white font-inter ${headingClassName}`}>
          {heading}
        </h1>
        <div className={`text-4xl lg:text-6xl font-source-sans text-purple-400 font-semibold ${typewriterClassName}`}>
          {currentText}
          <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>
            |
          </span>
        </div>
      </div>

      {/* Mobile Layout - Stacked */}
      <div className="md:hidden">
        <h1 className={`text-3xl sm:text-4xl font-light text-white font-inter mb-1 ${headingClassName}`}>
          {heading}
        </h1>
        <div className={`text-2xl sm:text-3xl font-source-sans text-purple-400 font-semibold ${typewriterClassName}`}>
          {currentText}
          <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity duration-100`}>
            |
          </span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
