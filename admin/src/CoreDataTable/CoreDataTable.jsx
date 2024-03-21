import React from 'react';
import './coreDataTable.scss';
import { DataGrid } from '@mui/x-data-grid';

const CoreDataTable = ({ rows, columns }) => {
    return (
        <>
            <div className="core-data-grid">
                <DataGrid
                    className="data-grid"
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    rowHeight={45}
                    sx={{
                        '& .MuiDataGrid-virtualScroller::-webkit-scrollbar':
                        {
                            height: '4px',
                            borderRadius: '20px',
                        },
                        '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-track':
                        {
                            background: '#f1f1f1',

                        },
                        '& .MuiDataGrid-virtualScroller::-webkit-scrollbar-thumb':
                        {
                            backgroundColor: '#888',
                            borderRadius: '20px',
                        },
                    }}
                />
            </div>
        </>
    );
};

export default CoreDataTable;
