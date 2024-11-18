let data = [ ];


// 定義一個函式來包裝 API 請求
function fetchData(apiUrl) {
  axios.get(apiUrl)
    .then(function(response){
        data = response.data.data;
        init();
        formatChartData();
    })
    .catch(error=>{
        console.log(error.name);
        alert("未正確取得API");
    });
}

//API URL
const apiUrl = 'https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json';
fetchData(apiUrl);


const ticketCard = document.querySelector(".ticketCard-area");
const searchResultNum = document.querySelector(".searchResultNum");
const filter = document.querySelector(".regionSearch");

//套票卡片 初始化資料 預設載入  start -------------------------------------
function init(){
    filter.value = "全部地區"; //預設篩選器顯示全部地區
    let str = "";
    let count = 0;
    // 預設套票卡片撈資料邏輯
    data.forEach(function(item,index){
        str += `
            <li class="ticketCard">
            <div class="ticketCard-img">
              <a href="#">
                <img src="${item.imgUrl}" alt="">
              </a>
              <div class="ticketCard-region">${item.area}</div>
              <div class="ticketCard-rank">${item.rate}</div>
            </div>
            <div class="ticketCard-content">
              <div>
                <h3>
                  <a href="#" class="ticketCard-name">${item.name}</a>
                </h3>
                <p class="ticketCard-description">${item.description}</p>
              </div>
              <div class="ticketCard-info">
                <div class="ticketCard-num">
                  <p>
                    <span><i class="fas fa-exclamation-circle"></i></span>
                    剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
                  </p>
                </div>
                <p class="ticketCard-price">
                  TWD <span id="ticketCard-price">$${item.price}</span>
                </p>
              </div>
            </div>
          </li>
        `;
        count++;
    })
    ticketCard.innerHTML = str;
    searchResultNum.innerHTML = count;
    formatChartData();
}


//縣市篩選器邏輯 start -------------------------------------
filter.addEventListener("change", function(e){
    let str="";
    let count = 0;
    data.forEach(function(item,index){
        if (filter.value == "全部地區"){
            str += `
                <li class="ticketCard">
                <div class="ticketCard-img">
                  <a href="#">
                    <img src="${item.imgUrl}" alt="">
                  </a>
                  <div class="ticketCard-region">${item.area}</div>
                  <div class="ticketCard-rank">${item.rate}</div>
                </div>
                <div class="ticketCard-content">
                  <div>
                    <h3>
                      <a href="#" class="ticketCard-name">${item.name}</a>
                    </h3>
                    <p class="ticketCard-description">${item.description}</p>
                  </div>
                  <div class="ticketCard-info">
                    <div class="ticketCard-num">
                      <p>
                        <span><i class="fas fa-exclamation-circle"></i></span>
                        剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
                      </p>
                    </div>
                    <p class="ticketCard-price">
                      TWD <span id="ticketCard-price">$${item.price}</span>
                    </p>
                  </div>
                </div>
              </li>
            `;
            count+=1;
        } else if (filter.value == item.area) {
            str += `
                <li class="ticketCard">
                <div class="ticketCard-img">
                  <a href="#">
                    <img src="${item.imgUrl}" alt="">
                  </a>
                  <div class="ticketCard-region">${item.area}</div>
                  <div class="ticketCard-rank">${item.rate}</div>
                </div>
                <div class="ticketCard-content">
                  <div>
                    <h3>
                      <a href="#" class="ticketCard-name">${item.name}</a>
                    </h3>
                    <p class="ticketCard-description">${item.description}</p>
                  </div>
                  <div class="ticketCard-info">
                    <div class="ticketCard-num">
                      <p>
                        <span><i class="fas fa-exclamation-circle"></i></span>
                        剩下最後 <span id="ticketCard-num"> ${item.group} </span> 組
                      </p>
                    </div>
                    <p class="ticketCard-price">
                      TWD <span id="ticketCard-price">$${item.price}</span>
                    </p>
                  </div>
                </div>
              </li>
            `;    
            count+=1;        
        }
        
    })
    ticketCard.innerHTML = str;
    searchResultNum.innerHTML = count;
})

//新增邏輯 start -------------------------------------

    const ticketName = document.querySelector("#ticketName"); //套票名稱
    const ticketImgUrl = document.querySelector("#ticketImgUrl"); //圖片網址
    const ticketRegion = document.querySelector("#ticketRegion"); //景點地區
    const ticketPrice = document.querySelector("#ticketPrice"); //套票金額
    const ticketNum = document.querySelector("#ticketNum"); //套票組數
    const ticketRate = document.querySelector("#ticketRate"); //套票星級
    const ticketDescription = document.querySelector("#ticketDescription"); //套票描述
    const btn = document.querySelector(".btn"); //新增套票

    //必填提示
    const ticketNameMessage = document.querySelector("#ticketName-message"); //套票名稱必填提示
    const ticketImgUrlMessage = document.querySelector("#ticketImgUrl-message"); //圖片網址必填提示
    const ticketRegionMessage = document.querySelector("#ticketRegion-message"); //景點地區必填提示
    const ticketPriceMessage = document.querySelector("#ticketPrice-message"); //套票金額必填提示
    const ticketNumMessage = document.querySelector("#ticketNum-message"); //套票組數必填提示
    const ticketRateMessage = document.querySelector("#ticketRate-message"); //套票星級必填提示
    const ticketDescriptionMessage = document.querySelector("#ticketDescription-message"); //套票描述必填提示
    //共用的必填提示HTML結構
    const errorTip =`<i class="fas fa-exclamation-circle"></i><span>必填!</span>`;

    //新增套票動作：step1 判斷欄位有無必填，有則跑必填提示   step2 欄位皆已填寫才執行新增套票
    btn.addEventListener("click", function(e){

        //step1 click時：未填寫顯示errorTip，已填寫則隱藏errorTip，並累計errorTip數量
        let errorTipNum = 0;
        if (ticketName.value == ""){ ticketNameMessage.innerHTML = errorTip; errorTipNum +=1; } else { ticketNameMessage.innerHTML = "";} //套票名稱必填提示
        if (ticketImgUrl.value == ""){ ticketImgUrlMessage.innerHTML = errorTip; errorTipNum +=1; } else { ticketImgUrlMessage.innerHTML = "";} //圖片網址必填提示
        if (ticketRegion.value == ""){ ticketRegionMessage.innerHTML = errorTip; errorTipNum +=1; } else { ticketRegionMessage.innerHTML = "";} //景點地區必填提示
        if (ticketPrice.value == ""){ ticketPriceMessage.innerHTML = errorTip; errorTipNum +=1; } else { ticketPriceMessage.innerHTML = "";} //套票金額必填提示
        if (ticketNum.value == ""){ ticketNumMessage.innerHTML = errorTip; errorTipNum +=1; } else { ticketNumMessage.innerHTML = "";} //套票組數必填提示
        if (ticketRate.value == ""){ ticketRateMessage.innerHTML = errorTip; errorTipNum +=1; } else { ticketRateMessage.innerHTML = "";} //套票星級必填提示
        if (ticketDescription.value == ""){ ticketDescriptionMessage.innerHTML = errorTip; errorTipNum +=1; } else { ticketDescriptionMessage.innerHTML = "";} //套票描述必填提示
        
        //step2 click時若所有欄位已填寫，errorTip數量會是0，此時才執行新增obj於陣列data，並同步更新li顯示
        if (errorTipNum == 0 ) {
            let obj ={};
            obj.id = data.length;
            obj.name = ticketName.value;
            obj.imgUrl = ticketImgUrl.value;
            obj.area = ticketRegion.value;
            obj.description = ticketDescription.value;
            obj.group = ticketNum.value;
            obj.price = ticketPrice.value;
            obj.rate = ticketRate.value;
            data.push(obj);//將輸入資料obj加入 data 陣列
            init(); //同步更新li顯示，使用預設篩選器：全部地區
            //隱藏必填提示
            ticketNameMessage.innerHTML = "";
            //清空表單所有欄位
            ticketName.value = "";
            ticketImgUrl.value = "";
            ticketRegion.value = "";
            ticketDescription.value = "";
            ticketNum.value = "";
            ticketPrice.value = "";
            ticketRate.value = "";
        }

        formatChartData();
    })

//  圖表資料
function formatChartData(){
    //製作圖表所需陣列資料：計算地區與數量，以物件形式呈現
    let chartObjData = {};
    data.forEach((item) => {
        if (!chartObjData[item.area]){
            chartObjData[item.area] = 1;
        } else if (chartObjData[item.area]) {
            chartObjData[item.area] ++;
        }
    })

    //將物件 chartObjData 轉換成陣列 chartNewData
    const chartNewData =Object.entries(chartObjData);
    renderChart(chartNewData);
    // 原始寫法
    // let chartNewData =[];
    // let area = Object.keys(chartObjData);
    // area.forEach(function(item){
    //     let ary = [];
    //     ary.push(item, chartObjData[item])
    //     chartNewData.push(ary);
    // })

    
}
 // 圖表繪製 c3.js donut
function renderChart(data){
    const chart = c3.generate({
        data: {
            columns: data,
            type : 'donut',
        },
        color: {
            pattern: ["#26C0C7", "#5151D3", "#E68618"],
            
        },
        size: {
            width: 170,
            height: 194
        },
        donut: {
            title: "套票地區比重",
            width: 12,
            label: {
                show:false
            }
        }
    });
    // 修改title文字樣式
    d3.select('.c3-chart-arcs-title')
    .style('fill', '#4B4B4B') 
    .style('font-size', '14px') // 修改文字大小
    .style('font-weight', 'normal'); // 修改字體加粗
    // 修改title文字樣式
    d3.selectAll('.c3-legend-item text')
    .style('fill', '#6E6E6E') // 修改文字顏色為藍色
    .style('font-size', '14px') // 修改文字大小
    .style('font-weight', 'normal'); // 修改字體加粗
}




init();