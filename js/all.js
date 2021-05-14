
let productData = [];

const productForm = document.querySelector('#productForm');
const productName = document.querySelector('#title');
const originalPrice = document.querySelector('#originalPrice');
const price = document.querySelector('#price');
const addProduct = document.querySelector('#addProduct');

const deleteAll = document.querySelector('#deleteAll');
const productList = document.querySelector('#productList');


// 產品增加
function addProductData(){

    if(productName.value === "" || originalPrice.value  === "" || price.value === ""){

        alert("產品資料未填寫");

    }else if(originalPrice.value <= 0 || price.value <= 0){

        alert("價錢不能為 0 以下");

    }else{

        let obj = {}
        productData.push(
            obj = {
                productName: productName.value,
                originalPrice: originalPrice.value,
                price: price.value,
                isStart: false
            }
        )
        productForm.reset();
        renderProductList();

    }

}

// 監聽增加產品按鈕
addProduct.addEventListener('click',addProductData);

// 刪除全部
function deleteAllData(){

    productData = [];
    renderProductList();

}
// 監聽刪除全部按鈕
deleteAll.addEventListener('click',deleteAllData);

// 單筆產品刪除
function deleteThisData(productIndex){

    productData.splice(productIndex,1);
    renderProductList();

}

// 產品啟用狀態
function productStatus(productIndex){

    if(!productData[productIndex].isStart){
        productData[productIndex].isStart = true;
    }else{
        productData[productIndex].isStart = false;
    }
    statusChange(productIndex)
}

// 狀態變化
function statusChange(productIndex){

    const toggle = document.querySelectorAll('div[data-toggle="isStart"]');
    const switchText = document.querySelectorAll('div[data-control="switchControl"] span');

    if(!productData[productIndex].isStart){

        switchText[productIndex].textContent = "未啟用";
        toggle[productIndex].classList.add('close');
        toggle[productIndex].classList.remove('open');

    }else{

        switchText[productIndex].textContent = "啟用";
        toggle[productIndex].classList.add('open');
        toggle[productIndex].classList.remove('close');
    }

}

// 監聽單筆刪除按鈕 & 監聽產品狀態且換
productList.addEventListener('click',(e) => {
    
    let productIndex = e.target.getAttribute('data-ID');
    //單筆刪除
    if(e.target.getAttribute('data-Btn') === 'deleteThis'){

        deleteThisData(productIndex);

    }else if(e.target.getAttribute('data-toggle') === 'isStart'){
        
        productStatus(productIndex);

    }

})

// 產品表單渲染
function renderProductList(){

    let content = "";
    if(productData.length === 0){
        content += `<tr class="noProduct">
                        <td colspan="5">目前沒有產品</td>
                    </tr>`;
    }else{
        productData.forEach((item,key) => {
            content += `<tr>
                            <td>${item.productName}</td>
                            <td>${item.originalPrice}</td>
                            <td>${item.price}</td>
                            <td class="position-relative">
                                <div class="switch-group"  data-control="switchControl">
                                    <div class="switch" data-toggle="isStart" data-ID="${key}">
                                        <div class="switch-circle"></div>
                                    </div>
                                    <span>未啟用</span>
                                </div>
                            </td>
                            <td><button type="button" class="deleteBtn" data-Btn="deleteThis" data-ID="${key}">刪除</button></td>
                        </tr>`;
        })
    }
    productList.innerHTML = content;

    productData.forEach((item,key) => {
        statusChange(key);
    })

}

// 生命週期
function init(){
    renderProductList();
}
init();