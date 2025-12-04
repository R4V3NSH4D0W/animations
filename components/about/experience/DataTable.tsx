import React from "react";
import { BORDER_CLASSES } from "./constants";
import { TableHeader } from "./TableHeader";

interface DataTableProps<T> {
  data: T[];
  columns: string[];
  renderRow: (item: T) => React.ReactNode[];
  onHover?: (item: T | null) => void;
}

export const DataTable = <T,>({
  data,
  columns,
  renderRow,
  onHover,
}: DataTableProps<T>) => (
  <div className="w-full overflow-x-auto">
    <table className="w-full border-collapse text-sm uppercase">
      <TableHeader columns={columns} />
      <tbody>
        {data.map((item, idx) => (
          <tr
            key={idx}
            className={
              idx !== data.length - 1
                ? `border-b ${BORDER_CLASSES} hover:bg-gray-300 transition-colors cursor-pointer`
                : "hover:bg-gray-300 transition-colors cursor-pointer"
            }
            onMouseEnter={() => onHover?.(item)}
            onMouseLeave={() => onHover?.(null)}
          >
            {renderRow(item).map((cell, cellIdx) => (
              <td key={cellIdx} className="p-2">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
