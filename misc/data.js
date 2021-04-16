const tables = [
    {
      name: 'cats',
      color: 25,
      fields: [
        {field: 'cat1', type: 'varchar', key: 'Foreign Key'},
        {field: 'cat2', type: 'varchar', key: '-'}
      ]
    },
    {
      name: 'dogs',
      color: 50,
      fields: [
        {field: 'dog1', type: 'int', key: '-'},
        {field: 'dog2', type: 'int', key: '-'}
      ]
    },
    {
      name: 'poopy',
      color: 75,
      fields: [
        {field: 'shit', type: 'int', key: '-'},
        {field: 'shit2', type: 'int', key: '-'}
      ]
    },
    {
      name: 'piss',
      color: 100,
      fields: [
        {field: 'psiscrap', type: 'int', key: 'Primary Key'},
        {field: 'test2', type: 'int', key: '-'}
      ]
    }
];

export default tables;