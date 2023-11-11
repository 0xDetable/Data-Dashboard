/*
import React, {useState} from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';
import DefillamaTable from "./detable";

import Card from '@material-ui/core/Card';
import SortIcon from '@material-ui/icons/ArrowDownward';

interface DataRow {
    asset_id: string;
    asset_name: string;
    symbol: string;
    price: string;
}

const columns: TableColumn<DataRow>[] = [
    {
      name: "Asset ID",
      selector: row => row.asset_id,
      sortable: true
    },
    {
      name: "Name",
      selector: row => row.asset_name,
      sortable: true
    },
    {
      name: "Symbol",
      selector: row => row.symbol,
      sortable: false
    },
    {
      name: "Price",
      selector: row => row.price,
      sortable: true
    }
  ];
*/
/* 
To add filter
const [records, setRecords] = useState(DefillamaTable);

function handleFilter(event: any): void {
    const newData = DefillamaTable.filter(row => {
        return row.asset_id.toLowerCase().includes(event.target.value.toLowerCase())
    })
    setRecords(newData)
}
*/
/*
const Data = () => {
    
    return (
        <div className='container'>
            <Card>
            <DataTable
                title="Data"
                columns={columns}
                data={DefillamaTable}
                //defaultSortField="asset_id"
                // sortIcon={<SortIcon />}
                pagination
                fixedHeader
                //selectableRows
            />
            </Card>

        </div>
    )  
}

export default Data;
*/

import React, { useState, useEffect } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';
import Card from '@material-ui/core/Card';
import Papa from 'papaparse';
import "raw-loader";
import InfiniteScroll from "react-infinite-scroll-component";

interface DataRow {
  asset_id: number;
  asset_name: string;
  symbol: string;
  price: number;
  off_peg: number;
  market_cap: number;
  market_cap_percentage: number;
  pegType: string;
  pegMechanism: string;
}

const formatMarketCap = (marketCap: number | null): string => {
  if (marketCap === null) {
    return 'N/A'; // Or any other suitable placeholder for null values
  }

  if (marketCap >= 1e9) {
    return (marketCap / 1e9).toFixed(1) + 'b $';
  } else if (marketCap >= 1e6) {
    return (marketCap / 1e6).toFixed(1) + 'm $';
  } else {
    return marketCap.toLocaleString() + ' $';
  }
};
  
  const MarketCapCell = ({ value }: { value: number }) => (
    <div>{formatMarketCap(value)}</div>
  );

const columns: TableColumn<DataRow>[] = [
  {
    name: "Asset ID",
    selector: row => row.asset_id,
    sortable: true
  },
  {
    name: "Name",
    selector: row => row.asset_name,
    sortable: true
  },
  {
    name: "Symbol",
    selector: row => row.symbol,
    sortable: false
  },
  {
    name: "Price",
    selector: row => row.price,
    sortable: true
  },
  {
    name: "% Off Peg",
    selector: row => (row.off_peg * 100).toLocaleString() + '%',
    sortable: true
  },
  {
    name: "MarketCap",
    cell: (row) => <MarketCapCell value={row.market_cap} />,
    sortable: true,
    sortFunction: (a, b) => a - b, // Add a custom sort function
  },
  {
    name: "MarketCap Percentage",
    selector: row => (row.market_cap_percentage * 100).toLocaleString(undefined, { maximumFractionDigits: 2 }) + '%',
    sortable: true
  },
  {
    name: "Peg Type",
    selector: row => row.pegType,
    sortable: false
  },
  {
    name: "Peg Mechanism",
    selector: row => row.pegMechanism,
    sortable: false
  }
];

const Data = () => {
  const [csvData, setCsvData] = useState<DataRow[]>([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    const filePath = require('!!raw-loader!./data.csv').default;

    Papa.parse(filePath, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (results: Papa.ParseResult<DataRow>) => {
        const parsedData = results.data || [];
        const filteredData = parsedData.map(row => ({
            asset_id: row.asset_id,
            asset_name: row.asset_name,
            symbol: row.symbol,
            price: row.price,
            off_peg: row.off_peg,
            market_cap: row.market_cap,
            market_cap_percentage: row.market_cap_percentage,
            pegType: row.pegType,
            pegMechanism: row.pegMechanism,

          }));

        setCsvData(filteredData);
        setHasMore(false); // Set hasMore to false as we won't load more data
      },
    });
  }, []);

  return (
    <Card style={{ overflowY: 'auto'}}>
        <InfiniteScroll
          dataLength={csvData.length}
          next={() => {}} // Empty function, as we don't want to load more data
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
        >
 
        
          <DataTable
            title="Data"
            columns={columns}
            data={csvData}
            paginationServer
            paginationTotalRows={csvData.length}
            fixedHeader
          />
        

      </InfiniteScroll>
    </Card>
  );
};

export default Data;