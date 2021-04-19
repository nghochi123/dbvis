import diagrams from '../../misc/knex';

const adduser = async (req, res) => {
  if(!req.body || req.method !== 'POST'){
    return res.status(400).send({error: 'Bad request'});
  }
  await diagrams('users').insert(req.body);
  const item = await diagrams('users').select();
  res.status(200).send(item);
}

export default adduser;