import diagrams from '../../misc/knex';

const deletetable = async (req, res) => {
  if(!req.body || req.method !== 'POST'){
    return res.status(400).send({error: 'Bad request'});
  }
  await diagrams('tbl').where(req.body).del();
  const item = await diagrams('tbl').select();
  res.status(200).send(item);
}

export default deletetable;