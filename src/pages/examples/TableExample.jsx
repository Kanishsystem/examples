import React, { useEffect, useState } from "react";
import SmartTable from "../../components/core/tables/SmartTable";
//import {SmartSoftTable} from 'soft_digi';

const TableExample = () => {
  const [tabData, setTabData] = useState([]);

  const titleDisplay=(handleSort,handleFilter)=>{
    return <p>Test</p>
  }

    const columns = [
        { title: 'ID', index: 'id',isSortable:true,type:"sno" },
        { title: 'Name', index: 'name' },
        { title: 'Age', index: 'age',isSortable:true },
        { title: 'Age', index: 'age',titleFunction:titleDisplay },
         {title:"Date",index:"sdate",type:"date",dateFormat:"DD-MM"}
      ];

    const data = [
        { id: 1, name: 'John', age: 25,sdate:"2022-05-06" },
        { id: 2, name: 'Jane', age: 30,sdate:"2024-01-15" },
        { id: 3, name: 'Doe', age: 4,sdate:"2024-01-06" },
        // ... more data
      ];
      const pagination = {
        navigationIcon:"fa-chevron"
      }

      const addNewObject = () => {
        // Create a new object to be added
        const newObject =   { id: 1, name: 'John', age: 25,sdate:"2023-05-06" };
    
        // Use the state updater function to add the new object to the state
        setTabData(prevData => [...prevData, newObject]);
      };

      useEffect(() => {
        setTabData(data);
      }, []);
      /*
    const basicTable=()=>{
        return (
            <SmartTable data={tabData}  columns={columns} />
        )
    }*/

    return (
       <>
       
        <p onClick={()=>addNewObject()} > Add </p>
       
        <SmartTable data={tabData}  columns={columns} paginationProps={pagination} />
       </>
    )
}

export default TableExample