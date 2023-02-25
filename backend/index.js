const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const db = new sqlite3.Database('weather_data.db');

// return maximum and minimum temperature and precipitation for a selected city on a selected date
app.get('/weather/:city/:date', (req, res) => {
  const city = req.params.city;
  const date = req.params.date;
  const dayMonth = date.slice(5); // extract day and month from date string

  db.all('SELECT MIN(minimumtemperature) AS min_temperature, MAX(maximumtemperature) AS max_temperature, precipitation AS precipitation, substr(datedata, 1, 4) AS year FROM weather WHERE city = ? AND strftime("%m-%d", datedata) = ? GROUP BY year', [city, dayMonth], (err, rows) => {
    if (err) {
      console.log(err);
      res.sendStatus(500);
    } else {
      res.json(rows);
	  console.log(req)
    }
  });
});

// start server
app.listen(4000, () => console.log('Server started on port 4000'));
