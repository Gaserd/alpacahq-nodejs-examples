Well, here it is the third final lesson, in which you and I will be able to get information on our Stock Market and output it to your console.

In the previous lessons, we learned how to work with the date, output it, get whether the exchange is working, and everything else, and the homework was to finish the program a little so that it showed US NY time relative to ours.

Actually, here is the answer. To start, install another package:

```
npm install date-fns-timezone
```

And let's add the function we need right away:
```
const { formatToTimeZone } = require('date-fns-timezone')
```

Now we need to understand, and in what part at all we have NY, so there it lies in the time zone America/Toronto, so we will write:

```
const timeZone = 'America/Toronto'

const edtFormat = 'YYYY-MM-DD HH:mm:ss.SSS [GMT]Z (z)'
const edtDate = formatToTimeZone(new Date(), edtFormat, { timeZone })

console.log(edtDate)
```

Well, as always, run your script, preferably before you comment on the old lines that we do not need yet.

```
2020-08-05 05:28:02.261 GMT-04:00 (EDT)
```

Great, now we have time with our time in mind. 
Let's now output the time at which we open the exchange and the time that is relative to our current time in NY.

Well, did it work out? If suddenly something didn't work out or you don't understand something tweet me https://twitter.com/gaserd or email me gaserd123@gmail.com

Do you remember our code that we commented out so that we could output the code that we wrote? Let's bring it back to life, and add something.

But before that, we will write a code that will get data on Apple shares.

```
    const to = dateFns.format(today, format)
    today.setMonth(today.getMonth() - 3)
    const from = dateFns.format(today, format)
    const stock = 'AAPL' 

    alpaca
        .getAggregates(
            stock,
            'day',
            from,
            to
        )
        .then(data => {
            console.table(data.results)
        }).catch((e) => {
            console.log(e)
        })
```

I hope you made a mistake, right? This is an error due to the format we use for formatting the date, replace it with `yyyy-MM-dd`

Now run your program again. You may have noticed that instead of `console. log` we used `console.table` this is due to a more convenient perception of the large amount of data that we receive.

Interesting point, do you understand why we do `setMonth` ? All in order to get data for 3 months, each month has about 21 trading days, so we set our date to 3 months ago.

Well, can you now link the input code with the data received and check whether the exchange is working?

I'll write the ready-made code right away, but I really want you to try it yourself.

```
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
```

Oops, it seems like too much code at a time. But let's try to understand.

I wrapped our previous code in functions to make it more convenient, now we have the main function `main` and the `inputStock` function that calls a request to enter the name of the Stock and then outputs data. this function should still be divided into several, but let's not do it yet.

the `main` function is the entry point to the execution of our script, it checks whether the exchange is working now and if it is working, it shows historical data, if it is not working, it tells us about it.

You may have noticed another thing, it's `exit()` this is a function that exits the script and stops executing it.

```
const { exit } = require('process')
```

Actually, this is all, this is a very light version of StockScreneer, then you can dive more and more into the financial world and start processing the received data, as well as do not hesitate to get data from the Alpaca API in real time.