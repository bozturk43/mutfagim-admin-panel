// src/components/DynamicTable.tsx
import React from 'react';
import { useReactTable, getCoreRowModel, ColumnDef } from '@tanstack/react-table';

interface DynamicTableProps {
  records: Array<Record<string, any>>; // Her kaydın dinamik bir yapı olacağını belirtiyoruz
}

const DynamicTable: React.FC<DynamicTableProps> = ({ records }) => {
  // Eğer records boşsa tabloyu oluşturmayı denemeden önce durumu kontrol et
  const hasRecords = records.length > 0;

  // Dinamik kolonları oluştur
  const columns: ColumnDef<Record<string, any>>[] = React.useMemo(() => {
    if (!hasRecords) return []; // Eğer records boşsa kolon oluşturmaya gerek yok
    return Object.keys(records[0]).map(key => ({
      accessorKey: key,
      header: key.charAt(0).toUpperCase() + key.slice(1),
    }));
  }, [records, hasRecords]);

  // Tabloyu oluştur
  const table = useReactTable({
    data: hasRecords ? records : [], // Eğer records yoksa boş bir dizi gönder
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Eğer records boşsa tabloyu render etmeye gerek yok, bir mesaj göster
  if (!hasRecords) return <div>No data available</div>;

  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id} style={{ border: '1px solid #ccc', padding: '8px' }}>
                {header.column.columnDef.header?.toString() || ''}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id} style={{ border: '1px solid #ccc', padding: '8px' }}>
                {renderCellValue(cell.getValue())} {/* Değerleri render etmek için fonksiyon kullanıyoruz */}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

// Hücre değerini güvenli bir şekilde render eden fonksiyon
const renderCellValue = (value: unknown): React.ReactNode => {
  if (value === null || value === undefined) {
    return ''; // Eğer değer null veya undefined ise boş string döner
  }
  
  if (typeof value === 'object') {
    return JSON.stringify(value, null, 2); // Eğer nesne ise JSON formatında stringe çevir
  }

  return value.toString(); // Diğer durumlarda stringe çevir
};

export default DynamicTable;
