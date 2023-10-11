import React, { useState ,useEffect} from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { DataSourcerole } from './DataSource.js';

import Swal from 'sweetalert2';
import * as XLSX from 'xlsx';
import './TenantOnboardComponent.css';
import ReactPaginate from 'react-paginate';
import {
    FormControl,
    FormGroup,
    TextField,
    Button,
    FormControlLabel,
    Switch,
    TextareaAutosize,
    Select,
    MenuItem,
    InputLabel,
    FormLabel
  } from "@material-ui/core";
function ScheduleProcess() {


    const [screenName] = useState('Tenant Hierarchy Define');
    const [BTN_VAL, setBTN_VAL] = useState('Submit');
    const [showupdate, setShowUpdate] = useState(false);
    const[obj, setObj] = useState(['Select','Loan And Process']);
    const [selectedTime, setSelectedTime] = useState('');

    const handleTimeChange = (e) => {
      setSelectedTime(e.target.value);
    };
    const { control, handleSubmit, reset, register, setValue } = useForm({
      defaultValues: {
        is_permanent: false,
        initialItemRow1: [{ tenant_name: ''}],
      },
    });
  
    const { fields, append, remove } = useFieldArray({
      control,
      name: 'initialItemRow1',
    });
  
    const handleTypeChange = (e, index) => {
        const selectedTenantType = e.target.value;
        setValue(`initialItemRow1[${index}].tenant_name`, selectedTenantType);
      };
      
      
   
  
    // Simulate the ngOnInit functionality with useEffect
    useEffect(() => {
      const user_id = localStorage.getItem('user_id');
  
      // Fetch tenant hierarchy data and other required data here
      // Replace the following placeholders with actual API calls
      const fetchTenantHierarchyData = async () => {
        // Replace with your actual API call
        const tenantData = await fetch('/api/tenant-data');
        const tenantDataJson = await tenantData.json();
        setTenantHierarchyData(tenantDataJson);
      };
  
      fetchTenantHierarchyData();
  
      setShowUpdate(true); // Update showupdate state as needed
    }, []);

  const [dataSource, setDataSource] = useState(DataSourcerole);
  const [displayColumns] = useState(['actions', 'tenant_name','is_active']);
  
  
  
 
  const [USERID] = useState(localStorage.getItem('user_id'));
  const [submitBtn, setSubmitBtn] = useState(true);
  const [listDiv, setListDiv] = useState(false);
  const [showList, setShowList] = useState(true);
  const [rowData, setRowData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Default items per page
  const[open,setopen]=useState(true)
  
  const [selectedDate1, setSelectedDate1] = useState('');
  const [selectedDate2, setSelectedDate2] = useState('');

  const handleDateChange1= (event) => {
    setSelectedDate1(event.target.value);
  };
  const handleDateChange2= (event) => {
    setSelectedDate2(event.target.value);
  };


  
 

  
  const pageCount = Math.ceil(0 / itemsPerPage);

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
    const filteredData = DataSourcerole.filter((row) =>
      displayColumns.some((column) =>
        row[column] !== undefined &&
        row[column].toString().toLowerCase().includes(searchValue)
      )
    );
  
    // Update the 'dataSource' state with the filtered data
    setDataSource(filteredData);
  };
  
  
  const getPaginationLabel = () => {
    if (pageCount === 0) return '0 of 0';

    const start = currentPage * itemsPerPage + 1;
    const end = Math.min((currentPage + 1) * itemsPerPage, dataSource.length);
    return `${start} - ${end} of ${dataSource.length}`;
  };

  


  const [tenantonboardForm, setTenantonboardForm] = useState({
    id: "",
    tenant_name: "",
    datestart:"",
    dateend:"",
    
  });
  const [BTN_VAL1, setBTN_VAL1] = useState("Submit");
  const [tenantHierarchyData, setTenantHierarchyData] = useState([]);
  const[nob,setNob]=useState(true)
  const [editdisabled, setEditDisabled] = useState(false);
  const [submitBtn1, setSubmitBtn1] = useState(true);
  useEffect(() => {
    
  }, []);

  const viewRecord1= (row) => {
    
    setTenantonboardForm({
      ...tenantonboardForm,
      id: row.id,
      tenant_name: row.tenant_name,
      datestart:row.datestart,
      dateend:row.dateend,
    });
    setBTN_VAL1("Update");
    setEditDisabled(true);
  };

  const onCancelForm = () => {
    setTenantonboardForm({
      id: "",
      tenant_name: "",
      datestart:"",
      dateend:"",
      
      
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (isFormValid()) {
      const formData = tenantonboardForm;
    }
  };

  const isFormValid = () => {
    return true; 
  };

  const handleInputChange = (event) => {
    const { name, value, type} = event.target;
    const updatedForm = { ...tenantonboardForm };

    

    setTenantonboardForm(updatedForm);
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
                   
                    {open?(<>
                     <h5>
                     <strong>List of Schedule Process</strong>
                   </h5><button
                        className="btn btn-secondary buttons-html5"
                        tabIndex="0"
                        aria-controls="example1"
                        type="button"
                        onClick={() => setopen(!open)}
                      ><em className="fa fa-plus" aria-hidden="true" style={{ color: 'white' }}></em>
                        <span>Add New Schedule Process</span>
                      </button></>):(<>
                        <h5>
                     <strong>Define Schedule Process</strong>
                   </h5><button
                        className="btn btn-secondary buttons-html5"
                        tabIndex="0"
                        aria-controls="example1"
                        type="button"
                        onClick={() => setopen(!open)}
                      ><em className="fa fa-calendar" aria-hidden="true" style={{ color: 'white' }}></em>
                        <span>List of Schedule Process</span>
                      </button></>)}
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {open?(<div className="row clearfix" hidden={listDiv} >
        <div style={{ width: '91%',margin:"auto"}}>
          <div className="card" >
            <div className="body">
              <div className="table-responsive">
                <div className="row clearfix" style={{marginTop:"20px",marginBottom:"20px"}}>
                  
                  <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12" style={{ textAlign: 'right' }}>
                    <div className="mat-form-field" style={{display:"flex",flexDirection:"space-between"}}>
                      <label>
                        <em className="fa fa-search" aria-hidden="true" color='black'></em>
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
                      <th style={{textAlign:"center"}}>Actions</th>
                      <th style={{textAlign:"right",paddingRight:"120px"}}>Tenant Name</th>
                      <th style={{textAlign:"right",paddingRight:"120px"}}>Is Active</th>
                    </tr>
                  </thead>
                  <tbody>
                  
                      <tr >
                        <td style={{width:"15%"}}>
                          <span style={{ display: 'flex', justifyContent: 'space-between' }}>
                          
                            <button className="btn tblActnBtn h-auto" onClick={() => {setNob(!nob);setopen(!open)}}>
                              <i className="fa fa-eye" aria-hidden="true"></i>
                            </button>
                           
                            <button className="btn tblActnBtn h-auto" onClick={() => {setBTN_VAL1("Update");setopen(!open)}}>
                              <i className="fa fa-pencil" aria-hidden="true"></i>
                            </button>
                          </span>
                        </td>
                        <td style={{textAlign:"center",paddingLeft:"180px"}}>Apex Bank Nabard</td>
                        <td style={{textAlign:"center"}}>true</td>
                      </tr>
                  
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
      </div>):( <div className="row clearfix" style={{ width: '82%',margin:"auto"}}>
        <div >
          <form onSubmit={onSubmit}>
            <div className="card" style={{paddingTop:"20px",paddingBottom:"20px"}}>
              <div className="body">
                <div className="row clearfix">
                 
                  {/* Additional form fields */}
                 
                  

                 

                  

                 

                 

                 
              
                  <div className="col-lg-4 col-md-4 col-sm-4 col-xs-8">
                    <div className="form-group">
                    <FormLabel style={{color:"black",marginBottom:"10px"}}>Tenant Name<em style={{ color: "red" }}>*</em></FormLabel>
                    
                      
                      <TextField
                        type="text"
                        name="pincode"
                        value={tenantonboardForm.tenant_name}
                        onChange={handleInputChange}
                        variant="outlined"
                        placeholder="Tenant Name"
                        required
                      />
                    </div>
                  </div>
                 
                  <div className="col-lg-4 col-md-4 col-sm-4 col-xs-8">
                  <FormLabel style={{color:"black",marginBottom:"10px"}}>From Date<em style={{ color: "red" }}>*</em></FormLabel>
                    
                    <div className="form-group">
                   
                      
                    <input
        type="date"
        id="dateInput"
        name="dateInput"
        value={selectedDate1}
        onChange={handleDateChange1}
        placeholder="Choose date" 
        className="custom-date-input"
      />
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-4 col-xs-8">
                  <FormLabel style={{color:"black",marginBottom:"10px"}}>To Date<em style={{ color: "red" }}>*</em></FormLabel>
                    
                    <div className="form-group">
                   
                      
                    <input
        type="date"
        id="dateInput"
        name="dateInput"
        value={selectedDate2}
        onChange={handleDateChange2}
        placeholder="Choose date" 
        className="custom-date-input"
      />
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 mb-4" style={{paddingTop:"10px"}}>
                    <div className="form-group">
                      <label className="form-label"style={{marginRight:"10px"}}>Is Active?</label>
                      
                      <FormControlLabel
                        control={
                          <Switch
                            name="is_active"
                            checked={tenantonboardForm.is_active}
                            onChange={handleInputChange}
                            color="primary"
                          />
                        }
                        label={tenantonboardForm.is_active ? "Yes" : "No"}
                      />
                    </div>
                  </div>
                  {/* More form fields */}
                </div>
              </div>
            </div>
           
            <div className="card" style={{paddingBottom:"20px"}}>
              <div className="body" style={{ textAlign: "center" }}>
            
                  <div className="table-responsive">
                    <table className="display table table-hover table-checkable order-column m-t-20 width-per-100 table-bordered">
                      <thead>
                        <tr>
                          {showupdate && (
                            <th style={{ textAlign: 'center' }}>Action</th>
                          )}
                          <th style={{ textAlign: 'center' }}>
                          Process Name <em style={{ color: "red" }}>*</em></th>
                          <th style={{ textAlign: 'center' }}>
                          Process Type <em style={{ color: "red" }}>*</em></th>  <th style={{ textAlign: 'center' }}>
                          Process Start Time <em style={{ color: "red" }}>*</em></th>
                         
                        </tr>
                      </thead>
                      <tbody className="main_tbody">
                        {fields.map((field, index) => (
                          <tr key={field.id}>
                            {showupdate && (
                              <td>
                                <center>
                                  {index === 0 ? (
                                    <button
                                      type="button"
                                      className="btn btn-primary btn-rounded waves-effect"
                                      onClick={() =>
                                        append({
                                          tenant_type: '',
                                          sequence_no: fields.length + 1, // Calculate sequence_no dynamically
                                        })
                                      }
                                    >
                                      +
                                    </button>
                                  ) : (
                                    <button
                                      type="button"
                                      className="btn btn-danger btn-rounded waves-effect"
                                      onClick={() => remove(index)}
                                    >
                                      -
                                    </button>
                                  )}
                                </center>
                              </td>
                            )}
                               <td className="col_input">
                               <input
        id={`role_name${index + 1}`}
        type="text"
        onChange={(e) => {
          // Use setValue to update the role_name value in the form data
          setValue(`initialItemRow1[${index}].process_type`, e.target.value);
        }}
       
      />
     
    </td>
    <td className="col_input">
    <select
        {...register(`initialItemRow1.${index}.tenant_type`)}
        id={`tenant_type${index + 1}`}
        placeholder="Select Role Type"
        style={{ width: '100%', color: 'black', paddingTop: '4px', paddingBottom: '4px' }}
        onChange={(e) => handleTypeChange(e, index)}
      >
        {obj.map((data, dataIndex) => (
          <option key={dataIndex}>
            {data}
          </option>
        ))}
      </select>
    </td><td className='col_input'>
    <input
        type="time"
        value={selectedTime}
        onChange={handleTimeChange}
        className='timee'

      />
    </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
              </div>
            </div>
            <div className="card" style={{paddingBottom:"20px"}}>
              <div className="body" style={{ textAlign: "center" }}>
                <div className="button-demo">
                    {nob?( <Button
                    className="btn btn-primary mr5"
                    type="submit"
                    disabled={!submitBtn1}
                    
                  >
                    {BTN_VAL1}
                  </Button>):(<></>)}
                 
                  <Button
                    onClick={onCancelForm}
                    className="btn btn-danger"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      )}
      
    </section>
  );
}

export default ScheduleProcess;
