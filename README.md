# API COVID-19 Indonesia

Menyajikan data covid-19 yang berasal dari website https://covid19.go.id. API ini mengambil data dengan teknik web scarping lalu memasukan ke database MongoDB. Data diambil setiap 5 menit dan dicek dengan data di database. Apabila berbeda maka data akan ditambahkan ke database <br>

><a href="https://apicovid19indonesia.vercel.app/">JSON API</a><br>
>[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/git?s=https%3A%2F%2Fgithub.com%2FReynadi531%2Fapi-covid19-indonesia)
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
    * Query yang bisa digunakan:
      * view = all (untuk semua koleksi data) dan latest (untuk koleksi terbaru)
        >contoh penggunaan:
          >* https://apicovid19indonesia.vercel.app/api/indonesia?view=latest
          >* https://apicovid19indonesia.vercel.app/api/indonesia?view=all

  >Note : waktu yang digunakan adalah UTC
---
## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

**[MIT license](http://opensource.org/licenses/mit-license.php)**

