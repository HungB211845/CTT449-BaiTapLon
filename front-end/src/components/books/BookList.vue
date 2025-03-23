<template>
    <b-container>
        <h2>Danh sách sách</h2>
        <b-table :items="books" :fields="fields" striped hover></b-table>
    </b-container>
</template>

<script>
import api from '@/api';

export default {
    data() {
        return {
            books: [],
            fields: [
                { key: 'MaSach', label: 'Mã sách' },
                { key: 'TenSach', label: 'Tên sách' },
                { key: 'TacGia', label: 'Tác giả' },
                { key: 'HinhAnh', label: 'Hình ảnh' }
            ]
        };
    },
    async created() {
        try {
            const res = await api.get('/sach');
            // Thêm prefix http://localhost:3000 cho HinhAnh
            this.books = res.data.map(b => ({
                ...b,
                HinhAnh: b.HinhAnh ? `http://localhost:3000${b.HinhAnh}` : ''
            }));
        } catch (err) {
            alert('Không tải được danh sách sách');
        }
    }
};
</script>
