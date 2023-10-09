import React, { Component } from "react";
import { Link } from "react-router-dom";
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
import './TenantOnboardComponent.css';
class Tenant1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tenantonboardForm: {
        id: "",
        tenant_name: "",
        tenant_shortname: "",
        is_legal_tenant: false,
        tenant_code: "",
        tenant_type_ref_id: "",
        tenant_belongs_to: "",
        address1: "",
        address2: "",
        bank_tenant_ref_id: "",
        pincode: "",
        country_ref_id: "",
        state_ref_id: "",
        city_ref_id: "",
        is_active: true,
      },
      BTN_VAL: "Submit",
      tenantHierarchyData: [],
      countrydata: [],
      statedata: [],
      cityData: [],
      tenantData: [],
      BankTenantData: [],
      editdisabled: false,
      submitBtn: true,
    };
  }

  componentDidMount() {
    // Fetch data and set state for tenantHierarchyData, countrydata, and other data
  }

  viewRecord(row) {
    // Populate form fields with the data from the 'row' parameter
    this.setState({
      tenantonboardForm: {
        ...this.state.tenantonboardForm,
        id: row.id,
        tenant_name: row.tenant_name,
        tenant_shortname: row.tenant_shortname,
        is_legal_tenant: row.is_legal_tenant,
        tenant_code: row.tenant_code,
        tenant_type_ref_id: row.tenant_type_ref_id,
        tenant_belongs_to: row.tenant_belongs_to,
        address1: row.address1,
        address2: row.address2,
        bank_tenant_ref_id: row.bank_tenant_ref_id,
        pincode: row.pincode,
        country_ref_id: row.country_ref_id,
        state_ref_id: row.state_ref_id,
        city_ref_id: row.city_ref_id,
        is_active: row.is_active,
      },
      BTN_VAL: "Update",
      editdisabled: true,
    });
  }

  onCancelForm() {
    this.setState({
      tenantonboardForm: {
        id: "",
        tenant_name: "",
        tenant_shortname: "",
        is_legal_tenant: false,
        tenant_code: "",
        tenant_type_ref_id: "",
        tenant_belongs_to: "",
        address1: "",
        address2: "",
        bank_tenant_ref_id: "",
        pincode: "",
        country_ref_id: "",
        state_ref_id: "",
        city_ref_id: "",
        is_active: true,
      },
    });
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.isFormValid()) {
      // Handle form submission
      const formData = this.state.tenantonboardForm;
      // Emit onSave event with formData
    }
  }

  isFormValid() {
    // Implement your form validation logic here
    return true; // Change this to return true/false based on validation
  }

  handleInputChange(event) {
    const { name, value, type, checked } = event.target;
    const updatedForm = { ...this.state.tenantonboardForm };

    if (type === "checkbox") {
      updatedForm[name] = checked;
    } else {
      updatedForm[name] = value;
    }

    this.setState({ tenantonboardForm: updatedForm });
  }

  render() {
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
                    <Link to="/tenant-onboard" style={{textDecoration:"none"}}>
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
      <div className="row clearfix" style={{ width: '82%',margin:"auto"}}>
        <div >
          <form onSubmit={this.onSubmit.bind(this)}>
            <div className="card" style={{paddingTop:"20px"}}>
              <div className="body">
                <div className="row clearfix">
                  <input
                    type="hidden"
                    name="id"
                    id="id"
                    value={this.state.tenantonboardForm.id}
                    className="form-control"
                  />
                  <div className="col-lg-4 col-md-4 col-sm-4 col-xs-8">
                    <div className="form-group">
                     
                      <FormLabel style={{color:"black",marginBottom:"10px"}}>Tenant Name<em style={{ color: "red" }}>*</em></FormLabel>
                      <TextField
                        type="text"
                        name="tenant_name"
                        value={this.state.tenantonboardForm.tenant_name}
                        onChange={this.handleInputChange.bind(this)}
                        variant="outlined"
                        placeholder="Enter Tenant Name"
                        required
                      />
                      {/* Display validation errors if needed */}
                    </div>
                  </div>

                  {/* Additional form fields */}
                  <div className="col-lg-4 col-md-4 col-sm-4 col-xs-8">
                    <div className="form-group">
                    <FormLabel style={{color:"black",marginBottom:"10px"}}>Short Name<em style={{ color: "red" }}>*</em></FormLabel>
                    
                      <TextField
                        type="text"
                        name="tenant_shortname"
                        value={this.state.tenantonboardForm.tenant_shortname}
                        onChange={this.handleInputChange.bind(this)}
                        variant="outlined"
                        placeholder="Enter Short Name"
                        required
                      />
                      {/* Display validation errors if needed */}
                    </div>
                  </div>

                  <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 mb-4">
                    <div className="form-group">
                      <label className="form-label">Is Legal Tenant?</label>
                      <br />
                      <FormControlLabel
                        control={
                          <Switch
                            name="is_legal_tenant"
                            checked={this.state.tenantonboardForm.is_legal_tenant}
                            onChange={this.handleInputChange.bind(this)}
                            color="primary"
                          />
                        }
                        label={this.state.tenantonboardForm.is_legal_tenant ? "Yes" : "No"}
                      />
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-4 col-sm-4 col-xs-8">
                    <div className="form-group">
                    <FormLabel style={{color:"black",marginBottom:"10px"}}>Address1<em style={{ color: "red" }}>*</em></FormLabel>
                    
                      <TextField
                        type="text"
                        name="address1"
                        value={this.state.tenantonboardForm.address1}
                        onChange={this.handleInputChange.bind(this)}
                        variant="outlined"
                        placeholder="Enter Address1"
                        required
                      />
                      {/* Display validation errors if needed */}
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-4 col-sm-4 col-xs-8">
                    <div className="form-group">
                    <FormLabel style={{color:"black",marginBottom:"10px"}}>Address2</FormLabel>
                    
                      <TextField
                        type="text"
                        name="address2"
                        value={this.state.tenantonboardForm.address2}
                        onChange={this.handleInputChange.bind(this)}
                        variant="outlined"
                        placeholder="Enter Address2"
                        required
                      />
                      {/* Display validation errors if needed */}
                    </div>
                  </div>

                  <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 mb-4">
                    <div className="form-group">
                    <FormLabel style={{color:"black",marginBottom:"10px"}}>Type of Tenant<em style={{ color: "red" }}>*</em></FormLabel>
                    
                      
                      <Select
                        name="bank_tenant_ref_id"
                        value={this.state.tenantonboardForm.bank_tenant_ref_id}
                        onChange={this.handleInputChange.bind(this)}
                        variant="outlined"
                        required
                        placeholder="Bank Tenant"
                        disabled={this.state.editdisabled}
                        style={{width:"80%"}}
                      >
                        {this.state.tenantHierarchyData.map((tenant) => (
                          <MenuItem key={tenant.id} value={tenant.id}>
                            {tenant.bank_tenant_ref_id}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-4 col-sm-4 col-xs-8">
                    <div className="form-group">
                    <FormLabel style={{color:"black",marginBottom:"10px"}}>Tenant Code<em style={{ color: "red" }}>*</em></FormLabel>
                    
                      
                      <TextField
                        type="text"
                        name="tenant_code"
                        value={this.state.tenantonboardForm.tenant_code}
                        onChange={this.handleInputChange.bind(this)}
                        variant="outlined"
                        placeholder="Enter Tenant Code"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 mb-4">
                    <div className="form-group">
                    <FormLabel style={{color:"black",marginBottom:"10px"}}>Type of Tenant<em style={{ color: "red" }}>*</em></FormLabel>
                    
                      
                      <Select
                        name="tenant_type_ref_id"
                        value={this.state.tenantonboardForm.tenant_type_ref_id}
                        onChange={this.handleInputChange.bind(this)}
                        variant="outlined"
                        required
                        placeholder="Select Tenant Type"
                        disabled={this.state.editdisabled}
                        style={{width:"80%"}}
                      >
                        {this.state.tenantHierarchyData.map((tenant) => (
                          <MenuItem key={tenant.id} value={tenant.id}>
                            {tenant.tenant_type_name}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 mb-4">
                    <div className="form-group">
                    <FormLabel style={{color:"black",marginBottom:"10px"}}>Tenant Belongs To<em style={{ color: "red" }}>*</em></FormLabel>
                    
                      
                      <Select
                        name="tenant_belongs_to"
                        value={this.state.tenantonboardForm.tenant_belongs_to}
                        onChange={this.handleInputChange.bind(this)}
                        variant="outlined"
                        required
                        placeholder="Select Parent Tenant"
                        disabled={this.state.editdisabled}
                        style={{width:"80%"}}
                      >
                        {this.state.tenantHierarchyData.map((tenant) => (
                          <MenuItem key={tenant.id} value={tenant.id}>
                            {tenant.tenant_belongs_to}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-4 col-xs-8">
                    <div className="form-group">
                    <FormLabel style={{color:"black",marginBottom:"10px"}}>Pin Code<em style={{ color: "red" }}>*</em></FormLabel>
                    
                      
                      <TextField
                        type="text"
                        name="pincode"
                        value={this.state.tenantonboardForm.pincode}
                        onChange={this.handleInputChange.bind(this)}
                        variant="outlined"
                        placeholder="Enter Pin Code"
                        required
                      />
                    </div>
                  </div>

                  <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 mb-4">
                    <div className="form-group">
                    <FormLabel style={{color:"black",marginBottom:"10px"}}>Country<em style={{ color: "red" }}>*</em></FormLabel>
                    
                      
                      <Select
                        name="country_ref_id"
                        value={this.state.tenantonboardForm.country_ref_id}
                        onChange={this.handleInputChange.bind(this)}
                        variant="outlined"
                        required
                        placeholder="Select Country"
                        disabled={this.state.editdisabled}
                        style={{width:"80%"}}
                      >
                        {this.state.tenantHierarchyData.map((tenant) => (
                          <MenuItem key={tenant.id} value={tenant.id}>
                            {tenant.country_ref_id}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                  </div>
                  <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 mb-4">
                  <FormLabel style={{color:"black",marginBottom:"10px"}}>State<em style={{ color: "red" }}>*</em></FormLabel>
                    
                    <div className="form-group">
                    
                      
                      <Select
                        name="state_ref_id"
                        value={this.state.tenantonboardForm.state_ref_id}
                        onChange={this.handleInputChange.bind(this)}
                        variant="outlined"
                        required
                        placeholder="Select State"
                        disabled={this.state.editdisabled}
                        style={{width:"80%"}}
                      >
                        {this.state.tenantHierarchyData.map((tenant) => (
                          <MenuItem key={tenant.id} value={tenant.id}>
                            {tenant.state_ref_id}
                          </MenuItem>
                        ))}
                      </Select>
                    </div>
                  </div>

                  {/* More form fields */}
              
                  <div className="col-lg-4 col-md-4 col-sm-4 col-xs-8">
                  <FormLabel style={{color:"black",marginBottom:"10px"}}>City<em style={{ color: "red" }}>*</em></FormLabel>

                    <div className="form-group">
                    
                      
                    <Select
                      name="city_ref_id"
                      value={this.state.tenantonboardForm.city_ref_id}
                      onChange={this.handleInputChange.bind(this)}
                      variant="outlined"
                      required
                      placeholder="Select City"
                      disabled={this.state.editdisabled}
                      style={{width:"80%"}}
                    >
                      {this.state.tenantHierarchyData.map((tenant) => (
                        <MenuItem key={tenant.id} value={tenant.id}>
                          {tenant.city_ref_id}
                        </MenuItem>
                      ))}
                    </Select>
                      {/* Display validation errors if needed */}
                    </div>
                  </div>

                  <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 mb-4" style={{paddingTop:"10px"}}>
                    <div className="form-group">
                      <label className="form-label">Is Active?</label>
                      <br />
                      <FormControlLabel
                        control={
                          <Switch
                            name="is_active"
                            checked={this.state.tenantonboardForm.is_active}
                            onChange={this.handleInputChange.bind(this)}
                            color="primary"
                          />
                        }
                        label={this.state.tenantonboardForm.is_active ? "Yes" : "No"}
                      />
                    </div>
                  </div>

                  {/* More form fields */}
                </div>
              </div>
            </div>
            <div className="card" style={{paddingBottom:"20px"}}>
              <div className="body" style={{ textAlign: "center" }}>
                <div className="button-demo">
                  <Button
                    className="btn btn-primary mr5"
                    type="submit"
                    disabled={!this.state.submitBtn}
                    
                  >
                    {this.state.BTN_VAL}
                  </Button>
                  <Button
                    onClick={this.onCancelForm.bind(this)}
                    className="btn btn-danger"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div></section>
    );
  }
}

export default Tenant1;
