<template>
    <b-container>
        <h2>Danh sách độc giả</h2>
        <b-table :items="readers" :fields="fields" striped hover></b-table>
    </b-container>
</template>

<script>
import api from '@/api';

export default {
    data() {
        return {
            readers: [],
            fields: [
                { key: 'MaDocGia', label: 'Mã độc giả' },
                { key: 'HoLot', label: 'Họ lót' },
                { key: 'Ten', label: 'Tên' },
                { key: 'DienThoai', label: 'Điện thoại' }
            ]
        };
    },
    async created() {
        try {
            const res = await api.get('/docgia');
            this.readers = res.data;
        } catch (err) {
            alert('Không tải được danh sách độc giả');
        }
    }
};
</script>
