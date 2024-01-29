import React, { useState, useMemo } from 'react';
import SmartPagination from './SmartPagination';
import "./SmartTableCss.css";
import { formatDate } from '../../../services/core/CommonService';
import { SmartSoftColumnConfig, SmartSoftDataRow,SmartSoftTableProps } from './SmartTableInterface';



const SmartTable: React.FC<SmartSoftTableProps> = (props) => {
  const {
    columns,
    data,
    tableProps,
    paginationProps,
    footerConfig
  } = props;

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(paginationProps?.pageSize || 10);
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);
  const [filterConfig, setFilterConfig] = useState<{ key: string; value: string } | null>(null);

  const sortedData = useMemo(() => {
    let sorted = [...data];

    if (sortConfig) {
      sorted.sort((a, b) => {
        const key = sortConfig.key;
        if (a[key] < b[key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[key] > b[key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    if (filterConfig) {
      const { key, value } = filterConfig;
      sorted = sorted.filter(item => String(item[key]).toLowerCase().includes(value.toLowerCase()));
    }

    return sorted;
  }, [data, sortConfig, filterConfig]);

  const pageCount = Math.ceil(sortedData.length / pageSize);


  const handleSort = (key: string) => {
    if (sortConfig && sortConfig.key === key) {
      setSortConfig({
        key,
        direction: sortConfig.direction === 'asc' ? 'desc' : 'asc',
      });
    } else {
      setSortConfig({
        key,
        direction: 'asc',
      });
    }
  };

  const setPageSizeHandle=(size:number)=>{
    setCurrentPage(1);
    setPageSize(size)
  }

  const handleFilter = (key: string, value: string) => {
    setFilterConfig({ key, value });
  };

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const visibleData = useMemo(() => {
    //  const startIndex = (currentPage-1) * pageSize;
    //const endIndex = startIndex + pageSize;
    // console.log("start " , startIndex, " end =" , endIndex," Current Page " , currentPage, "page Size " , pageSize);
    return sortedData.slice(startIndex, endIndex);
  }, [sortedData, startIndex, endIndex]);

  const handleSortColumn=(column:SmartSoftColumnConfig)=>{
    if(column.isSortable){
      handleSort(column.index);
    }
  }

  const displaySortingArrow=(index:string)=>{
    let direction = "desc";
    if (sortConfig && sortConfig.key === index) {
        direction = sortConfig.direction;
    }
    return direction==='asc' ? <span className="icon"><i className='fa fa-arrow-down'></i></span> 
     : <span className="icon"><i className='fa fa-arrow-up'></i></span>
  }

  const tableHeadDisp = () => {
    return (
      <thead>
        <tr>
          {columns.map(column => (
            <th
              key={column.index}
              onClick={() => handleSortColumn(column)}
              className={column?.classHead}            
            >
              {column.titleFunction ? column.titleFunction(handleSort,handleFilter) : column.title}
              {column.isSortable && displaySortingArrow(column.index)}
            </th>
          ))}
        </tr>
      </thead>
    )
  }
  
 const getValue=(column:SmartSoftColumnConfig, row:SmartSoftDataRow)=>{
   if(column.valueFunction){
     return column.valueFunction(row);
   }else{
     return row[column.index]!==undefined ? row[column.index] : null;
   }
 }

 const displayBodyCell=(column:SmartSoftColumnConfig,row:SmartSoftDataRow,rowIndex:number)=>{
     const value = getValue(column,row);
     switch(column.type){
        case "sno"  : return startIndex + rowIndex + 1;
        case "date" : return formatDate(value,column.dateFormat || "MM-DD-YYYY");
        default : return value;
     }
 }

 const defaultFooterConfig=()=>{
    return [
      {
        className:"is-6 p-5",
        footerType:"SHOW_ENTRIES"
      },
      {
        className:"is-6",
        footerType:"PAGINATION"
      }
    ]
 }

 const showEntries=()=>{
 return  <> showing {startIndex + 1} to {Math.min(endIndex, sortedData.length)} of {sortedData.length} entries </>
 }

 const paginationDisplay=()=>{
  return   <SmartPagination currentPage={currentPage}
  setCurrentPage={setCurrentPage} totalPages={pageCount} navigationIcon={paginationProps?.navigationIcon} />
 }

 const singleFooter=(item:any)=>{
    switch(item.footerType){
      case "SHOW_ENTRIES" : return showEntries()
      case "PAGINATION" : return paginationDisplay()
      case "FUNCTION" : return item.footerFunction(pageCount,setCurrentPage,setPageSizeHandle,startIndex,endIndex,sortedData.length)
      default : return "";
    }
 }

 const singleFooterDisplay=(index:any,item:any)=>{
  const class_list = ["column"];
  if(item?.className){
     class_list.push(item.className);
  }
  return (
    <div key={index} className={class_list.join(" ")}> 
      {singleFooter(item)}
    </div>
  )
 }


 const footerDisplay=()=>{
    const footerConfigFinal = footerConfig ? footerConfig : defaultFooterConfig();
    return footerConfigFinal.map((item,index)=>{
      return singleFooterDisplay(index,item);
    })
 }



  return (
    <div>
      <table className={'table is-fullwidth smart-table ' + tableProps?.className }>
        {tableHeadDisp()}
        <tbody>
          {visibleData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map(column => (
                <td key={column.index} className={column?.classBody}>
                  {displayBodyCell(column,row,rowIndex)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className='columns is-multiline p-0'>
        {footerDisplay()}       
      </div>
    </div>
  );
};

export default SmartTable