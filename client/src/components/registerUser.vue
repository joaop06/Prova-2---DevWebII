<template>
    <div>
        <h1>Cadastro de Usúaraio</h1>
        <form @submit.prevent="registerUser">
            <div>
                <label>Nome: </label>
                <input type="text" v-model="name" />
            </div>
            <div>
                <label>Email: </label>
                <input type="email" v-model="email" />
            </div>
            <div>
                <label>Senha: </label>
                <input type="password" v-model="password" />
            </div>
            <button type="submit">Registrar</button>
        </form>
        <p>{{ message }}</p>
    </div>
</template>

<script>
import api from '@/service/api.js'

export default {
    name: 'RegisterUser',
    data() {
        return {
            name: '',
            email: '',
            password: '',
            message: '',
        }
    },
    methods: {
        async registerUser() {
            const data = {
                name: this.name,
                email: this.email,
                password: this.password
            }
            console.log(data);

            await api.post('/api/registerUser', data).then(response => {
                if (response.status == 200) {
                    this.name = ''
                    this.email = ''
                    this.password = ''
                    this.message = response.data.message
                }
            })
        }
    },
}
</script>