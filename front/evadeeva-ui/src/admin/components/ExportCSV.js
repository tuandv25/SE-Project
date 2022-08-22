import React from 'react'
import { CSVLink } from 'react-csv'

export const ExportReactCSV = ({csvData, fileName}) => {
    return (
        <button type="button" className="export-excel btn btn-outline-secondary" >
            <CSVLink data={csvData} filename={fileName}>Xuất Excel</CSVLink>
        </button>
    )
}