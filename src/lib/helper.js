import fs from 'fs'

function debug(message, data) {
  // show message and data on console
  console.log(message, data)
  // save message and data to a file
  fs.writeFile('./logs/debug.logs', `${message}\n${JSON.stringify(data, null, 2)}`, (err) => {
    if (err) {
      console.error('Error saving to file:', err)
    } else {
      console.log('Message and data saved to file.')
    }
  })
}

export { debug }
