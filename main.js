const readline = require('readline')
const dateFns = require('date-fns')
const { formatToTimeZone } = require('date-fns-timezone')
const apiKeyId = 'PUT YOUR API KEY'
const secretKey = 'PUT YOUR SECRET KEY'
const Alpaca = require('@alpacahq/alpaca-trade-api')
const { exit } = require('process')
const format = 'yyyy-MM-dd'
const alpaca = new Alpaca({
    keyId: apiKeyId,
    secretKey: secretKey,
    paper: true,
    usePolygon: false
})
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
const date = dateFns.format(new Date(), format)
const timeZone = 'America/Toronto'

const etcFormat = 'YYYY-MM-DD HH:mm:ss.SSS [GMT]Z (z)'
const etcDate = formatToTimeZone(new Date(), etcFormat, { timeZone })

function inputStock() {
    rl.question('Input STOCK: ', (stock) => {
        let today = new Date()
        const to = dateFns.format(today, format)
        today.setMonth(today.getMonth() - 3)
        const from = dateFns.format(today, format)

        alpaca
            .getAggregates(
                stock,
                'day',
                from,
                to
            )
            .then(data => {
                const results = data.results.map(res => res.startEpochTime = dateFns.format(res.startEpochTime, format))
                console.table(data.results)
                rl.close()
                exit()
            }).catch((e) => {
                console.log(e)
                exit()
            })
    });
}

function main() {
    alpaca.getClock().then((clock) => {
        console.log(`###############################`)
        console.log(`The market is ${clock.is_open ? 'open.' : 'closed.'}`)
        alpaca.getCalendar({
            start: date,
            end: date
        }).then((calendars) => {
            console.log(`The market opened at ${calendars[0].open} and closed at ${calendars[0].close} on ${date}.`)
            console.log(`NEW YORK TIME - ${etcDate}`)
            console.log(`###############################`)
        }).then(() => {
            if (clock.is_open) {
                inputStock()
            } else {
                exit()
            }
        })
    })
}

main()


