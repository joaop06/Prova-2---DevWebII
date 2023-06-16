<template>
    <div>
        <form @submit.prevent="getUsers">
            <button type="submit">Mostrar todos</button>
            <p>{{ msg }}</p>
        </form>
        <ul v-if="users.length">
            <li v-for="(user, index) in users" :key="index">
                <form>
                    <div>
                        <label>Nome: </label>
                        <input type="text" v-model="user.name" />

                        <label>Email: </label>
                        <input type="email" v-model="user.email" />

                        <label>Confirmar Senha: </label>
                        <input type="text" v-model="confirmPassword[index]" />

                        <button type="submit" @click="updateUser(index, user.id, user.name, user.email)">Atualizar</button>
                        <button type="submit" @click="deleteUser(index, user.id, user.name)">Deletar</button>
                    </div>
                </form>
            </li>
        </ul>
    </div>
</template>

<script>
import api from '@/service/api.js'

export default {
    data() {
        return {
            confirmPassword: [],
            msg: '',
            users: []
        }
    },
    methods: {
        async getUsers() {
            await api.get('/api/getUsers').then(response => {
                this.users = response.data.rows
                console.log(this.users)
            })
        },
        async updateUser(index, id, name, email) {
            if (this.confirmPassword[index] == this.users[index].password) {
                const body = {
                    name: name,
                    email: email
                }
                await api.put(`/api/updateUser?id=${id}`, body).then(response => {
                    if (response.status == 200) {
                        alert(response.data.message)
                        this.confirmPassword = []
                    } else {
                        alert(response.data.message)
                    }
                })
            } else {
                alert("Senha Incorreta!")
            }
        },
        async deleteUser(index, id, name) {
            if (this.confirmPassword[index] == this.users[index].password) {
                if (confirm(`Tem certeza que deseja deletar ${name}?`)) {
                    await api.delete(`/api/deleteUser?id=${id}`).then(response => {
                        if (response.status == 200) {
                            alert(response.data.message)
                            this.confirmPassword = []
                        } else {
                            alert(response.data.message)
                        }
                    })
                }
            } else {
                alert("Senha Incorreta!")
            }
        }
    },
}
</script>