<template>
    <b-container>
        <h2>Thêm độc giả</h2>
        <b-form @submit.prevent="addReader">
            <b-form-group label="Mã độc giả">
                <b-form-input v-model="form.MaDocGia" />
            </b-form-group>
            <b-form-group label="Họ lót">
                <b-form-input v-model="form.HoLot" />
            </b-form-group>
            <b-form-group label="Tên">
                <b-form-input v-model="form.Ten" />
            </b-form-group>
            <b-form-group label="Ngày sinh">
                <b-form-input type="date" v-model="form.NgaySinh" />
            </b-form-group>
            <b-form-group label="Phái">
                <b-form-select v-model="form.Phai" :options="['Nam', 'Nữ']" />
            </b-form-group>
            <b-form-group label="Địa chỉ">
                <b-form-input v-model="form.DiaChi" />
            </b-form-group>
            <b-form-group label="Điện thoại">
                <b-form-input v-model="form.DienThoai" />
            </b-form-group>
            <b-button type="submit" variant="primary">Thêm độc giả</b-button>
        </b-form>
    </b-container>
</template>

<script>
import api from '@/api';

export default {
    data() {
        return {
            form: {
                MaDocGia: '',
                HoLot: '',
                Ten: '',
                NgaySinh: '',
                Phai: 'Nam',
                DiaChi: '',
                DienThoai: ''
            }
        };
    },
    methods: {
        async addReader() {
            try {
                await api.post('/docgia', this.form);
                alert('Thêm độc giả thành công');
                this.$router.push('/readers');
            } catch (err) {
                alert('Thêm độc giả thất bại');
            }
        }
    }
};
</script>
