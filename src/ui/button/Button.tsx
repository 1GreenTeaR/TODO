import { MouseEvent as MouseEventReact, ReactNode, useRef } from "react";
import "./Button.css";

type Props = {
  children?: ReactNode;
  onClick?: () => void;
  color?:
    | "primary"
    | "secondary"
    | "regular"
    | "regular-elevated"
    | "regular-transparent";
  size?: "s" | "m" | "l" | "xl";
  disabled?: boolean;
  padding?: "full" | "none";
  className?: string;
};

export function Button({
  color = "primary",
  onClick,
  size = "l",
  children,
  disabled = false,
  padding = "full",
  className,
}: Props) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  function onMouseMove(e: MouseEventReact<HTMLButtonElement, MouseEvent>) {
    if (!buttonRef.current || !wrapperRef.current || disabled === true) return;

    const rect = wrapperRef.current.getBoundingClientRect();

    const buttonCenterX = rect.x + rect.width / 2;
    const buttonCenterY = rect.y + rect.height / 2;

    const mouseX = e.clientX;
    const mouseY = e.clientY;

    const x = mouseX - buttonCenterX;
    const y = mouseY - buttonCenterY;

    const normalizedX = Math.max(Math.min(x / rect.width, 1), -1);
    const normalizedY = Math.max(Math.min(y / rect.height, 1), -1);

    const intensity = 0.2;

    buttonRef.current.style.transform = `scale(1.1) translateX(${
      x * intensity
    }px) translateY(${y * intensity}px) rotate3d(1, 0, 0, ${
      -normalizedY * 20
    }deg) rotate3d(0, 1, 0, ${normalizedX * 20}deg)`;
  }
  function onMouseLeave() {
    if (!buttonRef.current) return;
    buttonRef.current.style.transform = ``;
  }

  return (
    <div className={`button-wrapper ${className}`} ref={wrapperRef}>
      <button
        ref={buttonRef}
        onClick={onClick}
        color={color}
        className={`button button-color-${color} button-size-${size} ${
          disabled ? "button-disabled" : ""
        } button-padding-${padding}`}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
      >
        <div className="button-content">{children}</div>
      </button>
    </div>
  );
}
