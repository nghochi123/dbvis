import diagrams from '../../misc/knex';

const addUserToGroup = async (req, res) => {
  if(!req.body || req.method !== 'POST'){
    return res.status(400).send({error: 'Bad request'});
  }
  await diagrams('group_user').insert(req.body);
  const item = await diagrams('group_user').select();
  res.status(200).send(item);
}

export default addUserToGroup;