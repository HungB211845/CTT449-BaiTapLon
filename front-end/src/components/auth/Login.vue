<template>
    <b-container>
        <h2>Đăng nhập</h2>
        <b-form @submit.prevent="login">
            <b-form-group label="Họ tên nhân viên">
                <b-form-input v-model="form.HoTenNV" required />
            </b-form-group>
            <b-form-group label="Mật khẩu">
                <b-form-input type="password" v-model="form.Password" required />
            </b-form-group>
            <b-button type="submit" variant="primary">Đăng nhập</b-button>
        </b-form>
    </b-container>
</template>

<script>
import api from '@/api';

export default {
    data() {
        return {
            form: {
                HoTenNV: '',
                Password: ''
            }
        };
    },
    methods: {
        async login() {
            try {
                const res = await api.post('/auth/login', this.form);
                localStorage.setItem('token', res.data.token);
                this.$router.push('/books');
            } catch (err) {
                alert('Đăng nhập thất bại');
            }
        }
    }
};
</script>
