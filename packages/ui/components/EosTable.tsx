import React from 'react';
import { cn } from '../utils';

interface EosTableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  children: React.ReactNode;
}

export const EosTable: React.FC<EosTableProps> = ({ children, className, ...props }) => {
  return (
    <div className="w-full overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-black">
      <table className={cn("w-full text-sm text-left text-slate-700 dark:text-slate-300", className)} {...props}>
        {children}
      </table>
    </div>
  );
};

export const EosTableHead: React.FC<React.HTMLAttributes<HTMLTableSectionElement>> = ({ children, className, ...props }) => (
  <thead className={cn("text-xs text-slate-500 uppercase bg-slate-50 dark:bg-slate-900", className)} {...props}>
    {children}
  </thead>
);

export const EosTableRow: React.FC<React.HTMLAttributes<HTMLTableRowElement>> = ({ children, className, ...props }) => (
  <tr className={cn("border-b border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors", className)} {...props}>
    {children}
  </tr>
);

export const EosTableHeader: React.FC<React.ThHTMLAttributes<HTMLTableCellElement>> = ({ children, className, ...props }) => (
  <th className={cn("px-6 py-3 font-semibold", className)} {...props}>
    {children}
  </th>
);

export const EosTableCell: React.FC<React.TdHTMLAttributes<HTMLTableCellElement>> = ({ children, className, ...props }) => (
  <td className={cn("px-6 py-4", className)} {...props}>
    {children}
  </td>
);
