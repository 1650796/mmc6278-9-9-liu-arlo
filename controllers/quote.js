


async function getApi(req, res) {
    try {
        const apiurl ="https://zenquotes.io/api/quotes/"
        const {q, a, h} = req.body
        const res = await fetch(apiurl);
        const data = await res.json({q, a, h});
        console.log(data);

    } catch (err) {
        res.status(500).send(err.message)
    }
  
}

module.exports = { getApi };