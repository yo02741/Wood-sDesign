new Vue({
    el:'#app',
    data: {
        user:{
            email: '',
            password: '',
        },
        api:{
            apiPath: 'https://course-ec-api.hexschool.io/',
        }

    },
    methods: {
        signin(){
            const apiurl = `${this.api.apiPath}api/auth/login`;
            axios.post( apiurl , this.user )
                .then( res => {
                    const token = res.data.token;
                    const expired = res.data.expired;
                    document.cookie = `token=${token};expires=${new Date(expired * 1000)}; path=/`;
                    Swal.fire(
                        'Login Successfully!',
                        `Welcome, ${this.user.email}`,
                        'success'
                      ).then( result => {
                          if(result.isConfirmed) window.location.href = 'adminProduct.html';
                      });
                })
                .catch( err => {
                    console.log(err);
                    Swal.fire(
                        'Login Failed!',
                        'Please try again!',
                        'error'
                      ).then( result => {
                          if(result.isConfirmed) {
                            this.user.email = '';
                            this.user.password = '';
                          }
                      });
                })
        },
    },
})