import diagrams from '../../misc/knex';

const addgroup = async (req, res) => {
  if(!req.body || req.method !== 'POST'){
    return res.status(400).send({error: 'Bad request'});
  }
  await diagrams('grp').insert(req.body);
  const item = await diagrams('grp').select();
  res.status(200).send(item);
}

export default addgroup;