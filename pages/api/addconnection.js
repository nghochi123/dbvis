import diagrams from '../../misc/knex';

const addConnection = async (req, res) => {
  if(!req.body || req.method !== 'POST'){
    return res.status(400).send({error: 'Bad request'});
  }
  await diagrams('field_connection').insert(req.body);
  const item = await diagrams('field_connection').select();
  res.status(200).send(item);
}

export default addConnection;