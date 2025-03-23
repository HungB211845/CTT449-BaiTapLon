<template>
    <b-container>
        <h2>Mượn sách</h2>
        <b-form @submit.prevent="borrowBook">
            <b-form-group label="Mã độc giả">
                <b-form-input v-model="form.MaDocGia" required />
            </b-form-group>
            <b-form-group label="Mã sách">
                <b-form-input v-model="form.MaSach" required />
            </b-form-group>
            <b-form-group label="Ngày mượn">
                <b-form-input type="date" v-model="form.NgayMuon" />
            </b-form-group>
            <b-button type="submit" variant="primary">Mượn sách</b-button>
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
                MaSach: '',
                NgayMuon: ''
            }
        };
    },
    methods: {
        async borrowBook() {
            try {
                await api.post('/muon-sach', this.form);
                alert('Mượn sách thành công');
            } catch (err) {
                alert('Mượn sách thất bại');
            }
        }
    }
};
</script>
