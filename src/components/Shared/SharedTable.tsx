import React from 'react';
import { useReactTable, ColumnDef, getCoreRowModel, flexRender, getPaginationRowModel } from '@tanstack/react-table';
import { Button, IconButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


// SharedTable Props Arayüzü
interface SharedTableProps {
    data: Array<Record<string, any>>;
    columns: ColumnDef<any>[]; // Kolon yapılarını tanımlıyoruz
}

const SharedTable: React.FC<SharedTableProps> = ({ data, columns }) => {
    // Tabloyu oluşturmak için React Table kullanımı
    const table = useReactTable({
        data,
        columns,
        initialState: {
            pagination: {
                pageSize: 5,
            },
        },
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });
    return (
        <div style={{ margin: '20px 0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', margin: '20px 0' }}>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th
                                    key={header.id}
                                    style={{
                                        border: '1px solid #ccc',
                                        padding: '8px',
                                        backgroundColor: '#f0f0f0',
                                        textAlign: 'left'
                                    }}
                                >
                                    {header.column.columnDef.header?.toString() || ''}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(rowEl => (
                        <tr key={rowEl.id}>
                            {rowEl.getVisibleCells().map(cellEl => (
                                <td key={cellEl.id} style={{
                                    border: '1px solid #ccc',
                                    padding: '8px',
                                    textAlign: 'left',
                                    color: '#333',
                                }}>
                                    {flexRender(
                                        cellEl.column.columnDef.cell,
                                        cellEl.getContext()
                                    )}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <hr />
            <div>
                <Button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}> İlk Sayfa </Button>
                <IconButton onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}> 
                    <ArrowBackIcon/>
                    </IconButton>
                <IconButton onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                    <ArrowForwardIcon />
                </IconButton>
                <Button onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}> Son Sayfa </Button>
            </div>
        </div>
    );
};

export default SharedTable;
