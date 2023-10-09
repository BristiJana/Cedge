// import React, { useState, useEffect } from 'react';
// import { useForm, useFieldArray } from 'react-hook-form';
// import Swal from 'sweetalert2';
// import Switch from 'react-switch';
// import { Form, Button } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css';

// const TenantHierarchyDefineComponent = () => {
//   const [screenName] = useState('Tenant Hierarchy Define');
//   const [BTN_VAL, setBTN_VAL] = useState('Submit');
//   const [showupdate, setShowUpdate] = useState(false);
//   const [tenantHierarchyData, setTenantHierarchyData] = useState([]);
//   const[obj,setobj]=useState(['Apex Bank','Member Bank','Zone','Region','Branch'])
//   const { control, handleSubmit, reset, register } = useForm({
//     defaultValues: {
//       is_permanent: false,
//       initialItemRow1: [{ tenant_type: '', sequence_no: 1 }],
//     },
//   });

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: 'initialItemRow1',
//   });

//   const handleTenantTypeChange = (e, index) => {
//     const selectedTenantType = e.target.value;
//   const isDuplicate = fields.some((field, i) => i !== index && field.tenant_type === selectedTenantType);

//   if (index === 0 && selectedTenantType !== 'Apex Bank') {
//     Swal.fire('First Tenant Type should be Apex Bank', 'error');
//     // Clear the selected Tenant Type to null
//     reset(`initialItemRow1[${index}].tenant_type`);
//   }
//   if (isDuplicate) {
//     Swal.fire('Tenant Type should not be repeated', 'error');
//     // Clear the selected Tenant Type to null
//     reset(`initialItemRow1[${index}].tenant_type`);
//   }
//   };
//   // Simulate the ngOnInit functionality with useEffect
//   useEffect(() => {
//     const user_id = localStorage.getItem('user_id');

//     // Fetch tenant hierarchy data and other required data here
//     // Replace the following placeholders with actual API calls
//     const fetchTenantHierarchyData = async () => {
//       // Replace with your actual API call
//       const tenantData = await fetch('/api/tenant-data');
//       const tenantDataJson = await tenantData.json();
//       setTenantHierarchyData(tenantDataJson);
//     };

//     fetchTenantHierarchyData();

//     setShowUpdate(true); // Update showupdate state as needed
//   }, []);

//   const onSubmit = async (data) => {
//     // try {
//     //   const response = await fetch('/api/submit-form', {
//     //     method: 'POST',
//     //     headers: {
//     //       'Content-Type': 'application/json',
//     //     },
//     //     body: JSON.stringify(data),
//     //   });

//     //   const result = await response.json();

//     //   if (result.status === 1) {
//     //     alert('Your record has been updated successfully!', 'success');
//     //   } else if (result.status === 2) {
//     //     alert('Your record has been added successfully!', 'success');
//     //   }

//     //   reset({
//     //     is_permanent: false,
//     //     initialItemRow1: [{ tenant_type: '', sequence_no: 1 }],
//     //   });

//     //   setBTN_VAL('Submit');
//     // } catch (error) {
//     //   console.log(error);
      
//     // }
//     const { initialItemRow1 } = data;

//   // Check if the first "Tenant Type" is "Apex Bank"
//   if (initialItemRow1[0].tenant_type !== 'Apex Bank') {
//     Swal.fire('First Tenant Type should be Apex Bank', 'error');
//     return;
//   }

//   // Check for duplicate Tenant Types
//   const tenantTypes = initialItemRow1.map((item) => item.tenant_type);
//   const uniqueTenantTypes = [...new Set(tenantTypes)];
//   if (tenantTypes.length !== uniqueTenantTypes.length) {
//     Swal.fire('Tenant Type should not be repeated', 'error');
//     return;
//   }

 
//   };

//   // const showSwalMassage = (message, icon) => {
//   //   Swal.fire({
//   //     title: message,
//   //     icon: icon,
//   //     timer: 2000,
//   //     showConfirmButton: false,
//   //   });
//   // };

//   return (
//     <section className="content" style={{height:"100%"}}>
//       <div className="container">
//         <div className="row clearfix">
//           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
//             <div className="card">
//               <div className="row clearfix">
//                 <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
//                   <div className="header">
//                     <h5>
//                       <strong>{screenName}</strong>
//                     </h5>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="container">
//         <div className="row clearfix">
//           <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
//             <Form onSubmit={handleSubmit(onSubmit)}>
//               <div className="card" style={{paddingTop:"40px",paddingBottom:"40px"}}>
//                 <div className="body">
//                   <div className="row clearfix" style={{display:"flex",justifyContent:"space-between"}}>
//                     <div >
//                       <div className="form-group"style={{width:"100%"}}>
//                         <Form.Label>Is Permanent? No</Form.Label>
                        
//                         <div style={{position:"absolute",top:"38px",left:"195px"}}>
//                         <Switch
//                           onChange={(checked) => setShowUpdate(checked)}
//                           checked={showupdate}
//                           offColor="#ccc"
//                           uncheckedIcon={<div style={{ visibility: 'hidden' }}>Unchecked</div>}
//                           checkedIcon={<div style={{ visibility: 'hidden' }}>Checked</div>}
                         
//                         /></div>
//                         <Form.Label style={{marginLeft:"80px"}}>Yes</Form.Label>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="card">
//                 <div className="body">
//                   <h5 style={{ textAlign: 'center' }}>
//                     <strong>Define {screenName} Details</strong>
//                   </h5>
//                   <br />
//                   <div className="table-responsive">
//                     <table className="display table table-hover table-checkable order-column m-t-20 width-per-100 table-bordered">
//                       <thead>
//                         <tr>
//                           {showupdate && (
//                             <th style={{ textAlign: 'center' }}>Action</th>
//                           )}
//                           <th style={{ textAlign: 'center' }}>Tenant Type</th>
//                           <th style={{ textAlign: 'center' }}>Sequence No</th>
//                         </tr>
//                       </thead>
//                       <tbody className="main_tbody">
                   
// {fields.map((field, index) => (
//   <tr key={field.id}>
//     {showupdate && (
//       <td>
//         <center>
//           {index === 0 ? (
//             <button
//               type="button"
//               className="btn btn-primary btn-rounded waves-effect"
//               onClick={() =>
//                 append({
//                   tenant_type: '',
//                   sequence_no: fields.length + 1, // Calculate sequence_no dynamically
//                 })
//               }
//             >
//               +
//             </button>
//           ) : (
//             <button
//               type="button"
//               className="btn btn-danger btn-rounded waves-effect"
//               onClick={() => remove(index)}
//             >
//               -
//             </button>
//           )}
//         </center>
//       </td>
//     )}
//     <td className="col_input">
//       <select
//         {...register(`initialItemRow1.${index}.tenant_type`)}
//         id={`tenant_type${index + 1}`}
//         placeholder="Select Tenant Type"
       
//         style={{ width: '100%', color: 'black', paddingTop: '4px', paddingBottom: '4px' }}
//         onChange={(e) => handleTenantTypeChange(e, index)}
//       >
//         {/* {obj.map((data) => (
//           <option key={data.id} value={data.id}>
//             {data.master_value}
//           </option>
//         ))} */}
//          {obj.map((data) => (
//           <option >
//             {data}
//           </option>
//         ))}
//       </select>
//     </td>
//     <td className="col_input">
//       <input
//         type="number"
//         {...register(`initialItemRow1.${index}.sequence_no`)}
//         placeholder="Enter Sequence Number"
//       />
//     </td>
//   </tr>
// ))}


//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </div>
//               <div className="card">
//                 <div className="body" style={{ textAlign: 'center' }}>
//                   <div className="button-demo">
//                     <Button className="btn btn-primary mr5" type="submit">
//                       {BTN_VAL}
//                     </Button>
//                     <Button
//                       onClick={() => reset({ is_permanent: false, initialItemRow1: [{ tenant_type: '', sequence_no: 1 }] })}
//                       className="btn btn-danger"
//                       value="Cancel"
//                     >
//                       Cancel
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </Form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default TenantHierarchyDefineComponent;


import React, { useState, useEffect } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import Swal from 'sweetalert2';
import Switch from 'react-switch';
import { Form, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'

const TenantHierarchyDefineComponent = () => {
  const [screenName] = useState('Tenant Hierarchy Define');
  const [BTN_VAL, setBTN_VAL] = useState('Submit');
  const [showupdate, setShowUpdate] = useState(false);
  const [tenantHierarchyData, setTenantHierarchyData] = useState([]);
  const[obj, setObj] = useState(['Apex Bank', 'Member Bank', 'Zone', 'Region', 'Branch']);
  const { control, handleSubmit, reset, register, setValue } = useForm({
    defaultValues: {
      is_permanent: false,
      initialItemRow1: [{ tenant_type: '', sequence_no: 1 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'initialItemRow1',
  });

  const handleTenantTypeChange = (e, index) => {
    const selectedTenantType = e.target.value;
    const isDuplicate = fields.some((field, i) => i !== index && field.tenant_type === selectedTenantType);

    if (index === 0 && selectedTenantType !== 'Apex Bank') {
     
      Swal.fire({
        icon: 'error',
              title:'Top Most Level should be Apex Bank',
              
              timer: 2000,
              showConfirmButton: false,
            });
     
      setValue(`initialItemRow1[${index}].tenant_type`, null);
    } else if (isDuplicate) {
      
      Swal.fire({
        icon: 'warning',
        title:'Tenant Type already exist',
       
        timer: 2000,
        showConfirmButton: false,
      });
      setValue(`initialItemRow1[${index}].tenant_type`, null);
    }
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

  const onSubmit = async (data) => {
    // Your form submission logic here
  };

  return (
    <section className="content" style={{ height: "100%" }}>
      <div className="container">
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="card">
              <div className="row clearfix">
                <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12">
                  <div className="header">
                    <h5>
                      <strong>{screenName}</strong>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <Form onSubmit={handleSubmit(onSubmit)}>
              <div className="card" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
                <div className="body">
                  <div className="row clearfix" style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                      <div className="form-group" style={{ width: "100%" }}>
                        <Form.Label>Is Permanent? No</Form.Label>
                        <div style={{ position: "absolute", top: "38px", left: "195px" }}>
                          <Switch
                            onChange={(checked) => setShowUpdate(checked)}
                            checked={showupdate}
                            offColor="#ccc"
                            uncheckedIcon={<div style={{ visibility: 'hidden' }}>Unchecked</div>}
                            checkedIcon={<div style={{ visibility: 'hidden' }}>Checked</div>}
                          />
                        </div>
                        <Form.Label style={{ marginLeft: "80px" }}>Yes</Form.Label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="body">
                  <h5 style={{ textAlign: 'center' }}>
                    <strong>Define {screenName} Details</strong>
                  </h5>
                  <br />
                  <div className="table-responsive">
                    <table className="display table table-hover table-checkable order-column m-t-20 width-per-100 table-bordered">
                      <thead>
                        <tr>
                          {showupdate && (
                            <th style={{ textAlign: 'center' }}>Action</th>
                          )}
                          <th style={{ textAlign: 'center' }}>Tenant Type</th>
                          <th style={{ textAlign: 'center' }}>Sequence No</th>
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
                              <select
                                {...register(`initialItemRow1.${index}.tenant_type`)}
                                id={`tenant_type${index + 1}`}
                                placeholder="Select Tenant Type"
                                style={{ width: '100%', color: 'black', paddingTop: '4px', paddingBottom: '4px' }}
                                onChange={(e) => handleTenantTypeChange(e, index)}
                              >
                                {obj.map((data, dataIndex) => (
                                  <option key={dataIndex}>
                                    {data}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td className="col_input">
                              <input
                                type="number"
                                {...register(`initialItemRow1.${index}.sequence_no`)}
                                placeholder="Enter Sequence Number"
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TenantHierarchyDefineComponent;
