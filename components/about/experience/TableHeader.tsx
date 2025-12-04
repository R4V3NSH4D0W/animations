import { BORDER_CLASSES } from "./constants";

interface TableHeaderProps {
  columns: string[];
}

export const TableHeader = ({ columns }: TableHeaderProps) => (
  <thead>
    <tr className={`border-b ${BORDER_CLASSES}`}>
      {columns.map((col) => (
        <th
          key={col}
          className="p-2 text-left font-normal w-[30%] first:w-[30%] nth-2:w-[35%] last:w-[35%]"
        >
          {col}
        </th>
      ))}
    </tr>
  </thead>
);
