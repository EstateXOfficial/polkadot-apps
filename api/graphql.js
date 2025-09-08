export default async function handler(req, res) {
  const backend = process.env.SUBQUERY_GRAPHQL_BACKEND;
  if (!backend) {
    return res.status(500).send("Backend not configured");
  }

  const response = await fetch(backend, {
    method: req.method,
    headers: { ...req.headers, host: undefined },
    body: req.method === "GET" ? undefined : JSON.stringify(req.body),
  });

  const text = await response.text();
  res.status(response.status).send(text);
}