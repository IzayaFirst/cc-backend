const DB = require('../model')
const withdrawAction = 2
const depositAction = 1

function deposit({ amount, price, wallet_id, currency_id }) {
    return DB.Transaction.create({
        amount, price, wallet_id, currency_id, action: depositAction
    })
}

function withdraw({ amount, price, wallet_id, currency_id }) {
    return DB.Transaction.create({
        amount, price, wallet_id, currency_id, action: withdrawAction
    })
}



function getBalanceByCurrency({ currency_id, wallet_id }) {
    return DB.sequelize.query('select (select if(sum(price * amount) > 0 ,sum(price * amount), 0 ) from transactions where wallet_id = :w and currency_id = :c and action = :a) - (select if(sum(price * amount) > 0, sum(price * amount), 0) from transactions where wallet_id = :w and currency_id = :c and action = :aa) as sum' , {
        replacements: { w: wallet_id, c: currency_id, a: depositAction, aa: withdrawAction  },
    })
}

function getBalanceGroupByCurrency({ currency_id }) {
    return DB.sequelize.query('select (select if(sum(price * amount) > 0 ,sum(price * amount), 0 ) from transactions where currency_id = :c and action = :a) - (select if(sum(price * amount) > 0, sum(price * amount), 0) from transactions where currency_id = :c and action = :aa) as balance' , {
        replacements: { c: currency_id, a: depositAction, aa: withdrawAction  },
    })
}


module.exports = {
    deposit,
    withdraw,
    getBalanceByCurrency,
    getBalanceGroupByCurrency,
}