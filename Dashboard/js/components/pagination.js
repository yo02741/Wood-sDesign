export default {
    template: `<nav aria-label="Page navigation example">
                    <ul class="pagination justify-content-center">
                    <li class="page-item" :class="{ disabled : 1 === pages.current_page}">
                        <a class="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">&laquo;</span>
                        </a>
                    </li>

                    <li class="page-item" v-for="( i , index ) in pages.total_pages" :key="index" :class="{ active : i === pages.current_page }">
                        <a class="page-link" href="#" @click.prevent="updatePage(i)">{{ i }}</a>
                    </li>

                    <li class="page-item" :class="{ disabled : pages.total_pages === pages.current_page}">
                        <a class="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">&raquo;</span>
                        </a>
                    </li>
                    </ul>
                </nav>`,
    props: ['pages'],
    methods: {
        updatePage(pageNum){
            this.$emit('update',pageNum);
        }
    },
}