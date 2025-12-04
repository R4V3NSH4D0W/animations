import { BORDER_CLASSES } from "./constants";
import { SquareDot } from "./SquareDot";

interface SectionHeaderProps {
  title: string;
  className?: string;
}

export const SectionHeader = ({ title, className }: SectionHeaderProps) => (
  <div
    className={`flex items-center px-4 justify-between ${BORDER_CLASSES} ${className}`}
  >
    <SquareDot />
    <span className="text-xs uppercase">{title}</span>
    <SquareDot />
  </div>
);
