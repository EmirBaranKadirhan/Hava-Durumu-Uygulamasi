const inputDOM = document.querySelector("#input");
const buttonDOM = document.querySelector("#button");


const havaDurumNesne = new HavaDurumu()


runEventListeners();

function runEventListeners(){
    buttonDOM.addEventListener("click",sehirHavaDurumuGetir)
    inputDOM.addEventListener("keydown", function(e){           // klavyeden enter tusuna basildiginda da arama gerceklesecek 
        if(e.keyCode == "13"){          
            sehirHavaDurumuGetir()
        }
    })
}


function sehirHavaDurumuGetir(){
    const sehirAdi = inputDOM.value.trim()
    if(sehirAdi.length != 0 && sehirAdi != ""){
        havaDurumNesne.verileriGetir(sehirAdi)
        .then((data) => {
            if(data.message === "Cannot read properties of undefined (reading 'temp')"){
                alert("Hava durumu bilgisi alınamadı. Lütfen tekrar deneyin.");
            }else if(data.message === "city not found"){
                alert("Şehir bulunamadı! Lütfen geçerli bir şehir ismi giriniz.");
            }else{
                console.log(data)
            }
        })
        .catch((error) => {
            console.log(error);
            alert("Bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
            window.location.href = "index.html";                       // hatali yazim durumunda ana ekrana donecek
        });
    
        inputTemizle();

    } else{
        alert("Lutfen Bir Sehir Ismi Giriniz");
        window.location.href = "index.html";               // input alanina bir sey yazilmadiginda ana ekrana donecek
    }          
}


function inputTemizle(){
    inputDOM.value = "";
}
