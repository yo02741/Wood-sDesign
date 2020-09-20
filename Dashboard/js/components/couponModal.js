export default {
    template:`<div class="modal-dialog modal-md" role="document">
                <div class="modal-content border-0">
                    <div class="modal-header bg-primary text-white">
                    <h5 class="modal-title" id="CouponModalLabel">新增 / 編輯優惠券</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <div class="modal-body">
                    <div class="row">
                        <div class="col-12">
                            <div class="form-group">
                                <label for="title">優惠券名稱</label>
                                <input type="text" id="title" class="form-control" placeholder="請輸入優惠券名稱" v-model="tempCoupon.title">
                            </div>
                            <div class="form-group">
                                <label for="code">序號</label>
                                <input type="text" id="code" class="form-control" placeholder="請輸入序號" v-model="tempCoupon.code">
                            </div>
                            <div class="form-group">
                                <label for="percent">折扣百分比</label>
                                <input type="text" id="percent" class="form-control" placeholder="請輸入折扣百分比" v-model="tempCoupon.percent">
                            </div>
                            <div class="form-group">
                                <label for="deadline_at">到期日</label>
                                <input type="text" id="deadline_at" class="form-control" placeholder="請輸入到期日" v-model="tempCoupon.deadline.datetime">
                            </div>
                            <div class="form-group">
                                <div class="form-check">
                                    <input type="checkbox" id="enabled" class="form-check-input" v-model="tempCoupon.enabled">
                                    <label for="enabled">是否啟用</label>
                                </div>
                            </div>                    
                        </div>
                    </div>
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="updateCoupon">確認</button>
                    </div>
                </div>
            </div>`,
    props: ['tempCoupon','api','isNew'],
    data(){
        return{
            editcoupon: {},
        }
    },
    methods: {
        updateCoupon(){
            switch(this.isNew){
                case 'new':
                    const postUrl =`${this.api.apiPath}api/${this.api.uuid}/admin/ec/coupon`;


                    this.editcoupon = Object.assign({},this.tempCoupon);
                    delete this.editcoupon.deadline;
                    
                    if (this.editcoupon.enabled  == undefined) this.editcoupon.enabled = false;
                    this.editcoupon.deadline_at = this.tempCoupon.deadline.datetime;

                    axios.post(postUrl,this.editcoupon)
                        .then( res =>{
                            this.$emit('refresh');
                        })
                        .catch( err =>{
                            console.log(err);
                        });
                    break;
                case 'edit':
                    const editUrl =`${this.api.apiPath}api/${this.api.uuid}/admin/ec/coupon/${this.tempCoupon.id}`;
                    
                    this.editcoupon = Object.assign({},this.tempCoupon);
                    this.editcoupon.deadline_at = this.tempCoupon.deadline.datetime;

                    axios.patch(editUrl,this.editcoupon)
                        .then( res =>{
                            this.$emit('refresh');
                        })
                        .catch( err =>{
                            console.log(err);
                        })
                    break;
            }
        }
    },
}