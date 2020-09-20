let dateOne = new Date('2020-09-04 14:35:00');
let dateTwo = new Date('2020-09-05 16:00:00');
let dateThree = new Date('2020-09-06 00:00:00');

const app = new Vue({
    el: '#app',
    data: {
        title: '練習Vue的日子',
        txt: '',
        date_input: '',
        time_input: '',
        place_input: '',
        content_input: '',
        tempData: {},
        img: 'https://images.pexels.com/photos/1695052/pexels-photo-1695052.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        days: [{
                    id: 'Day1',
                    date: `${dateOne.getFullYear()}/${dateOne.getMonth()+1}/${dateOne.getDate()}`,
                    time: `${dateOne.getHours()}:${dateOne.getMinutes()}`,
                    place: 'Louisa 景賢門市',
                    content: 'Vue基本觀念 / MVVM 和 Vue的一些指令'
                },
                {
                    id: 'Day2',
                    date: `${dateTwo.getFullYear()}/${dateTwo.getMonth()+1}/${dateTwo.getDate()}`,
                    time: `${dateTwo.getHours()}:${dateTwo.getMinutes()}`,
                    place: '禮拜六想待在家',
                    content: '傳參考 / 淺拷貝 / 深拷貝 / 解決方式',
                }, 
            ],
    },
    methods: {
        chgTitle(){
            alert(`將${ this.title }改成${ this.txt}！`)
            this.title = this.txt;
            this.txt = '';
        },
        resetTitle(){
            alert(`重置 title`)
            this.title = '練習Vue的日子';
            this.txt = '';
        },
        updateRecord(){

            //資料沒有事先定義，要強智加入雙向綁定，建構方式為 this.$set(目標,屬性,值)
            this.$set(this.days , this.days.length , {
                                                id: 'Day3',
                                                date: `${dateThree.getFullYear()}/${dateThree.getMonth()+1}/${dateThree.getDate()}`,
                                                time: `${dateThree.getHours()}:${dateThree.getMinutes()}`,
                                                place: '禮拜日想待在家',
                                                content: '還不知道',
                                            },     )
        },
        addRecord(){
            this.days.push({
                id: `Day${this.days.length + 1}`,
                date: this.date_input,
                time: this.time_input,
                place: this.place_input,
                content: this.content_input,
            });

            
            this.date_input= '';
            this.time_input= '';
            this.place_input= '';
            this.content_input= '';
        },
        removeRecord(id){
            this.days.forEach( (item , key) => {
                if ( item.id == id ) this.days.splice(key,1)
            });
        },
        geteditRecord(item){
            this.tempData = Object.assign({}, item);
        },
        editRecord(){
            let i;
            this.days.forEach( (item , key) => {
                if ( item.id == this.tempData.id )  i = key;
            });

            this.$set(this.days , i , this.tempData);
            this.tempData = {};
            // ↑修改一次後，修改一次後，為了不在發生傳參考的問題，所以再將他定義成一次空物件，這樣就是在一個新的位置。
            // 不只是要讓綁定this.tempData的input清空而已
        },
    },
    created() {
        this.updateRecord();
    }
})
