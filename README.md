Hello everyone

![hello](https://media.giphy.com/media/xT9IgG50Fb7Mi0prBC/giphy.gif)

Today we will start lesson in which we will understand what it is Node.js, Alpaca API.
I don't like boring lessons, I suggest you go straight into battle.

Let's set ourselves the following tasks:
- Install NodeJS and NPM
- Create your first script
- How to get a string from the terminal
- How to work with dates
- Install Alpaca API
- Get data from the Alpaca API based on the line we entered in the terminal, namely, find data on Stock

Simply put, we will make a very easy Stock Market Checker with you, at the same time we can earn money if we find a correlation between the current price and previous prices.

## Install NodeJS

First of all, let's install NodeJS, all the information that we need to install is here:
https://nodejs.org/en/

Nothing complicated, click the big green button, download the installer and that's it.
Was it difficult? Great, you are already halfway there, because with the installation of NodeJS, NPM comes as a gift.

If you have any questions about the installation or something went wrong, just tweet me https://twitter.com/gaserdgg or email me gaserd123@gmail.com

To understand that everything works, let's open the terminal and run the command:

```
node -v
```

In my case, it is shown that this version of the `v12.18.1`

Oh, you don't know what a terminal is? This is how you will communicate with the computer, but without the help of a special UI that you see every day.

I will ask you if you have never used the terminal, Google what it is, take into account your operating system.

Let's check again whether we have NPM with you, have you already guessed how?
```
npm -v
```

Again, if something doesn't work, don't be afraid to write to me.

## Create your first script

Now let's move on to creating your first script, here we will also stop a little, because you will need to choose a code editor, I will not go long and tell you, just download VSCode and do not suffer.

https://code.visualstudio.com/

Let's create a workspace where we can create. Go to VSCode and create a folder, call it `StockScreener`

Now let's open the terminal, for this purpose in VSCode there is a separate line in the menu, which is called Terminal -> New Terminal , it will open the terminal with the path to your folder. Conveniently.

Let's initialize our NPM, if you haven't read what NPM is yet, I'll tell you, especially for those who have played MMORPG World of Warcraft, NPM is Addons for your code that other developers write, so you don't have to write anything with your own hands, by the way, you can help them write these Addons.

Let's enter the command
```
npm init
```

At this stage, you can not fill in anything yet, NPM will fill in everything itself, it is not important for us now, the main thing is not to forget to enter YES.

Great! Now let's create our first script. Create a file with the name `main.js`

Maybe it's time to write something and see how it works?
Let's write something standard, but with a little tuning.

```
console.log(`Hello, I'm StockScreneer`)
```

Now open the terminal and run the command
```
node main.js
```

Beauty? High? Cool!
Now we would like the terminal to send something to us in the same way as NPM, we answered something to it, and our program remembered it.

![wow](https://media.giphy.com/media/blqEBWV6iFjGM/giphy.gif)

## How to get a string from the terminal

For this purpose, there is a `readline` in NodeJS, which means something to you right now, but let me show you how it works.

Let's write this code. You can delete the old one.

```
const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Input STOCK: ', (stock) => {
    console.log(`You choose stock: ${stock}`)
    rl.close()
});
```

At this stage, you can experiment a little, for example, try entering other questions and output a different answer. Try it, programming is a constant experiment.

## How to work with dates

Next we will work with dates and with the Alpaca API and try to find out if the exchange is working now.

Let's start with something new and add an NPM package that will allow us to work with dates in a more convenient way.

Open the terminal and write:
```
npm install date-fns
```

What is the date-fns? Yes read directly on the package page - https://date-fns.org/

Now let's connect it at the beginning of our file, who guessed how, try it yourself, and then look at the following code.

```
const dateFns = require('date-fns')
```

Great, let's now try to output today's date.

```
console.log(new Date())
```

Now we should only have this code with you:
```
const readline = require('readline')
const dateFns = require('date-fns')

console.log(new Date())
```

And run it, if you forgot how, just enter the command in the terminal:
```
node main.js
```

If you have any questions or something went wrong, just tweet me @gaserdgg or email me gaserd123@gmail.com

I see something like this in my terminal:
```
2020-08-04T08:33:28.769Z
```

It's not the most convenient form to read the date, is it? Let's come up with a format for the date.
Let it be `yyyy-MM-dd HH:mm:ss`

So we will write:
```
const format = `yyyy-MM-dd HH:mm:ss` 
const today = new Date()
```
And we'll also make a variable for today's date.
Now let's do a little trick, print our date in the format we need.
```
console.log(dateFns.format(today, format))
```

Now run your script, how about it? Cool!

## Install Alpaca API
Ready for something more complex? I believe in you.
It's time for us to get busy and check whether the exchange is working. In my examples, I will use AlpacaAPI - a special API for working with the stock market and trading algorithms.

To start, go to https://alpaca.markets/ and sign up, we only need to generate a key for your work right now.

Go to the Paper Trading API and you will see a button where you can generate a key for yourself.
Now add these keys to our code, we will need them.

```
const apiKeyId = 'PUT API KEY HERE'
const secretKey = 'PUT SECRET KEY HERE'
```

Just don't forget to insert your keys here.

Now let's install the package for the Alpaca API
```
npm install @alpacahq/alpaca-trade-api
```

And as always, we'll add it to our code.
```
const Alpaca = require('@alpacahq/alpaca-trade-api')

const alpaca = new Alpaca({
    keyId: apiKeyId,
    secretKey: secretKey,
    paper: true,
    usePolygon: false
})
```

If you are at this moment, something is unclear or you have something that does not work, just tweet me https://twitter.com/gaserdgg or email me gaserd123@gmail.com

Let's now try to get the state of the exchange, find out whether it works now or not.

```
alpaca
.getClock()
.then((clock) => {
    console.log(`The market is ${clock.is_open ? 'open.' : 'closed.'}`)
})
```

And try to execute the command, well? In my time zone, the exchange is not working yet, so I get this response:
```
2020-08-04 11:55:39
The market is closed.
```

But we would also like to know when the exchange is working, so that we know at what point it is time to start trading.
```
const date = dateFns.format(today, format)
alpaca.getCalendar({
    start: date,
    end: date
}).then((calendars) => {
    console.log(calendars)
})
```

Let's run our script and get something like this answer:
```
[
  {
    date: '2020-08-04',
    open: '09:30',
    close: '16:00',
    session_open: '0700',
    session_close: '1900'
  }
]
The market is closed.
```

## Get data from the Alpaca API based on the line we entered in the terminal, namely, find data on Stock

To start, install another package:

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

Actually, this is all, this is a very light version of Stock Screneer, then you can dive more and more into the financial world and start processing the received data, as well as do not hesitate to get data from the Alpaca API in real time.

![bye](https://media.giphy.com/media/3orieStB8OH7lanfGg/giphy.gif)