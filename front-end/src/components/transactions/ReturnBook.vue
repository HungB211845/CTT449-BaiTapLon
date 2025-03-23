<template>
    <b-container>
        <h2>Trả sách</h2>
        <b-form @submit.prevent="returnBook">
            <b-form-group label="ID phiếu mượn">
                <b-form-input v-model="id" required />
            </b-form-group>
            <b-form-group label="Ngày trả">
                <b-form-input type="date" v-model="NgayTra" />
            </b-form-group>
            <b-button type="submit" variant="primary">Trả sách</b-button>
        </b-form>
    </b-container>
</template>

<script>
import api from '@/api';

export default {
    data() {
        return {
            id: '',
            NgayTra: ''
        };
    },
    methods: {
        async returnBook() {
            try {
                await api.put(`/tra-sach/${this.id}`, { NgayTra: this.NgayTra });
                alert('Trả sách thành công');
            } catch (err) {
                alert('Trả sách thất bại');
            }
        }
    }
};
</script>
