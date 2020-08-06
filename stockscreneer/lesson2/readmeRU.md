Ну что, готовы к новому испытанию?

![challenge](https://media.giphy.com/media/AWv3UAFkgz39u/giphy.gif)

Отлично, ведь сегодня мы с вами поработаем с датами и с Alpaca API и попробуем узнать, работает ли сейчас биржа.

Давайте начнем с кое-чего новенького, добавим NPM пакет, который позволит нам работать с датами в более удобном виде.

Откройте терминал и напишите:
```
npm install date-fns
```

Что такое date-fns? да почитайте прямо на страничке пакета - https://date-fns.org/

Теперь подключим его в начале нашего файлика, кто догадался как, попробуйте сами, а потом посмотрите следующий код.

```
const dateFns = require('date-fns')
```

Отлично, давайте теперь попробуем вывести сегодняшнюю дату. 

```
console.log(new Date())
```

Ах да, не забудьте закомментировать наш код, который относится к вопросу про `Input STOCK`. Как это делается? Просто оберните код в /* CODE */

Вот пример:
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

Теперь у нас должен остаться с вами только вот такой код:

```
const readline = require('readline')
const dateFns = require('date-fns')

console.log(new Date())
```

И запустите его, если забыли как, то просто введите команду в терминале:
```
node main.js
```

Если у вас возникли вопросы или что-то пошло не так, просто твитните мне https://twitter.com/gaserdgg или напишите на почту gaserd123@gmail.com

Я у себя в терминале вижу что-то вот такое:
```
2020-08-04T08:33:28.769Z
```

Не самая удобная форма для прочтения даты ведь так? Давайте придумаем формат для даты.
Пусть это будет `yyyy-MM-dd HH:mm:ss` 

Так и напишем:
```
const format = `yyyy-MM-dd HH:mm:ss` 
const today = new Date()
```

И еще сделаем переменную для сегодняшней даты.

Теперь давайте проведем небольшой трюк, выведем нашу дату в нужном нам формате.
```
console.log(dateFns.format(today, format))
```

А теперь запустите свой скрипт, ну как? Круто!

Готовы к чему-то более сложному? Я верю в вас. 
Пора бы нам заняться делом уже и проверить работает ли биржа. В своих примерах я буду использовать AlpacaAPI - это специальное API для работы со stock market и трейдинговых алгоритмов.

Для начала сходите на https://alpaca.markets/ и зарегистрируйтесь, нам сейчас понадобитсья только сгенерировать ключ для вашей работы.

Перейдите в Paper Trading API и вы увидите там кнопку в которой можно сгенерировать себе ключ.
Теперь добавим эти ключи к нам в код, они нам понадобятся.

```
const apiKeyId = 'PUT API KEY HERE'
const secretKey = 'PUT SECRET KEY HERE'
```

Главное не забудьте вставить свои ключи сюда.

Теперь давайте установим пакет для Alpaca API 
```
npm install @alpacahq/alpaca-trade-api
```

И как всегда, добавим его в наш код.
```
const Alpaca = require('@alpacahq/alpaca-trade-api')

const alpaca = new Alpaca({
    keyId: apiKeyId,
    secretKey: secretKey,
    paper: true,
    usePolygon: false
})
```

Если вам на данном моменте, что-то не понятно или у вас что-то не работает, просто твитните мне @gaserdgg или напишите на почту gaserd123@gmail.com

Давайте теперь попробуем получить состояние биржи, узнаем работает она сейчас или нет.

```
alpaca
.getClock()
.then((clock) => {
    console.log(`The market is ${clock.is_open ? 'open.' : 'closed.'}`)
})
```

И попробуйте выполнить команду, ну как? В моей зоне времени, биржа еще не работает, поэтому я получаю вот такой ответ:

```
2020-08-04 11:55:39
The market is closed.
```

Но нам бы еще узнать, когда биржа работает, чтобы понимать в какой момент нам пора начинать торговать.
```
const date = dateFns.format(today, format)
alpaca.getCalendar({
    start: date,
    end: date
}).then((calendars) => {
    console.log(calendars)
})
```

Давайте выполним наш скрипт и получим примерно вот такой ответ:
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

Отлично, давайте теперь немного отредактируем наш код и выложим его полностью.

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

Отлично! Вы справились и теперь у меня для вас есть небольшой задание.

Скорее всего, не все живут в NY и так же как и я имеют временное смещение относительно NY биржи, поэтому было бы неплохо переводить свое время в NY время.

**Задание:**
научиться переводить ваше текущее время в NY время и выводить его.
**Подсказка:**
надо будет посмотреть в пакет `date-fns-timezone`
Свой код можете присылать мне куда угодно, я каждый проверю и дам свой фидбэк.

![damn](https://media.giphy.com/media/t9ctG5MZhyyU8/giphy.gif)

Спасибо, что читаете мои маленькие эпизодики! В следующем уроке, начнем доставать данные по заданной нами акции.



