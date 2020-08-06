Hello everyone

Today we will start a small series of lessons in which we will understand what it is Node.js.
I don't like boring lessons, I suggest you go straight into battle.

Let's set ourselves the following tasks:
- install NodeJS and NPM
- create your first script
- learn how to get a string from the terminal
- learn how to work with dates
- get data from the Alpaca API based on the line we entered in the terminal, namely, find data on Stock

Simply put, we will make a very easy Stock Market Checker with you, at the same time we can earn money if we find a correlation between the current price and previous prices.


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

Now let's move on to creating your first script, here we will also stop a little, because you will need to choose a code editor, I will not go long and tell you, just download VSCode and do not suffer.

https://code.visualstudio.com/

Downloaded it? So we go further.

Open your code editor, since I work with VSCode, all screenshots will be from it.
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

It's not clear yet is it? Okay, let's get this straight.

Our first line
```
const readline = require('readline')
```

Here we declared a variable, said she was now going to be our reader of the lines of badass.

The following
```
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
```
We told our program that we have some interface for processing the string that we will write in the terminal.

And after
```
rl.question('Input STOCK: ', (stock) => {
    console.log(`You choose stock: ${stock}`)
    rl.close()
});
```
We ask a question to our terminal and want to get an answer, and when we get it, we close our question and output the answer.

It seems nothing complicated, but while you are most likely scared by the lack of understanding of all sorts of `const`, `interface`, `require` and other things, I honestly want to omit these points, I want you to enjoy the moment when the program works and it knows how to do something.

At this stage, you can experiment a little, for example, try entering other questions and output a different answer. Try it, programming is a constant experiment.

Have you played enough? Going further?

And then we will go a little later, I want you to play with this code and try different pribludy for it.

The next block will be soon and we will work with the dates in it and will output whether our exchange is working today and how long we still have to wait before opening.

If you want to read about development in trading, betting or other gambling things, then subscribe to my blog, it is listed in the BIO. 

Good luck and have fun!