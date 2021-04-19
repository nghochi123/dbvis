import diagrams from "../../misc/knex";

const addtoken = async (req, res) => {
  if (!req.body || req.method !== "POST") {
    return res.status(400).send({ error: "Bad request" });
  }
  await diagrams("user_tokens").insert(req.body);
  await diagrams("user_tokens")
    .where(
      "expiry_date",
      "<",
      new Date(new Date().getTime() + 8 * 60 * 60 * 1000)
        .toISOString()
        .slice(0, 19)
        .replace("T", " ")
    )
    .del();
  const send = {
    user_id: req.body.user_id,
    token: req.body.token
  }
  res.status(200).send(send);
};

export default addtoken;
