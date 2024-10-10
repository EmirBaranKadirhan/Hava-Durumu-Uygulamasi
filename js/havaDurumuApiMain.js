class HavaDurumu{
  constructor(){
    this.baseUrl = "https://api.openweathermap.org/data/2.5/weather"
    this.api = "19a90bc4f14d50817586a58010fe2751"
    this.havaDurumuBilgiDOM = document.querySelector("#staticDiv")
    this.havaDurumGenelGorsel = document.querySelector("#havaDurumGenelGorsel");
    this.havaDurumGenelBaslik = document.querySelector(".display-2")
  }

  async verileriGetir(sehir){
    const response = await fetch(`${this.baseUrl}?q=${sehir}&units=metric&lang=tr&appid=${this.api}`)
    const data = await response.json()
    this.verileriEkrandaOlustur(data)
    console.log(data.weather[0]["description"])
    return data
}

    verileriEkrandaOlustur(data){
        this.havaDurumuBilgiDOM.innerHTML = "";
        
            let sehirAdi = data.name
            let havaSicaklik = data.main["temp"]
            let aciklama = data.weather[0]["description"]
            let nem = data.main.humidity
            let hissedilenSicaklik = data.main.feels_like
            let baseResimYolu = ""

            const havaDurumuGorselleri = {
                "açık": "./img/gunesli.jpg",
                "az bulutlu": "./img/azBulutlu.jpg",
                "parçalı bulutlu": "./img/parcaliBulutlu.jpg",
                "yağmurlu": "./img/yagmurluHava.jpg",
                "sağanak yağmur": "./img/saganakYagmurluHava.jpg",
                "kar": "./img/karliHava.jpg",
                "sisli": "./img/sisliHava.jpg",
                "kapalı": "./img/kapaliHava.jpg"
            }
            
            for(const key in havaDurumuGorselleri){
                if (aciklama.includes(key)) {                       // aciklama degiskeni, gorsellerin bulundugu objenin key degerlerinden birini iceriyor mu 
                    baseResimYolu = havaDurumuGorselleri[key];      // true'ysa  key degeri olan img dosyasinin yolu(konumu) yukarida tanimlanmis olan degiskene ata!!!
                    break;      // Eşleşme bulunduğunda döngüyü kır
                }
            }
            this.havaDurumGenelGorsel.style.display = "none";       // anasayfada bu resim gorunsun ama sehir bilgisi geldikten sonra gorunmesin
            this.havaDurumGenelBaslik.style.display = "none";       // anasayfada bu baslik gorunsun ama sehir bilgisi geldikten sonra gorunmesin
            this.havaDurumuBilgiDOM.innerHTML += `<img src="${baseResimYolu}" class="card-img-top" alt="..." width="600px" height="500px">
                <div class="card-body" style="display:flex; flex-direction: column; align-items: center">
                <h5 class="card-title">${sehirAdi}</h5>
                <p class="card-text">${aciklama}</p>
                </div>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><strong>Sicaklik:</strong> ${havaSicaklik} °C</li>
                    <li class="list-group-item"><strong>Nem Orani:</strong> %${nem}</li>
                    <li class="list-group-item"><strong>Hissedilen Sicaklik:</strong> ${hissedilenSicaklik} °C</li>
                </ul>`
       
  }

}   


