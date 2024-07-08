"use client";
import * as React from 'react';
import { Box, Button, Checkbox, Typography, Paper, Select, MenuItem, SelectChangeEvent } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

interface Column {
  field: string;
  headerName: string;
  width: string;
}

interface Row {
  id: number;
  product: string;
  price: string;
}

const columns: Column[] = [
  { field: 'actions', headerName: 'Actions', width: '25%' },
  { field: 'product', headerName: 'Product', width: '40%' },
  { field: 'price', headerName: 'Price', width: '35%' },
];

const rows: Row[] = [
  { id: 1, product: 'iPhone 13', price: '$799' },
  { id: 2, product: 'MacBook Air', price: '$999' },
  { id: 3, product: 'iPad Pro', price: '$799' },
  { id: 4, product: 'AirPods Pro', price: '$249' },
  { id: 5, product: 'Apple Watch Series 7', price: '$399' },
  { id: 6, product: 'Apple Watch Series 7', price: '$399' },
];

interface GridViewProps {
  columns: Column[];
  rows: Row[];
  onRowClick: (id: number) => void;
  expandedRows: Set<number>;
  selectedRows: Set<number>;
  onRowSelect: (id: number | 'all') => void;
  currentPage: number;
  rowsPerPage: number;
}

const GridView: React.FC<GridViewProps> = ({ columns, rows, onRowClick, expandedRows, selectedRows, onRowSelect, currentPage, rowsPerPage }) => {
  const startIdx = currentPage * rowsPerPage;
  const endIdx = startIdx + rowsPerPage;
  const paginatedRows = rows.slice(startIdx, endIdx);

  return (
    <div className="grid-view">
      <div className="grid-header" style={{ display: 'flex', backgroundColor: '#f0f0f0', padding: '8px 0' }}>
        <div style={{ width: '5%' }}>
          <Checkbox
            checked={selectedRows.size === rows.length}
            onChange={() => onRowSelect('all')}
          />
        </div>
        {columns.map((column) => (
          <div key={column.field} style={{ width: column.width }}>
            {column.headerName}
          </div>
        ))}
      </div>
      {paginatedRows.map((row) => (
        <div key={row.id} className="grid-row" style={{ display: 'flex', flexDirection: 'column', borderBottom: '1px solid #e0e0e0', padding: '8px 0' }}>
          <div style={{ display: 'flex', width: '100%' }}>
            <div style={{ width: '5%' }}>
              <Checkbox
                checked={selectedRows.has(row.id)}
                onChange={() => onRowSelect(row.id)}
              />
            </div>
            <div style={{ width: '25%' }}>
              <Button
                onClick={() => onRowClick(row.id)}
                endIcon={<ArrowDropDownIcon />}
                style={{ color: '#007bff', textTransform: 'uppercase' }}
              >
                {expandedRows.has(row.id) ? 'Hide Details' : 'Show Details'}
              </Button>
            </div>
            <div style={{ width: '40%' }}>{row.product}</div>
            <div style={{ width: '30%' }}>{row.price}</div>
          </div>
          {expandedRows.has(row.id) && (
            <Box key={`detail-${row.id}`} className="bg-gray-50 p-4 mt-2">
              <Typography>{`Product: ${row.product}`}</Typography>
              <Typography>{`Price: ${row.price}`}</Typography>
              <Typography>{`Can add more needed information here and here only.`}</Typography>
            </Box>
          )}
        </div>
      ))}
    </div>
  );
};

export default function ControlMasterDetail() {
  const [expandedRows, setExpandedRows] = React.useState<Set<number>>(new Set());
  const [selectedRows, setSelectedRows] = React.useState<Set<number>>(new Set());
  const [currentPage, setCurrentPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRowClick = (id: number) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleRowSelect = (id: number | 'all') => {
    setSelectedRows((prev) => {
      const newSet = new Set(prev);
      if (id === 'all') {
        if (newSet.size === rows.length) {
          newSet.clear();
        } else {
          rows.forEach(row => newSet.add(row.id));
        }
      } else {
        if (newSet.has(id)) {
          newSet.delete(id);
        } else {
          newSet.add(id);
        }
      }
      return newSet;
    });
  };

  const handleChangeRowsPerPage = (event: SelectChangeEvent<number>) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(0); // Reset to first page when rows per page change
  };

  const handleChangePage = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <Box className="w-full max-w-4xl mx-auto p-5 pt-20 relative">
      <Paper className="bg-white relative shadow-lg rounded-lg p-4">
        <GridView
          columns={columns}
          rows={rows}
          onRowClick={handleRowClick}
          expandedRows={expandedRows}
          selectedRows={selectedRows}
          onRowSelect={handleRowSelect}
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
        />
        <Box className="flex justify-between mt-4">
          <Select
            value={rowsPerPage}
            onChange={handleChangeRowsPerPage}
            style={{ marginRight: '16px' }}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={15}>15</MenuItem>
          </Select>
          <Box>
            <Button
              onClick={() => handleChangePage(currentPage - 1)}
              disabled={currentPage === 0}
            >
              Previous
            </Button>
            <Button
              onClick={() => handleChangePage(currentPage + 1)}
              disabled={currentPage >= Math.ceil(rows.length / rowsPerPage) - 1}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
