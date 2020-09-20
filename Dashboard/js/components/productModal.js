export default {
    template:`<div class="modal-dialog modal-xl" role="document">
                <div class="modal-content border-0">
                    <div class="modal-header bg-primary text-white">
                    <h5 class="modal-title" id="productModalLabel">新增 / 編輯產品</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                    </div>
                    <div class="modal-body">
                    <div class="row">
                        <div class="col-4">
                            <div class="form-group">
                                <label for="imageUrl">輸入圖片網址</label>
                                <input type="text" id="imageUrl" class="form-control" placeholder="請輸入圖片連結" v-model="tempProduct.imageUrl[0]">
                            </div>
                            <img :src="tempProduct.imageUrl[0]" :title="tempProduct.title" class="img-fluid">
                        </div>
                        <div class="col-8">
                            <div class="form-group">
                                <label for="title">標題</label>
                                <input type="text" id="title" class="form-control" placeholder="請輸入標題" v-model="tempProduct.title">
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label for="category">分類</label>
                                    <input type="text" id="category" class="form-control" placeholder="請輸入分類" v-model="tempProduct.category">
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="unit">單位</label>
                                    <input type="text" id="unit" class="form-control" placeholder="請輸入單位" v-model="tempProduct.unit">
                                </div>                     
                            </div>
                            <div class="form-row">
                                <div class="form-group col-md-6">
                                    <label for="origin_price">原價</label>
                                    <input type="number" id="origin_price" class="form-control" placeholder="請輸入原價" v-model="tempProduct.origin_price">
                                </div>
                                <div class="form-group col-md-6">
                                    <label for="price">售價</label>
                                    <input type="number" id="price" class="form-control" placeholder="請輸入售價" v-model="tempProduct.price">
                                </div>                        
                            </div>
                            <div class="form-group">
                                <label for="content">產品描述</label>
                                <textarea class="form-control" id="description" placeholder="請輸入產品描述" v-model="tempProduct.description"></textarea>
                            </div>
                            <div class="form-group">
                                <label for="description">說明內容</label>
                                <textarea class="form-control" id="content" placeholder="請輸入說明內容" v-model="tempProduct.content"></textarea>
                            </div>
                            <div class="form-group">
                                <div class="form-check">
                                    <input type="checkbox" id="enabled" class="form-check-input" v-model="tempProduct.enabled">
                                    <label for="enabled">是否啟用</label>
                                </div>
                            </div>                    
                        </div>
                    </div>
                    </div>
                    <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-primary" @click="updateProduct">確認</button>
                    </div>
                </div>
            </div>`,
    props: ['tempProduct','api','isNew'],
    methods: {
        updateProduct(){
            switch(this.isNew){
                case 'new':
                    const postUrl =`${this.api.apiPath}api/${this.api.uuid}/admin/ec/product`;
                    axios.post(postUrl,this.tempProduct)
                        .then( res =>{
                            this.$emit('refresh');
                            // Swal.fire(
                            //     'Create Successfully!',
                            //     ``,
                            //     'success'
                            //   );
                        })
                        .catch( err =>{
                            console.log(err);
                        });
                    break;
                case 'edit':
                    const editUrl =`${this.api.apiPath}api/${this.api.uuid}/admin/ec/product/${this.tempProduct.id}`;
                    axios.patch(editUrl,this.tempProduct)
                        .then( res =>{
                            this.$emit('refresh');
                            // Swal.fire(
                            //     'Update Successfully!',
                            //     ``,
                            //     'success'
                            //   );
                        })
                        .catch( err =>{
                            console.log(err);
                        })
                    break;
            }
        }
    },
}