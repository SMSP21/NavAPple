"use client";
import * as React from 'react';
import { Box, MenuItem, Select, SelectChangeEvent, Button, Table, TableBody, TableCell, TableHead, TableRow, Checkbox } from '@mui/material';

const columns = [
  { field: 'actions', headerName: 'Actions', minWidth: 200 },
  { field: 'col1', headerName: 'Product', minWidth: 200 },
  { field: 'col2', headerName: 'Price', minWidth: 150 },
];

const rows = [
  { id: 1, col1: 'iPhone 13', col2: '$799' },
  { id: 2, col1: 'MacBook Air', col2: '$999' },
  { id: 3, col1: 'iPad Pro', col2: '$799' },
  { id: 4, col1: 'AirPods Pro', col2: '$249' },
  { id: 5, col1: 'Apple Watch Series 7', col2: '$399' },
  { id: 6, col1: 'Apple Watch Series 7', col2: '$399' },
];

export default function ControlMasterDetail() {
  const [detailPanelExpandedRowIds, setDetailPanelExpandedRowIds] = React.useState<number[]>([]);
  const [selectedAdditionalInfo, setSelectedAdditionalInfo] = React.useState<string>('');
  const [pageSize, setPageSize] = React.useState<number>(10);
  const [currentPage, setCurrentPage] = React.useState<number>(1);
  const [dropdownOpen, setDropdownOpen] = React.useState<boolean>(false);
  const [selectedRows, setSelectedRows] = React.useState<Set<number>>(new Set());
  const allRowIds = rows.map(row => row.id);

  const handleDetailPanelToggle = (id: number) => {
    setDetailPanelExpandedRowIds((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const handleAdditionalInfoChange = (event: SelectChangeEvent<string>, rowId: number) => {
    const { value } = event.target;
    setSelectedAdditionalInfo(value);
    setDropdownOpen(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (event: SelectChangeEvent<number>) => {
    const newPageSize = event.target.value as number;
    setPageSize(newPageSize);
  };

  const handleRowSelection = (id: number) => {
    setSelectedRows((prev) => {
      const newSelectedRows = new Set(prev);
      if (newSelectedRows.has(id)) {
        newSelectedRows.delete(id);
      } else {
        newSelectedRows.add(id);
      }
      return newSelectedRows;
    });
  };

  const handleSelectAll = () => {
    if (selectedRows.size === allRowIds.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(allRowIds));
    }
  };

  const paginatedRows = React.useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return rows.slice(startIndex, endIndex);
  }, [rows, currentPage, pageSize]);

  return (
    <Box className="w-full max-w-4xl mx-auto p-5 pt-20 relative">
      <Box className="h-400 mt-1 bg-white relative shadow-lg rounded-lg">
        <Table className="min-w-full bg-white">
          <TableHead>
            <TableRow className="bg-gray-200">
              <TableCell className="p-4">
                <Checkbox
                  checked={selectedRows.size === allRowIds.length}
                  onChange={handleSelectAll}
                />
                {columns[0].headerName}
              </TableCell>
              {columns.slice(1).map((col) => (
                <TableCell key={col.field} className="p-4">
                  {col.headerName}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row) => (
              <React.Fragment key={row.id}>
                <TableRow className="border-b hover:bg-gray-50">
                  <TableCell className="p-4 flex items-center">
                    <Checkbox
                      checked={selectedRows.has(row.id)}
                      onChange={() => handleRowSelection(row.id)}
                    />
                    <Button className="ml-2 text-blue-500" onClick={() => handleDetailPanelToggle(row.id)}>
                      {detailPanelExpandedRowIds.includes(row.id) ? 'Hide' : 'Show'} Details
                    </Button>
                  </TableCell>
                  <TableCell className="p-4">{row.col1}</TableCell>
                  <TableCell className="p-4">{row.col2}</TableCell>
                </TableRow>
                {detailPanelExpandedRowIds.includes(row.id) && (
                  <TableRow className="bg-gray-50">
                    <TableCell colSpan={3} className="p-4">
                      <Box className="p-2">
                        <div>{`Product: ${row.col1}`}</div>
                        <div>{`Price: ${row.col2}`}</div>
                        {dropdownOpen && (
                          <Select
                            value={selectedAdditionalInfo}
                            onOpen={() => setDropdownOpen(true)}
                            onClose={() => setDropdownOpen(false)}
                            displayEmpty
                            fullWidth
                            variant="outlined"
                            className="mt-2"
                            onChange={(event) => handleAdditionalInfoChange(event, row.id)}
                          >
                            <MenuItem value="" disabled>
                              Additional Info
                            </MenuItem>
                            <MenuItem value="Info1">Additional Info 1</MenuItem>
                            <MenuItem value="Info2">Additional Info 2</MenuItem>
                            <MenuItem value="Info3">Additional Info 3</MenuItem>
                          </Select>
                        )}
                        {selectedAdditionalInfo && (
                          <div className="font-bold mt-2">Selected: {selectedAdditionalInfo}</div>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
        <Box className="flex justify-between mt-2">
          <Select
            value={pageSize}
            onChange={handlePageSizeChange}
            variant="outlined"
            className="w-20"
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={25}>25</MenuItem>
            <MenuItem value={50}>50</MenuItem>
          </Select>
          <Box className="flex space-x-2">
            {Array.from({ length: Math.ceil(rows.length / pageSize) }, (_, index) => (
              <Button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                disabled={currentPage === index + 1}
                className={`px-4 py-2 ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
              >
                {index + 1}
              </Button>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
