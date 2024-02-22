let seviye = document.getElementById("seviye");
let questionApp = document.getElementById("question");
let qBody = document.getElementById("q-body");
let soruElNo = document.getElementById("soru-no");
let timeSpan = document.getElementById('vakit')
let seviyeType;
let soruNo;
let dogru = 0;

let dogruSesi = new Audio('./win.mp3');
let yanlisSesi = new Audio('./huh.mp3');
function seviyeSectik(data){
  seviye.style.display = "none";
  questionApp.style.display = "block";
  seviyeType = data;
  soruNo = 1;
  getValues();
  let time = setInterval(function () {
    timer();
  }, 1000);
  let m = 4;
  let s = 60;
  function timer() {
    s--;
    if (s == -1) {
      m--;
      s = 59;
    }
    if (m == -1) {
      m = 0;
      s = 0;
      clearInterval(time);
      alert("Süre Bitti !!!!")
      location.reload()
    }
    timeSpan.innerHTML = `${m}:${s}`;
    if (s <= 9) {
      timeSpan.innerHTML = `${m}:0${s}`;
    }
}
}

function getValues() {
  if(soruNo <= 10){
    fetch(`./Questions/${seviyeType}.json`)
    .then((res) => res.json())
    .then(function (values) {
      qBody.innerHTML = `
      <h1 id="soru">${values[soruNo - 1].question}</h1>
                <div class="ans">
                    <div id="ans-1" onclick="checkAns(this.id)">${values[soruNo - 1].ans1}</div>
                    <div id="ans-2" onclick="checkAns(this.id)">${values[soruNo - 1].ans2 }</div>
                    <div id="ans-3" onclick="checkAns(this.id)">${values[soruNo - 1].ans3 }</div>
                    <div id="ans-4" onclick="checkAns(this.id)">${values[soruNo - 1].ans4 }</div>
                </div>
        `;
    });
  }
  else{
    qBody.style.display = 'none';
    soruElNo.parentElement.style.display = 'none';
    questionApp.innerHTML = `<h1 class="dogru">${dogru*10}% = ${dogru} doğru sorunuz var</h1>`
    setTimeout(()=>{
      location.reload()
    },3500)
  }
}


function checkAns(id){
    fetch(`./Questions/${seviyeType}.json`)
    .then((res) => res.json())
    .then(function (values) {
        if(document.getElementById(id).innerText == values[soruNo - 1].correct_answer){
            document.getElementById(id).style.backgroundColor ='orange';
            document.getElementById('ans-1').removeAttribute('onclick')
            document.getElementById('ans-2').removeAttribute('onclick')
            document.getElementById('ans-3').removeAttribute('onclick')
            document.getElementById('ans-4').removeAttribute('onclick')
            soruNo++;
            dogru++;
            setTimeout(()=>{
                document.getElementById(id).style.backgroundColor ='green';
                dogruSesi.play()
                
            },1500)
            setTimeout(()=>{
                getValues()
                soruElNo.innerText = soruNo
            },2500)
        }
        else{
            document.getElementById(id).style.backgroundColor ='orange';
            document.getElementById('ans-1').removeAttribute('onclick')
            document.getElementById('ans-2').removeAttribute('onclick')
            document.getElementById('ans-3').removeAttribute('onclick')
            document.getElementById('ans-4').removeAttribute('onclick')
            soruNo++;
            
            setTimeout(()=>{
                document.getElementById(id).style.backgroundColor ='red';
                yanlisSesi.play()
            },1500)
            
            setTimeout(()=>{
                getValues()
                soruElNo.innerText = soruNo
            },2500)
        }
       
    });
}
