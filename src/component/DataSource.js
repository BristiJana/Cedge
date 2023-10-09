const DataSource = [];

for (let i = 1; i <= 810; i++) {
  DataSource.push({
    id: i,
    tenant_name: `Tenant ${i}`,
    tenant_type: `Type ${i % 5 + 1}`,
    address1: `Address ${i}`,
    pincode: `Pincode ${i}`,
  });
}

export default DataSource;
