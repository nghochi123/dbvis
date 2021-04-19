import diagrams from '../../misc/knex';

const updateposition = async (req, res) => {
  if(!req.body || req.method !== 'POST'){
    return res.status(400).send({error: 'Bad request'});
  }
  const updateable = {_left: req.body.x, _top: req.body.y}
  await diagrams('tbl')
  .where('id', '=', req.body.id)
  .update(updateable);
  const item = await diagrams('tbl').select();
  res.status(200).send(item);
}

export default updateposition;