<template>
    <b-container>
        <h2>Đăng nhập</h2>
        <b-alert v-model="showError" variant="danger" dismissible>
            {{ errorMessage }}
        </b-alert>
        <b-form @submit.prevent="login">
            <b-form-group label="Họ tên nhân viên">
                <b-form-input v-model="form.HoTenNV" required />
            </b-form-group>
            <b-form-group label="Mật khẩu">
                <b-form-input type="password" v-model="form.Password" required />
            </b-form-group>
            <b-button type="submit" variant="primary" :disabled="loading">
                <b-spinner v-if="loading" small></b-spinner>
                Đăng nhập
            </b-button>
        </b-form>
    </b-container>
</template>

<script>
import authService from '@/services/auth.service';

export default {
    data() {
        return {
            form: {
                HoTenNV: '',
                Password: ''
            },
            loading: false,
            showError: false,
            errorMessage: ''
        };
    },
    methods: {
        async login() {
            try {
                this.loading = true;
                this.showError = false;
                
                await authService.login(this.form.HoTenNV, this.form.Password);
                
                // Redirect to the originally requested page or to books
                const redirectPath = this.$route.query.redirect || '/books';
                this.$router.push(redirectPath);
            } catch (err) {
                this.showError = true;
                this.errorMessage = 'Đăng nhập thất bại. Vui lòng kiểm tra thông tin đăng nhập.';
                console.error('Login error:', err);
            } finally {
                this.loading = false;
            }
        }
    }
};
</script>
