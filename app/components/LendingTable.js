'use client';

import { useEffect, useState } from 'react';
import {
  Typography,
  Avatar,
} from "@material-tailwind/react";
import { formatCurrency, formatPercentage, getChangeColor } from '../utils/format';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import Pagination from './Pagination';
import { usePagination } from '../hooks/usePagination';

export default function LendingTable() {

  const TABLE_HEAD = ["Index", "Name", "Logo", "TVL ($)", "1h Change", "24h Change", "7d Change"];

  const [protocols, setProtocols] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    const fetchProtocols = async () => {
      try {
        const response = await fetch('https://api.llama.fi/protocols');
        if (!response.ok) {
          throw new Error('Failed to fetch protocols data');
        }
        const data = await response.json();
        const lendingProtocols = data
          .filter((protocol) => protocol.category === 'Lending')
          .map((protocol, index) => ({
            ...protocol,
            index: index + 1,
          }));
        setProtocols(lendingProtocols);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch protocols data');
      } finally {
        setLoading(false);
      }
    };

    fetchProtocols();
  }, []);

  const { totalPages, paginateItems } = usePagination(protocols, pageSize);
  const displayedProtocols = paginateItems(currentPage);

  useEffect(() => {
    // Reset to first page when page size changes
    setCurrentPage(1);
  }, [pageSize]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Lending Protocols</h1>
      <div className="rounded-md border">
        <table className="mt-4 w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {displayedProtocols.map(
              (protocol, index) => {
                const isLast = index === displayedProtocols.length - 1;
                const classes = isLast
                  ? "p-4"
                  : "p-4 border-b border-blue-gray-50";
 
                return (
                  <tr key={protocol.index}>
                    <td className={classes}>
                      <div className="flex items-center gap-3">

                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {protocol.index}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {protocol.name}
                        </Typography>
                      </div>
                    </td>
                    <td className={classes}>
                      <div className="w-max">
                        <Avatar src={protocol.logo} alt={protocol.name} width={24} height={24} />
                      </div>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {formatCurrency(protocol.tvl)}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className={`font-normal ${getChangeColor(protocol.change_1h)}`}
                      >
                        {formatPercentage(protocol.change_1h)}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className={`font-normal ${getChangeColor(protocol.change_1d)}`}
                      >
                        {formatPercentage(protocol.change_1d)}
                      </Typography>
                    </td>
                    <td className={classes}>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className={`font-normal ${getChangeColor(protocol.change_7d)}`}
                      >
                        {formatPercentage(protocol.change_7d)}
                      </Typography>
                    </td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          pageSize={pageSize}
          onPageSizeChange={handlePageSizeChange}
          totalItems={protocols.length}
        />
      </div>
    </div>
  );
}