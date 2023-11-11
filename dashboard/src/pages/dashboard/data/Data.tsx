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

interface DataRow {
  asset_id: number;
  asset_name: string;
  symbol: string;
  gecko_id: number;
  price: number;
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
    name: "Gecko ID",
    selector: row => row.gecko_id,
    sortable: false
  },
  {
    name: "Price",
    selector: row => row.price,
    sortable: true
  }
];

const Data = () => {
    const [csvData, setCsvData] = useState<DataRow[]>([]);
  
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
            gecko_id: row.gecko_id,
            symbol: row.symbol,
            price: row.price,
          }));
  
          setCsvData(filteredData);
        },
      });
    }, []);
  
    return (
      <div className='container'>
        <Card>
          <DataTable
            title="Data"
            columns={columns}
            data={csvData}
            pagination
            fixedHeader
          />
        </Card>
      </div>
    );
  };
  
  export default Data;