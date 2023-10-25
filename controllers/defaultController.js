
const home = function (req, res) {
    res.status(200);
    res.send(`Express API running`);
};

const health = (req, res) => {
    res.status(200);
    res.json({ Status: 'Up and running' });
}

module.exports = {
    home,
    health,
};