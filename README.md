# travel-app

port: 8000
node version 18.3.0
npm i
npm run dev / npm run dev -- --host

# BUG / WEAKNESSES ?

1. api LOGIN (tidak membawa role)
   - untuk mengambil role mengunakan api GET USER BY ID
2. get data langsung terdapat pagination (tidak bisa menggunakan filter by name dll), karena hanya akan memfilter pada data yang dibawa saja misal (berada di page=1), dan lakukan filter, maka kemungkinan data yang ada di page selain 1 tidak muncul
