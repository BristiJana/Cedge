import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DataSource from './DataSource.js';
import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import './TenantOnboardComponent.css';
import ReactPaginate from 'react-paginate';

function TenantOnboardComponent() {
  const [dataSource, setDataSource] = useState(DataSource);
  const [displayColumns] = useState(['actions', 'tenant_name', 'tenant_type', 'address1', 'pincode']);
  const [screenName] = useState('Tenant Onboard');
  const [BTN_VAL, setBTN_VAL] = useState('Submit');
  const [USERID] = useState(localStorage.getItem('user_id'));
  const [submitBtn, setSubmitBtn] = useState(true);
  const [listDiv, setListDiv] = useState(false);
  const [showList, setShowList] = useState(true);
  const [rowData, setRowData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Default items per page

  const pageCount = Math.ceil(dataSource.length / itemsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleItemsPerPageChange = (event) => {
    const newItemsPerPage = parseInt(event.target.value);
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(0); // Reset to the first page when changing items per page
  };

  const visibleData = dataSource.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);

  const viewRecord = (row) => {
    setRowData(row);
    setShowList(false);
    setSubmitBtn(false);
    setListDiv(true);
  };

  const editRecord = (row) => {
    setRowData(row);
    setShowList(false);
    setListDiv(true);
    setSubmitBtn(true);
    setBTN_VAL('Update');
  };

  const showFormList = (item) => {
    setRowData([]);
    setBTN_VAL('Submit');
    if (item === false) {
      setListDiv(true);
      setShowList(false);
      setSubmitBtn(true);
    } else {
      setListDiv(false);
      setShowList(true);
    }
  };

  const onCancel = (item) => {
    setListDiv(item);
    setShowList(true);
    setRowData([]);
    setBTN_VAL('Submit');
  };

  const showSwalMassage = (message, icon) => {
    Swal.fire({
      title: message,
      icon: icon,
      timer: 2000,
      showConfirmButton: false,
    });
  };

  const tbl_FilterDatatable = (value) => {
    // Convert the search value to lowercase for case-insensitive filtering
    const searchValue = value.toLowerCase();
  
    // Filter the data based on the search value for all columns
    const filteredData = DataSource.filter((row) =>
      displayColumns.some((column) =>
        row[column] !== undefined &&
        row[column].toString().toLowerCase().includes(searchValue)
      )
    );
  
    // Update the 'dataSource' state with the filtered data
    setDataSource(filteredData);
  };
  
  

  const export_to_excel = () => {
    // Implement your export logic here
  };

  const getPaginationLabel = () => {
    if (pageCount === 0) return '';

    const start = currentPage * itemsPerPage + 1;
    const end = Math.min((currentPage + 1) * itemsPerPage, dataSource.length);
    return `${start} - ${end} of ${dataSource.length}`;
  };

  return (
    <section className="content">
        <div className="container">
        <div className="row clearfix">
          <div >
            <div className="card" style={{ width: '100%' }}>
              <div className="row clearfix">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                  <div className="header" style={{display:"flex",justifyContent:"space-between"}}>
                    <h5>
                      <strong>List of Tenant Onboard</strong>
                    </h5>
                    <Link to="/tenant-onboarddetail" >
                    <button
                        className="btn btn-secondary buttons-html5"
                        tabIndex="0"
                        aria-controls="example1"
                        type="button"
                     
                      >
                        <span>Add New Tenant Onboard</span>
                      </button></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row clearfix" hidden={listDiv} >
        <div style={{ width: '91%',margin:"auto"}}>
          <div className="card" >
            <div className="body">
              <div className="table-responsive">
                <div className="row clearfix" style={{marginTop:"20px",marginBottom:"20px"}}>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                    <div className="dt-buttons btn-group flex-wrap">
                      <button
                        className="btn btn-secondary buttons-html5"
                        tabIndex="0"
                        aria-controls="example1"
                        type="button"
                        onClick={export_to_excel}
                      >
                        <span>Export To Excel</span>
                      </button>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12" style={{ textAlign: 'right' }}>
                    <div className="mat-form-field" style={{display:"flex",flexDirection:"space-between"}}>
                      <label>
                        <em className="fa fa-search" aria-hidden="true"></em>
                        Search
                      </label>
                      <input type="text" onChange={(e) => tbl_FilterDatatable(e.target.value)} style={{marginLeft:"20px"}}/>
                    </div>
                  </div>
                </div>
                <table className="mat-table" id="excel-table">
                  {/* Table header */}
                  <thead>
                    <tr>
                      <th>Actions</th>
                      <th>Tenant Name</th>
                      <th>Tenant Type</th>
                      <th>Address1</th>
                      <th>Pin code</th>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleData.map((row) => (
                      <tr key={row.id}>
                        <td>
                          <span style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <button className="btn tblActnBtn h-auto" onClick={() => viewRecord(row)}>
                              <i className="fa fa-eye" aria-hidden="true"></i>
                            </button>
                            <button className="btn tblActnBtn h-auto" onClick={() => editRecord(row)}>
                              <i className="fa fa-pencil" aria-hidden="true"></i>
                            </button>
                          </span>
                        </td>
                        <td>{row.tenant_name}</td>
                        <td>{row.tenant_type}</td>
                        <td>{row.address1}</td>
                        <td>{row.pincode}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div style={{ display: "flex", justifyContent: "space-between" ,paddingTop:"30px",paddingBottom:"30px"}}>
  <div className="items-per-page" style={{alignSelf:"flex-end",width:"50%",marginLeft:"10px"}}>
    Items per page:
    <select value={itemsPerPage} onChange={handleItemsPerPageChange} style={{marginLeft:"8px",marginTop:"8px"}}>
      <option value={10}>10</option>
      <option value={15}>15</option>
      <option value={20}>20</option>
    </select>
  </div>
  <div className="pagination-label" style={{paddingTop:"8px"}}>{getPaginationLabel()}</div>
  <div className="pagination-first-last">
    <button
      className="btn btn-secondary pagination-btn"
      onClick={() => setCurrentPage(0)}
      disabled={currentPage === 0}
    >
      <i className="fa fa-angle-double-left"></i>
    </button>
    <button
      className="btn btn-secondary pagination-btn"
      onClick={() => setCurrentPage(currentPage - 1)}
    >
      <i className="fa fa-angle-left"></i>
    </button>
    <button
      className="btn btn-secondary pagination-btn"
      onClick={() => setCurrentPage(currentPage + 1)}
    >
      <i className="fa fa-angle-right"></i>
    </button>
    <button
      className="btn btn-secondary pagination-btn"
      onClick={() => setCurrentPage(pageCount - 1)}
      disabled={currentPage === pageCount - 1}
    >
      <i className="fa fa-angle-double-right"></i>
    </button>
  </div>
</div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TenantOnboardComponent;
