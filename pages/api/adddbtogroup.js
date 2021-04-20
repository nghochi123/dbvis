import diagrams from '../../misc/knex';

const addUserToGroup = async (req, res) => {
  if(!req.body || req.method !== 'POST'){
    return res.status(400).send({error: 'Bad request'});
  }
  await diagrams('db').insert(req.body);
  const item = await diagrams('db').select();
  res.status(200).send(item);
}

export default addUserToGroup;