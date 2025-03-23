<template>
    <b-container>
        <h2>Danh sách sách</h2>
        <b-table :items="books" :fields="fields" striped hover>
            <!-- Template cho cột HinhAnh -->
            <template #cell(HinhAnh)="data">
                <img v-if="data.value" :src="formatImageUrl(data.value)" alt="Book cover" style="max-height: 50px;" />
            </template>
            
            <!-- Template cho cột actions -->
            <template #cell(actions)="row">
                <div v-if="isAdmin">
                    <b-button size="sm" variant="warning" class="mr-1" @click="editBook(row.item)">Sửa</b-button>
                    <b-button size="sm" variant="danger" @click="deleteBook(row.item)">Xoá</b-button>
                </div>
            </template>
        </b-table>
    </b-container>
</template>

<script>
import api from '@/api';
import authService from '@/services/auth.service';

export default {
    data() {
        return {
            books: [],
            fields: [
                { key: 'MaSach', label: 'Mã sách' },
                { key: 'TenSach', label: 'Tên sách' },
                { key: 'TacGia', label: 'Tác giả' },
                { key: 'HinhAnh', label: 'Hình ảnh' },
                { key: 'actions', label: 'Hành động' }
            ],
            isAdmin: false
        };
    },
    async created() {
        await this.loadBooks();
        this.checkAdminRole();
    },
    methods: {
        checkAdminRole() {
            const user = authService.getCurrentUser();
            this.isAdmin = user && user.chucvu === 'admin';
            console.log('Current user role:', user && user.chucvu);
            console.log('Is admin:', this.isAdmin);
        },
        
        async loadBooks() {
            try {
                const res = await api.get('/sach');
                this.books = res.data;
                console.log('Books loaded:', this.books.length);
            } catch (err) {
                console.error('Error loading books:', err);
                this.$bvToast.toast('Không tải được danh sách sách', {
                    title: 'Lỗi',
                    variant: 'danger',
                    solid: true
                });
            }
        },
        
        formatImageUrl(imageUrl) {
            if (!imageUrl) return '';
            
            if (imageUrl.startsWith('http')) {
                return imageUrl;
            } else {
                return `http://localhost:3000${imageUrl}`;
            }
        },
        
        editBook(book) {
            this.$router.push(`/edit-book/${book.MaSach}`);
        },
        
        async deleteBook(book) {
            // Log the book object completely to debug
            console.log("Book object for deletion:", book);
            
            if (!confirm(`Bạn có chắc muốn xoá sách "${book.TenSach}" (Mã: ${book.MaSach})?`)) return;
            
            // Validate book.MaSach exists and is not empty
            if (!book.MaSach) {
                console.error("MaSach field is missing");
                this.$bvToast.toast('Không thể xoá sách: Mã sách không tồn tại', {
                    title: 'Lỗi dữ liệu',
                    variant: 'danger',
                    solid: true
                });
                return;
            }
            
            // Enhanced validation for MaSach
            const originalMaSach = book.MaSach;
            const bookId = typeof originalMaSach === 'string' ? originalMaSach.trim() : String(originalMaSach).trim();
            
            // Check for whitespace or case differences
            if (originalMaSach !== bookId) {
                console.warn(`⚠️ MaSach contains whitespace. Original: "${originalMaSach}", Cleaned: "${bookId}"`);
            }
            
            console.log(`🔍 MaSach validation checks:`);
            console.log(`  - Original value: "${originalMaSach}"`);
            console.log(`  - Trimmed value: "${bookId}"`);
            console.log(`  - Character codes: [${Array.from(bookId).map(c => c.charCodeAt(0))}]`);
            
            try {
                // Make sure we're using the correct URL format with the book ID
                const deleteUrl = `/sach/${bookId}`;
                console.log(`📤 Sending DELETE request to: ${api.defaults.baseURL}${deleteUrl}`);
                const response = await api.delete(deleteUrl);
                console.log("Delete response:", response.data);
                
                this.$bvToast.toast('Xoá sách thành công', {
                    title: 'Thành công',
                    variant: 'success',
                    solid: true
                });
                
                // Reload book list
                await this.loadBooks();
            } catch (err) {
                // ...existing error handling code...
                
                // Add more detailed 404 error information
                if (err.response && err.response.status === 404) {
                    console.error('Book not found in database with ID:', book.MaSach);
                    console.log('Book object being deleted:', book);
                    
                    this.$bvToast.toast(`Không tìm thấy sách với mã "${book.MaSach}" trong cơ sở dữ liệu. Vui lòng làm mới trang và thử lại.`, {
                        title: 'Lỗi không tìm thấy sách',
                        variant: 'warning',
                        solid: true
                    });
                }
                
                // Log detailed error information
                if (err.response) {
                    // Server responded with a status code outside of 2xx range
                    console.error('Error response data:', err.response.data);
                    console.error('Error response status:', err.response.status);
                    console.error('Error response headers:', err.response.headers);
                    
                    const errorMessage = err.response.data.message || 
                        `Lỗi máy chủ: ${err.response.status}`;
                    
                    this.$bvToast.toast(`Xoá sách thất bại: ${errorMessage}`, {
                        title: 'Lỗi',
                        variant: 'danger',
                        solid: true
                    });
                } else if (err.request) {
                    // Request was made but no response received
                    console.error('Error request:', err.request);
                    this.$bvToast.toast('Xoá sách thất bại: Không nhận được phản hồi từ máy chủ', {
                        title: 'Lỗi kết nối',
                        variant: 'danger',
                        solid: true
                    });
                } else {
                    // Something else happened while setting up the request
                    console.error('Error message:', err.message);
                    this.$bvToast.toast(`Xoá sách thất bại: ${err.message}`, {
                        title: 'Lỗi',
                        variant: 'danger',
                        solid: true
                    });
                }
                
                // Check authentication status
                if (err.response && err.response.status === 401) {
                    console.warn('Authentication issue detected');
                    const token = localStorage.getItem('token');
                    console.log('Current token exists:', !!token);
                    
                    this.$bvToast.toast('Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại', {
                        title: 'Lỗi xác thực',
                        variant: 'warning',
                        solid: true
                    });
                }
            }
        }
    }
};
</script>

<style scoped>
.table-responsive {
    overflow-x: auto;
}
</style>
