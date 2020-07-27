# API COVID-19 Indonesia

Menyajikan data covid-19 yang berasal dari website https://covid19.go.id. API ini mengambil data dengan teknik web scarping lalu memasukan ke database MongoDB. Data diambil setiap 5 menit dan dicek dengan data di database. Apabila berbeda maka data akan ditambahkan ke database <br>

><a href="https://apicovid19indonesia.herokuapp.com/">JSON API</a>
---
## Endpoint:
* /api/indonesia
  - Contoh response:
      ```json
      {
        "positif": 98778,
        "sembuh": 56655,
        "meninggal": 4781,
        "lastUpdate": "2020-07-26T09:00:42.208Z"
      }
      ```
  >Note : waktu yang digunakan adalah UTC
---
## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

**[MIT license](http://opensource.org/licenses/mit-license.php)**

