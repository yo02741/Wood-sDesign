import pagination from './components/pagination.js';
import productModal from './components/productModal.js';
import delProductModal from './components/delProductModal.js';

Vue.component('pagination' , pagination);
Vue.component('productModal' , productModal);
Vue.component('delProductModal' , delProductModal);

Vue.component('loading',VueLoading);

new Vue({
    el:'#app',
    data:{
        products:[],
        tempProduct: {
            imageUrl : []
        },
        pagination: {},
        api: {
            uuid: '3f7b1d29-d350-4de5-92ca-9b0bdfb7ca45',
            apiPath: 'https://course-ec-api.hexschool.io/',
        },
        token: '',
        isNew: '',
        loading: '',
        isLoading: false,
    },
    methods:{
        openModal(isNew, item) {
            switch (isNew) {
              case 'new':
                this.isNew = 'new';
                this.tempProduct = { imageUrl : [] };
                $('#productModal').modal('show');
                break;
              case 'edit':
                this.isNew = 'edit';
                const url = `${this.api.apiPath}/api/${this.api.uuid}/admin/ec/product/${item.id}`;
                this.loading = item.id;
                axios.get(url)
                    .then( res => {
                        this.tempProduct = res.data.data;
                        console.log(this.tempProduct);
                        $('#productModal').modal('show');
                        this.loading = '';
                    })
                    .catch( err =>{
                        console.log(err);
                    })
                break;
              case 'delete':
                this.isNew = 'delete';
                this.tempProduct = Object.assign({}, item);
                $('#delProductModal').modal('show');
                break;
              default:
                break;
            }
        },
        getProducts(pageNum = 1){
            // if(!pageNum) pageNum =1;
            this.isLoading = true;
            const url = `${this.api.apiPath}api/${this.api.uuid}/admin/ec/products?page=${pageNum}`;
            axios.get(url)
                .then( res => {
                    this.isLoading = false;
                    this.products = res.data.data;
                    this.pagination = res.data.meta.pagination;

                    if(this.tempProduct.title){
                        this.tempProduct = {
                            imageUrl:[]
                        };
                        $('#productModal').modal('hide');
                        this.isNew = '';
                    }
                })
                .catch( err => {
                    console.log(err);
                })

        },
        updateProduct(){
            // if(this.tempProduct.id){
            //     const id = this.tempProduct.id;
            //     this.products.forEach((item,key)=>{
            //         if(item.id === id){
            //             this.products[key] = this.tempProduct;
            //         }
            //     });
            //     Swal.fire(
            //         '修改成功!',
            //         '',
            //         'success'
            //       );
            // }else{
            //     const id = new Date().getTime();
            //     this.tempProduct.id = id;
            //     this.products.push(this.tempProduct);
            //     Swal.fire(
            //         '新增成功!',
            //         '',
            //         'success'
            //       );
            // }
            // this.tempProduct = {};
            // $('#productModal').modal('hide');
        },
        delProduct(){
            // if(this.tempProduct.id){
            //     const id = this.tempProduct.id;
            //     this.products.forEach((item,key)=>{
            //         if(item.id === id){
            //             this.products.splice(key,1);
            //         }
            //     });
            // }
            // Swal.fire(
            //     '刪除成功!',
            //     '',
            //     'success'
            //   );
            // this.tempProduct = {};
            $('#delProductModal').modal('hide');
        },
    },
    created(){
        this.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
        this.getProducts();
    }
});