import pagination from './components/pagination.js';
import couponModal from './components/couponModal.js'
import delCouponModal from './components/delCouponModal.js'

Vue.component('pagination' , pagination);

Vue.component('couponModal', couponModal);
Vue.component('delCouponModal', delCouponModal);
Vue.component('loading', VueLoading);

new Vue({
    el:'#app',
    data:{
        coupons:[],
        tempCoupon: {
            deadline: {
                datetime: '',
            },
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
                this.tempCoupon = {
                    deadline: {
                        datetime: '',
                    },
                };
                $('#couponModal').modal('show');
                break;
              case 'edit':
                this.isNew = 'edit';
                const url = `${this.api.apiPath}/api/${this.api.uuid}/admin/ec/coupon/${item.id}`;
                this.loading = item.id;
                axios.get(url)
                    .then( res => {
                        this.tempCoupon = res.data.data;
                        $('#couponModal').modal('show');
                        this.loading = '';
                    })
                    .catch( err =>{
                        console.log(err);
                    })
                break;
              case 'delete':
                this.tempCoupon = Object.assign({}, item);
                $('#delCouponModal').modal('show');
                break;
              default:
                break;
            }
        },
        getCoupons(pageNum = 1){
            this.isLoading = true;
            const url = `${this.api.apiPath}api/${this.api.uuid}/admin/ec/coupons?page=${pageNum}`;
            axios.get(url)
                .then( res => {
                    this.isLoading = false;
                    this.coupons = res.data.data;
                    this.pagination = res.data.meta.pagination;

                    if(this.tempCoupon.title){
                        this.tempCoupon = {
                            deadline: {
                                datetime: '',
                            },
                        };
                        $('#couponModal').modal('hide');
                        this.isNew = '';
                    }
                })
                .catch( err => {
                    console.log(err);
                })
        },
    },
    created(){
        this.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
        this.getCoupons();
    }
});