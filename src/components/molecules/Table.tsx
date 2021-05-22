import React from 'react';
import { TableRow } from '@/types';

type Props = {
  content: TableRow[];
};

export const Table: React.VFC<Props> = ({ content }) => {
  return (
    <table className="w-full md:w-2/3 text-left">
      <tbody>
        {content.map((row, index) => (
          <tr className="w-full" key={index}>
            <th className="text-lg h-12 w-1/2 sm:w-1/3 p-2">{row.key}</th>
            <td className="text-lg h-12 w-1/2 sm:w-2/3 p-2">{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
