import diagrams from '../../misc/knex';

const addfield = async (req, res) => {
  if(!req.body || req.method !== 'POST'){
    return res.status(400).send({error: 'Bad request'});
  }
  await diagrams('field_data').where(req.body).del();
  const item = await diagrams('field_data').select();
  res.status(200).send(item);
}

export default addfield;