const Role = {
  TAX_PAYER: "TAX_PAYER",
  TAX_ACCOUNTANT: "TAX_ACCOUNTANT",
  ADMIN: "ADMIN",
};

const TaxStatus = {
  PENDING: "PENDING",
  OVER_DUE: "OVER_DUE",
  PAID: "PAID",
};

module.exports = {
  Role: Role,
  TaxStatus: TaxStatus,
};
