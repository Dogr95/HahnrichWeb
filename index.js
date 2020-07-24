const HahnrichClient = require('./Hahnrich.js');
const shell = process.openStdin();

const Client = new HahnrichClient(6969)
Client.init()

shell.addListener("data", function(d) {
  const data = d.toString().trim().split(' ')
  console.log(Object.keys(Client).includes(data[0]))
  console.log(typeof Client[data[0]])
  if(typeof Client.commands.get(data[0]) !== "undefined") {
    try {
      console.log(Client.commands.get(data[0]).execute(data))
    } catch(e) {
      console.log(e)
    }
  } else if(Object.keys(Client).includes(data[0]) && typeof Client[data[0]].commands.get(data[1]) !== "undefined") {
    args = data.slice(2)
    args.unshift(Client[data[0]].client)
    console.log(Client[data[0]].commands.get(data[1]).execute.apply(null, args))
  } else {
    console.log('ERROR: No command called '+data.join(' ')+' found.')
  }
})
