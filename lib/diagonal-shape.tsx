import React from "react";

interface DiagonalShapeProps extends React.SVGProps<SVGSVGElement> {
  className?: string; // Tailwind classes
}

const DiagonalShape: React.FC<DiagonalShapeProps> = ({
  className,
  ...props
}) => {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <path d="M40 40H0V0L40 40Z" fill="currentColor" />
    </svg>
  );
};

export default DiagonalShape;
