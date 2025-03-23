<template>
    <b-container>
        <h2>Sửa thông tin sách</h2>
        <b-form @submit.prevent="updateBook">
            <b-form-group label="Mã sách">
                <b-form-input v-model="form.MaSach" required disabled />
            </b-form-group>
            <b-form-group label="Tên sách">
                <b-form-input v-model="form.TenSach" required />
            </b-form-group>
            <b-form-group label="Đơn giá">
                <b-form-input type="number" v-model.number="form.DonGia" />
            </b-form-group>
            <b-form-group label="Số quyển">
                <b-form-input type="number" v-model.number="form.SoQuyen" />
            </b-form-group>
            <b-form-group label="Năm xuất bản">
                <b-form-input type="number" v-model.number="form.NamXuatBan" />
            </b-form-group>
            <b-form-group label="Mã NXB">
                <b-form-input v-model="form.MaNXB" required />
            </b-form-group>
            <b-form-group label="Tác giả">
                <b-form-input v-model="form.TacGia" />
            </b-form-group>
            <b-form-group label="Hình ảnh (URL)">
                <b-form-input v-model="form.HinhAnh" placeholder="Nhập URL hoặc để trống" />
            </b-form-group>
            <b-form-group label="Upload file mới">
                <b-form-file @change="handleFile" />
            </b-form-group>
            <div v-if="form.HinhAnh" class="mb-3">
                <p>Hình ảnh hiện tại:</p>
                <img :src="displayImageUrl" alt="Book cover" style="max-height: 150px;" />
            </div>
            <b-button type="submit" variant="primary">Cập nhật sách</b-button>
            <b-button variant="secondary" class="ml-2" @click="$router.push('/books')">Huỷ</b-button>
        </b-form>
    </b-container>
</template>

<script>
import api from '@/api';
import authService from '@/services/auth.service';

export default {
    data() {
        return {
            form: {
                MaSach: '',
                TenSach: '',
                DonGia: 0,
                SoQuyen: 0,
                NamXuatBan: 2023,
                MaNXB: '',
                TacGia: '',
                HinhAnh: ''
            },
            file: null
        };
    },
    computed: {
        displayImageUrl() {
            if (this.form.HinhAnh && this.form.HinhAnh.startsWith('http')) {
                return this.form.HinhAnh;
            } else if (this.form.HinhAnh) {
                return `http://localhost:3000${this.form.HinhAnh}`;
            }
            return '';
        }
    },
    async created() {
        // Check if user is admin
        const user = authService.getCurrentUser();
        if (!user || user.chucvu !== 'admin') {
            alert('Bạn không có quyền chỉnh sửa sách');
            this.$router.push('/books');
            return;
        }

        // Get book ID from route
        const bookId = this.$route.params.id;
        if (!bookId) {
            alert('Không tìm thấy mã sách');
            this.$router.push('/books');
            return;
        }

        try {
            // Fetch book details
            const response = await api.get(`/sach?MaSach=${bookId}`);
            if (!response.data || response.data.length === 0) {
                alert('Không tìm thấy thông tin sách');
                this.$router.push('/books');
                return;
            }

            const book = response.data[0];
            this.form = {
                MaSach: book.MaSach,
                TenSach: book.TenSach,
                DonGia: book.DonGia || 0,
                SoQuyen: book.SoQuyen || 0,
                NamXuatBan: book.NamXuatBan || new Date().getFullYear(),
                MaNXB: book.MaNXB || '',
                TacGia: book.TacGia || '',
                HinhAnh: book.HinhAnh || ''
            };
        } catch (err) {
            console.error('Error fetching book details:', err);
            alert('Không thể tải thông tin sách');
            this.$router.push('/books');
        }
    },
    methods: {
        handleFile(e) {
            this.file = e.target.files[0];
        },
        async updateBook() {
            try {
                // Check required fields
                if (!this.form.MaSach || !this.form.TenSach || !this.form.MaNXB) {
                    alert('Vui lòng điền đầy đủ các trường bắt buộc: Mã sách, Tên sách, Mã NXB');
                    return;
                }

                // If we have a file, use FormData, otherwise send JSON
                if (this.file) {
                    const formData = new FormData();
                    for (const key in this.form) {
                        // Skip HinhAnh when uploading a new file
                        if (key === 'HinhAnh' && this.file) continue;
                        
                        // Ensure numbers are properly handled
                        if (['DonGia', 'SoQuyen', 'NamXuatBan'].includes(key)) {
                            formData.append(key, Number(this.form[key]));
                        } else {
                            formData.append(key, this.form[key]);
                        }
                    }
                    formData.append('HinhAnh', this.file);
                    
                    await api.put(`/sach/${this.form.MaSach}`, formData, {
                        headers: { 'Content-Type': 'multipart/form-data' }
                    });
                } else {
                    // Convert string numbers to actual numbers
                    const formData = {
                        ...this.form,
                        DonGia: Number(this.form.DonGia),
                        SoQuyen: Number(this.form.SoQuyen),
                        NamXuatBan: Number(this.form.NamXuatBan)
                    };
                    
                    await api.put(`/sach/${this.form.MaSach}`, formData);
                }
                
                alert('Cập nhật sách thành công');
                this.$router.push('/books');
            } catch (err) {
                console.error('Error updating book:', err);
                let errorMessage = 'Cập nhật sách thất bại';
                
                if (err.response) {
                    console.log('Error response:', err.response.data);
                    errorMessage += ': ' + (err.response.data.message || err.response.statusText);
                }
                
                alert(errorMessage);
            }
        }
    }
};
</script>
