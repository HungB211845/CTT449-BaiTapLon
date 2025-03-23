<template>
    <b-container>
        <h2>Thống kê</h2>
        <h3>Sách mượn nhiều</h3>
        <b-table :items="sachMuonNhieu" :fields="sachFields" striped hover></b-table>
        <h3>Độc giả tích cực</h3>
        <b-table :items="docGiaTichCuc" :fields="docGiaFields" striped hover></b-table>
    </b-container>
</template>

<script>
import api from '@/api';

export default {
    data() {
        return {
            sachMuonNhieu: [],
            docGiaTichCuc: [],
            sachFields: [
                { key: '_id', label: 'Mã sách' },
                { key: 'soLanMuon', label: 'Số lần mượn' }
            ],
            docGiaFields: [
                { key: '_id', label: 'Mã độc giả' },
                { key: 'soLanMuon', label: 'Số lần mượn' }
            ]
        };
    },
    async created() {
        try {
            const res = await api.get('/thongke');
            this.sachMuonNhieu = res.data.sachMuonNhieu;
            this.docGiaTichCuc = res.data.docGiaTichCuc;
        } catch (err) {
            alert('Không lấy được thống kê');
        }
    }
};
</script>
