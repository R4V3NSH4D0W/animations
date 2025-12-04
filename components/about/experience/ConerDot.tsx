import { CORNER_DOT_CLASSES } from "./constants";

interface CornerDotProps {
  className?: string;
}

export const CornerDot = ({ className }: CornerDotProps) => (
  <div className={`${CORNER_DOT_CLASSES} ${className}`} />
);
