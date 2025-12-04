import { BORDER_CLASSES } from "./constants";

interface SectionLabelProps {
  label: string;
}

export const SectionLabel = ({ label }: SectionLabelProps) => (
  <div
    className={`p-2 flex text-xs uppercase items-center justify-between ${BORDER_CLASSES}`}
  >
    <span>About</span>
    <span>Detail</span>
  </div>
);
