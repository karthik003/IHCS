export const apIvoiceReconciation = {
  pdf: "pdfurl.pdf",

  invoiceDetails: [
    {
      id: "1",
      name: "Vendor",
      value: "Opal",
    },
    {
      id: "2",
      name: "Account#",
      value: "2507803401",
    },
    {
      id: "3",
      name: "Invoice#",
      value: "904387573",
    },
    {
      id: "4",
      name: "Invoice#",
      value: "904387573",
    },
    {
      id: "5",
      name: "Invoice#",
      value: "904387573",
    },
    {
      id: "6",
      name: "Invoice#",
      value: "904387573",
    },
    {
      id: "7",
      name: "Invoice#",
      value: "904387573",
    },

    // All the remaining details will follow same pattern
  ],

  listOfItems: {
    headers: [
      {
        id: "1",
        name: "Number of Item",
        dataRef: "numberOfItem",
        type: "number",
        sorting: true,
        searching: true,
      },
      {
        id: "2",
        name: "Material",
        dataRef: "material",
        type: "number",
        sorting: true,
        searching: true,
      },
      // All of the remaining headers will follow same pattern
      {
        id: "12",
        name: "View",
        dataRef: "view",
        type: "icon",
        sorting: false,
        searching: false,
      },
    ],
    rows: [
      {
        id: "1",
        row: {
          numberOfItem: {
            value: 30,
            clickable: false,
            isEditable: true,
          },
          material: {
            value: 30866836,
            clickable: false,
            isEditable: true,
          },
          view: {
            clickable: false,
            isEditable: false,
            value: [
              {
                name: "PO#",
                value: "2018289",
                expectedValue: "4480",
                differenceValue: "10",
                verified: true,
              },
              {
                name: "Goods Receipted",
                value: "Fully goods receipted – no invoice yet",
                expectedValue: "4480",
                differenceValue: "10",
                verified: true,
              },

              // All the following data will follow the same pattern
            ],
          },
        },
      },
      {
        id: "2",
        row: {
          numberOfItem: {
            value: 10,
            clickable: false,
            isEditable: true,
          },
          material: {
            value: 30866836,
            clickable: false,
            isEditable: true,
          },
          view: {
            clickable: false,
            isEditable: false,
            value: [
              {
                name: "PO#",
                value: "2018289",
                expectedValue: "4480",
                differenceValue: "10",
                verified: true,
              },
              {
                name: "Goods Receipted",
                value: "Fully goods receipted – no invoice yet",
                expectedValue: "4480",
                differenceValue: "10",
                verified: true,
              },
            ],
          },
        },
      },

      // All the following rows wil follow same pattern
    ],
  },
};
