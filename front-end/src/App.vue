<template>
    <div id="app">
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand href="#">Library</b-navbar-brand>
            <b-navbar-toggle target="nav-collapse" />
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item to="/books">Sách</b-nav-item>
                    <b-nav-item v-if="isAdmin" to="/add-book">Thêm sách</b-nav-item>
                    <b-nav-item to="/readers">Độc giả</b-nav-item>
                    <b-nav-item to="/add-reader">Thêm độc giả</b-nav-item>
                    <b-nav-item to="/borrow-book">Mượn</b-nav-item>
                    <b-nav-item to="/return-book">Trả</b-nav-item>
                    <b-nav-item v-if="isAdmin" to="/statistics">Thống kê</b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav class="ml-auto">
                    <dark-mode-toggle class="mr-3" />
                    <!-- Show login/register if not logged in -->
                    <b-nav-item v-if="!isLoggedIn" to="/login">Đăng nhập</b-nav-item>
                    <b-nav-item v-if="!isLoggedIn" to="/register">Đăng ký</b-nav-item>
                    
                    <!-- Show user info and logout if logged in -->
                    <b-nav-item-dropdown v-if="isLoggedIn" right>
                        <template #button-content>
                            <span>{{ userRole }}</span>
                        </template>
                        <b-dropdown-item @click="logout">Đăng xuất</b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <router-view />
    </div>
</template>

<script>
import authService from '@/services/auth.service';
import DarkModeToggle from '@/components/DarkModeToggle.vue';

export default {
    name: 'App',
    components: {
        DarkModeToggle
    },
    data() {
        return {
            isLoggedIn: false,
            userRole: ''
        };
    },
    computed: {
        isAdmin() {
            return this.userRole === 'admin';
        }
    },
    created() {
        this.checkLoginStatus();
    },
    mounted() {
        // Listen for route changes to update auth status
        this.$router.beforeEach((to, from, next) => {
            this.checkLoginStatus();
            next();
        });
    },
    methods: {
        checkLoginStatus() {
            this.isLoggedIn = authService.isLoggedIn();
            const user = authService.getCurrentUser();
            this.userRole = user ? user.chucvu : '';
        },
        logout() {
            authService.logout();
            this.isLoggedIn = false;
            this.userRole = '';
            this.$router.push('/login');
        }
    }
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
