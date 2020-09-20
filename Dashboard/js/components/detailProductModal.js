export default {
    template: `<div class="modal-dialog modal-dialog-centered ">
                    <div class="modal-content">

                        <div class="modal-header">
                            <h5 class="modal-title font-weight-bold" id="detailProductModalLabel">{{ tempProduct.title }}</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>

                        <div class="modal-body d-flex flex-column">
                            <h3 class="mt-4 text-center">{{ tempProduct.description }}</h3>
                            <p class="mt-4 text-right"> — {{ tempProduct.content }}</p>
                            
                            <div class="mt-4">
                                <div v-if="!tempProduct.price || tempProduct.price === tempProduct.origin_price">
                                    <div class="text-right">$<span class="h3 mx-1">{{ tempProduct.price }}</span>/{{ tempProduct.unit }}</div>
                                </div>
                                <div class="price d-flex justify-content-between align-items-end" v-else>
                                    <del><span>$</span>{{ tempProduct.origin_price }}/{{ tempProduct.unit }}</del>
                                    <div><span class="text-danger h3 mx-1">$ {{ tempProduct.price }}</span>/{{ tempProduct.unit }}</div>
                                </div>
                            </div>   
                            
                            <div class="form-group mt-4 mb-0">
                                <label for="num" class="sr-only">數量</label>
                                <select id="num" class="form-control" @change="change"> 
                                    <option value="0" selected disabled>請選擇數量</option>
                                    <option value="1">1 {{ tempProduct.unit }}</option>
                                    <option value="2">2 {{ tempProduct.unit }}</option>
                                    <option value="3">3 {{ tempProduct.unit }}</option>
                                    <option value="4">4 {{ tempProduct.unit }}</option>
                                    <option value="5">5 {{ tempProduct.unit }}</option>
                                    <option value="6">6 {{ tempProduct.unit }}</option>
                                    <option value="7">7 {{ tempProduct.unit }}</option>
                                    <option value="8">8 {{ tempProduct.unit }}</option>
                                    <option value="9">9 {{ tempProduct.unit }}</option>
                                    <option value="10">10 {{ tempProduct.unit }}</option>
                                </select>
                            </div>
                        </div>

                        <div class="modal-footer">
                            <span class="text-secondary mr-4" v-if="item.price != 0">小計<strong class="mx-2">{{ this.item.price }}</strong>元</span>
                            <button type="button" class="btn btn-primary">加入購物車</button>
                        </div>
                        
                    </div>
                </div>`,
    props: ['tempProduct'],
    data(){
        return{
            item:{
                id: '',
                num: 0,
                price: 0,
            }
        }
    },
    methods: {
        change(){
            this.item.id = this.tempProduct.id;
            this.item.num = parseInt($('#num').val());
            this.item.price = parseInt($('#num').val())*this.tempProduct.price;
        }
    },
}