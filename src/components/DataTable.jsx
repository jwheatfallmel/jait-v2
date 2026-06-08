import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
} from '@tanstack/react-table';
import './DataTable.css';

function DataTable({ data, columns, filters, onDownload }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const filteredData = useMemo(() => {
    return data.filter(item => {
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const searchableText = [
          item.name,
          item.category,
          item.domain,
          item.state,
          item.city || '',
          item.description,
          item.lastUpdated || ''
        ].join(' ').toLowerCase();
        
        if (!searchableText.includes(query)) {
          return false;
        }
      }

      // Filter by categories (handle comma-separated categories)
      if (filters.categories.length > 0) {
        const itemCategories = item.category 
          ? item.category.split(',').map(c => c.trim())
          : [];
        if (!itemCategories.some(cat => filters.categories.includes(cat))) {
          return false;
        }
      }

      // Filter by domain
      if (filters.domain.length > 0) {
        const itemDomains = Array.isArray(item.domain) ? item.domain : [item.domain];
        if (!itemDomains.some(dom => filters.domain.includes(dom))) {
          return false;
        }
      }

      // Filter by state
      if (filters.state.length > 0) {
        if (!filters.state.includes(item.state)) {
          return false;
        }
      }

      return true;
    });
  }, [data, filters, searchQuery]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: {
        pageSize: 10,
      },
    },
  });

  return (
    <div className="data-table-container">
      <div className="table-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by name, category, state, description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
        </div>
      </div>
      <div className="table-wrapper">
        <table className="data-table">
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className={header.column.getCanSort() ? 'sortable' : ''}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                    {{
                      asc: ' ↑',
                      desc: ' ↓',
                    }[header.column.getIsSorted()] ?? null}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="no-results">
                  No results found. Try adjusting your filters.
                </td>
              </tr>
            ) : (
              table.getRowModel().rows.map(row => (
                <tr 
                  key={row.id}
                  onClick={() => navigate(`/jai-t/${row.original.id}`)}
                  className="cursor-pointer hover:bg-blue-50 transition-colors"
                  style={{ cursor: 'pointer' }}
                >
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      <div className="table-pagination">
        <div className="pagination-controls">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="pagination-btn"
          >
            Previous
          </button>
          <span className="pagination-info">
            Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
          </span>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="pagination-btn"
          >
            Next
          </button>
        </div>
      </div>
      
      <div className="table-info">
        Showing {filteredData.length} of {data.length} entries
      </div>
      
      {onDownload && (
        <div className="download-container">
          <button onClick={() => onDownload(filteredData)} className="download-btn">
            Download CSV
          </button>
        </div>
      )}
    </div>
  );
}

export default DataTable;

