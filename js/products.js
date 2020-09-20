import pagination from './components/pagination.js';
Vue.component('pagination' , pagination);


//Vue Loading Overlay Component
Vue.component('loading' , VueLoading);

new Vue({
    el: '#app',
    data:{
        products: [],
        tempProduct: {
            imageUrl: [],
            num: 0,
        },
        categoryNow: '全部',
        category: [],
        pagination: {},
        isLoading: false,        
        api:{
            uuid: '3f7b1d29-d350-4de5-92ca-9b0bdfb7ca45',
            apiPath: 'https://course-ec-api.hexschool.io/',
        },
        cart: {},
        cartTotal: 0,
    },
    methods: {
        getProducts(pageNum = 1){
            const url = `${ this.api.apiPath }api/${ this.api.uuid }/ec/products?page=${ pageNum }`;
            this.isLoading = true;
            this.categoryNow = '全部';
            axios.get(url)
                .then( res => {
                    this.isLoading = false;
                    this.products = res.data.data;
                    this.pagination = res.data.meta.pagination;

                    this.products.forEach( item => {
                        this.category.push(item.category);
                    });
                    this.category = this.category.filter((item,index,arr) =>{
                        return arr.indexOf(item) === index;
                    })
                })
                .catch( err => {
                    this.isLoading = false;
                })
        },
        getProductsCategory(category){
            const url = `${ this.api.apiPath }api/${ this.api.uuid }/ec/products?page=1`;
            this.categoryNow = category;
            this.isLoading = true;
            axios.get(url)
                .then( res => {
                    this.isLoading = false;
                    this.products = res.data.data;
                    this.pagination = {};

                    this.products = this.products.filter((item) =>{
                        return item.category === category;
                    })
                })
                .catch( err => {
                    this.isLoading = false;
                })
        },
        getProduct(id){
            const url = `${ this.api.apiPath }api/${ this.api.uuid }/ec/product/${ id }`;
            this.isLoading = true;
            axios.get(url)
                .then( res => {
                    this.isLoading = false;
                    this.tempProduct = res.data.data;
                    this.$set(this.tempProduct,'num',0);
                    $('#detailProductModal').modal('show');
                })
                .catch( err => {
                    this.isLoading = false;
                })            
        },
        getCart(){
            const url = `${ this.api.apiPath }api/${ this.api.uuid }/ec/shopping`;
            this.isLoading = true;
            axios.get(url)
                .then( res=> {
                    this.cartTotal = 0;
                    this.isLoading = false;
                    console.log('carttt',res);
                    this.cart = res.data.data;
                })
                .catch( err => {
                    this.isLoading = false;
                })
        },
        change(){
            this.tempProduct.num = parseInt($('#num').val());
        },
        addToCart( id , num = 1 ){
            const url = `${ this.api.apiPath }api/${ this.api.uuid }/ec/shopping`;

            let repeat = false;
            this.cart.forEach( item => {
                if(item.product.id === id){
                    this.repeat = true;
                }
            })
            //遠端的購物車是空的 或是 此物件沒在購物車內 -> 新增至購物車 
            if( Object.keys(this.cart).length  == 0 || this.repeat == false){
                const cart = {
                    product : id,
                    quantity : num,
                }
    
                this.isLoading = true;
    
                axios.post(url,cart)
                    .then( res=> {
                        this.isLoading = false;
                        this.getCart();
                    })
                    .catch( err => {
                        this.isLoading = false;
                        this.getCart();
                    })
            }else{
                //遠端的購物車內已有 此物件 -> 將此項商品疊加上去 
                this.cart.forEach( item => {
                    if(item.product.id === id){
                        num += item.quantity;
                        this.changeQuantity(id,num);
                    }
                })
            }
            
            this.repeat = false;

            $('#detailProductModal').modal('hide');
        },
    },
    created() {
        this.getProducts();
        this.getCart();
    },
})