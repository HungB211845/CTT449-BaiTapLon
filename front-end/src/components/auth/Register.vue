<template>
    <b-container>
        <h2>Đăng ký</h2>
        <b-form @submit.prevent="registerUser">
            <b-form-group label="MSNV">
                <b-form-input v-model="form.MSNV" required />
            </b-form-group>
            <b-form-group label="Họ tên">
                <b-form-input v-model="form.HoTenNV" required />
            </b-form-group>
            <b-form-group label="Mật khẩu">
                <b-form-input type="password" v-model="form.Password" required />
            </b-form-group>
            <b-form-group label="Chức vụ">
                <b-form-select v-model="form.ChucVu" :options="['admin', 'thủ thư', 'nhân viên']" />
            </b-form-group>
            <b-button type="submit" variant="primary">Đăng ký</b-button>
        </b-form>
    </b-container>
</template>

<script>
import api from '@/api';

export default {
    data() {
        return {
            form: {
                MSNV: '',
                HoTenNV: '',
                Password: '',
                ChucVu: 'nhân viên'
            }
        };
    },
    methods: {
        async registerUser() {
            try {
                await api.post('/auth/register', this.form);
                alert('Đăng ký thành công');
                this.$router.push('/login');
            } catch (err) {
                alert('Đăng ký thất bại');
            }
        }
    }
};
</script>
