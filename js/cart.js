//Vue Loading Overlay Component
Vue.component('loading' , VueLoading);

//VeeValidate Component
Vue.component('ValidationProvider',VeeValidate.ValidationProvider);
Vue.component('ValidationObserver',VeeValidate.ValidationObserver);

//VeeValidate Component class
VeeValidate.configure({
    classes:{
        valid: 'is-valid',
        invalid: 'is-invalid',
    }
});

//VeeValidate Component locale
// 先 import 語系檔 再設定
import zhtw from './locale/zhtwModule.js';
VeeValidate.localize('zhtw', zhtw);

new Vue({
    el: '#app',
    data:{
        isLoading: false,
        cart: {},
        cartTotal: 0,
        api:{
            uuid: '3f7b1d29-d350-4de5-92ca-9b0bdfb7ca45',
            apiPath: 'https://course-ec-api.hexschool.io/',
        },
        payment: ['WebATM','ATM','Barcode','Credit','ApplePay','GooglePay'],
        form:{
            name: '',
            email: '',
            tel: '',
            address: '',
            payment: '',
            message: '',
            coupon: '',
        },
        couponPercent: 0,
        couponMoneySaved: 0,
    },
    methods: {
        getCart(){
            const url = `${ this.api.apiPath }api/${ this.api.uuid }/ec/shopping`;
            this.isLoading = true;
            axios.get(url)
                .then( res=> {
                    this.cartTotal = 0;
                    this.isLoading = false;
                    console.log('carttt',res);
                    this.cart = res.data.data;
                    this.cart.forEach( item => {
                        this.cartTotal += item.product.price * item.quantity;
                    })
                                    
                    if (this.couponPercent !== 0) {
                        this.couponMoneySaved = this.cartTotal - (parseInt(this.cartTotal / 100 * this.couponPercent));
                        console.log(this.couponMoneySaved);
                    }
                })
                .catch( err => {
                    this.isLoading = false;
                })
        },
        changeQuantity(id,num){
            const url = `${ this.api.apiPath }api/${ this.api.uuid }/ec/shopping`;

            const cart = {
                product : id,
                quantity : num,
            }

            this.isLoading = true;

            axios.patch(url,cart)
                .then( res=> {
                    this.isLoading = false;
                    this.getCart();
                })
                .catch( err => {
                    this.isLoading = false;
                    this.getCart();
                })
        },
        delProduct(id){
            const url = `${ this.api.apiPath }api/${ this.api.uuid }/ec/shopping/${ id }`;

            this.isLoading = true;

            axios.delete(url)
                .then( res=> {
                    this.isLoading = false;
                    this.getCart();
                })
                .catch( err => {
                    this.isLoading = false;
                    this.getCart();
                })
        },
        delProducts(){
            const url = `${ this.api.apiPath }api/${ this.api.uuid }/ec/shopping/all/product`;

            this.isLoading = true;

            axios.delete(url)
                .then( res=> {
                    this.isLoading = false;
                    this.getCart();
                })
                .catch( err => {
                    this.isLoading = false;
                    this.getCart();
                })
        },
        searchCoupon(){
            if(this.form.coupon === ""){
                Swal.fire({
                    icon: 'error',
                    title: 'Hello ?',
                    text: '請輸入優惠券代碼！',
                  }).then((clicked) => {
                    if (clicked) {                                
                        this.form.coupon = '';
                        this.couponPercent = 0;
                        this.couponMoneySaved = 0;
                        this.getCart();
                    }
                })
            }else{
                const url = `${ this.api.apiPath }api/${ this.api.uuid }/ec/coupon/search`;
                this.isLoading = true;

                axios.post(url,{code : this.form.coupon})
                    .then( res=> {
                        this.isLoading = false;
                        
                        this.couponPercent = res.data.data.percent;
                        this.getCart();
                    })
                    .catch( err => {
                        this.isLoading = false;
                        Swal.fire({
                            icon: 'error',
                            title: 'oops ?',
                            text: '無此優惠券代碼！',
                          }).then((clicked) => {
                            if (clicked) {                                
                                this.form.coupon = '';
                                this.couponPercent = 0;
                                this.couponMoneySaved = 0;
                                this.getCart();
                            }
                        })
                    })

            }
        },
        createOrder(){
            if(Object.keys(this.cart).length === 0){
                Swal.fire({
                    icon: 'error',
                    title: '您的購物車空空的喔！',
                    text: "Let's Go Shopping！",
                }).then((clicked) => {
                    if (clicked) {                   
                        window.location.href = "./products.html";
                    }
                })
            }else{
                const url = `${ this.api.apiPath }api/${ this.api.uuid }/ec/orders`;
                this.isLoading = true;

                axios.post(url,this.form)
                    .then( res=> {
                        this.isLoading = false;
                        
                        this.couponPercent = res.data.data.percent;
                        
                        Swal.fire({
                            icon: 'success',
                            title: '購物成功，THX :)！',
                            text: '即將跳轉至購物清單。。',
                        }).then((clicked) => {
                            if (clicked) {                   
                                window.location.href = "./products.html";
                            }
                        })
                    })
                    .catch( err => {
                        this.isLoading = false;
                        this.getCart();
                    })
            }
        }
    },
    created() {
        this.getCart();
    },
})