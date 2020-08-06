const readline = require('readline')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Input STOCK: ', (stock) => {
    console.log(`You choose stock: ${stock}`)
    rl.close()
});