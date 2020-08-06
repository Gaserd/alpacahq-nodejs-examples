Are you ready for a new challenge?

![challenge](https://media.giphy.com/media/AWv3UAFkgz39u/giphy.gif)

Great, because today we will work with dates and with the Alpaca API and try to find out if the exchange is working now.

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

Oh Yes, don't forget to comment on our code, which relates to the question about `Input STOCK`. How is this done? Just wrap the code in /* CODE */

Here is an example:

```
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

Great, let's now edit our code a little and put it out in full.

```
const readline = require('readline')
const dateFns = require('date-fns')
const format = `yyyy-MM-dd HH:mm:ss`
const today = new Date()
const apiKeyId = 'PUT YOU API KEY'
const secretKey = 'PUT YOU SECRET KEY'
const Alpaca = require('@alpacahq/alpaca-trade-api')
const alpaca = new Alpaca({
    keyId: apiKeyId,
    secretKey: secretKey,
    paper: true,
    usePolygon: false
})
const date = dateFns.format(today, format)

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
```

Great! You have managed and now I have a small task for you.

Most likely, not everyone lives in NY and just like me have a time offset relative to the NY exchange, so it would be nice to transfer your time to NY time.

**Task:**
learn how to translate your current time to NY time and output it.
**Hint:**
you will need to look in the `date-fns-timezone`package
You can send your code to me anywhere, I will check each one and give you my feedback.

![damn](https://media.giphy.com/media/t9ctG5MZhyyU8/giphy.gif)

Thank you for reading my little episodes! In the next lesson, we will start getting data for the campaign we set.
