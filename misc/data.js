const tables = [
  {
    name: "cats",
    color: 25,
    fields: [
      { field: "cat1", type: "varchar", key: "Foreign Key", connectedTo: 'piss-psiscrap'},
      { field: "cat2", type: "varchar", key: "-" , connectedTo: ''},
    ],
    order: 1,
    top: 20,
    left: 80,
  },
  {
    name: "dogs",
    color: 50,
    fields: [
      { field: "dog1", type: "int", key: "-" , connectedTo: ''},
      { field: "dog2", type: "int", key: "-", connectedTo: '' },
    ],
    order: 2,
    top: 120,
    left: 180,
  },
  {
    name: "poopy",
    color: 75,
    fields: [
      { field: "shit", type: "int", key: "-", connectedTo: '' },
      { field: "shit2", type: "int", key: "-", connectedTo: '' },
    ],
    order: 3,
    top: 220,
    left: 280,
  },
  {
    name: "piss",
    color: 100,
    fields: [
      { field: "psiscrap", type: "int", key: "Primary Key", connectedTo: 'cats-cat1' },
      { field: "test2", type: "int", key: "-", connectedTo: '' },
    ],
    order: 4,
    top: 320,
    left: 380,
  },
];

export default tables;
