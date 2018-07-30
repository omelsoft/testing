const folhaPonto = require('../../../services/folha_ponto');

exports.folhaPonto = async (req, res, next) => {

    let d = await folhaPonto.folhaPonto();

    res.status(200).send('gerada folha ponto');
}
