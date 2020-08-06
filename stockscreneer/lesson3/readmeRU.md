Ну что-же вот он третий завершающий урок, в котором мы с вами сможем получать информацию по нашему Stock Market и выводить ее к себе в консоль.

В предыдщих уроках, мы научились работать с датой, выводить ее, получать работает ли биржа и все прочее, а домашним заданием было немного доделать программу, чтобы она показывала нам NY время относительно нашего.

Собственно, вот ответ. Для начала установим еще один пакетик:
```
npm install date-fns-timezone
```

И давайте сразу добавим нужную нам функцию:
```
const { formatToTimeZone } = require('date-fns-timezone')
```

Теперь нам надо понять, а в какой части вообще у нас лежит NY, так вон он лежит во временной зоне America/Toronto, так и напишем:
```
const timeZone = 'America/Toronto'

const edtFormat = 'YYYY-MM-DD HH:mm:ss.SSS [GMT]Z (z)'
const edtDate = formatToTimeZone(new Date(), edtFormat, { timeZone })

console.log(edtDate)
```

Ну и как всегда, запускайте свой скрипт, желательно перед этим закомментируйте старые строки, которые нам сейчас пока что не нужны.

```
2020-08-05 05:28:02.261 GMT-04:00 (EDT)
```

Отлично, теперь мы имеем время с учетом нашего времени. 
Давайте теперь выведем время в которое у нас открывается биржа и время которое относительно нашего сейчас в NY.

Ну что, вышло? Если вдруг что-то не получилось или вам что-то не понятно твитните меня https://twitter.com/gaserd или напишите мне на почту gaserd123@gmail.com

А помните наш код который мы закомментировали, чтобы у нас выводился Stock который мы написали? Давайте вернем его к жизни, и добавим кое чего.

Но перед этим напишем код, который будет получать данные по акциям Apple.
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

Надеюсь что у вас вылезла ошибка, ведь так? Это ошибка из-за того, какой формат мы используем для форматирования даты, замените его на `yyyy-MM-dd`

Теперь запусите вашу программу еще раз. Возможно вы заметили что заместо `console.log` мы использовали `console.table` это связано с более удобным восприятием большого кол-ва данных, котоыре мы получаем.

Интересный момент, вы поняли зачем мы делаем `setMonth` ? Все для того, чтобы получить данные за 3 месяца, в каждом месяце примерно по 21 торговому дню, поэтому мы устанавливаем нашу дату на 3 месяца назад.

Ну что, сможете теперь привязать вводимый вами Stock с получению данных и проверять работает ли биржа?

Я сразу напишу готовый код, но очень хочу чтобы вы попробовали сами.

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

Ой-ей, кажется это слишком много кода за раз. Но давайте попробуем разобраться.

Я обернул наш предыдщий код в функции, чтобы было удобнее, теперь у нас есть главная функция `main` и функция `inputStock` которая вызывает запрос на ввод имени Stock и потом выводит данные, по хорошему эту функцию надо бы еще разбить на несколько, но давайте пока без этого.

функция `main` является точкой входа в исполнение нашего скрипта, она проверяет работает ли сейчас биржа и если работает, то показывает исторические данные, если не работает, то говорит нам об этом.

Вы могли заметить еще одну вещь, это `exit()` это функция, которая выполняет выход из скрипта и перестает его выполнять. 
```
const { exit } = require('process')
```

Собственно, на этом и все, это очень легкая версия StockScreneer, дальше вы можете погрузится все больше в финансовый мир и начать обрабатывать полученные данные, а так же не стесняться получать данные из Alpaca API в режиме реального времени.

