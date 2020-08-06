const readline = require('readline')
const dateFns = require('date-fns')
const format = `yyyy-MM-dd HH:mm:ss`
const today = new Date()
const apiKeyId = 'PUT YOU API KEY'
const secretKey = 'PUT YOU SECRET KEY'
const { formatToTimeZone } = require('date-fns-timezone')
const Alpaca = require('@alpacahq/alpaca-trade-api')
const alpaca = new Alpaca({
    keyId: apiKeyId,
    secretKey: secretKey,
    paper: true,
    usePolygon: false
})
const date = dateFns.format(today, format)

const timeZone = 'America/Toronto'

const edtFormat = 'YYYY-MM-DD HH:mm:ss.SSS [GMT]Z (z)'
const edtDate = formatToTimeZone(new Date(), edtFormat, { timeZone })

console.log(edtDate)

alpaca
.getClock()
.then((clock) => {
    console.log(`The market is ${clock.is_open ? 'open.' : 'closed.'}`)
})
.then(() => alpaca.getCalendar({
    start: date,
    end: date
}))
.then((calendars) => {
    console.log(`The market opened at ${calendars[0].open} and closed at ${calendars[0].close} on ${date}.`)
})

/*
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Input STOCK: ', (stock) => {
        console.log(`You choose stock: ${stock}`)
        rl.close()
});
*/