<template>
    <div id="app">
        <b-navbar toggleable="lg" type="dark" variant="dark">
            <b-navbar-brand href="#">Library</b-navbar-brand>
            <b-navbar-toggle target="nav-collapse" />
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item to="/books">Sách</b-nav-item>
                    <b-nav-item to="/add-book">Thêm sách</b-nav-item>
                    <b-nav-item to="/readers">Độc giả</b-nav-item>
                    <b-nav-item to="/add-reader">Thêm độc giả</b-nav-item>
                    <b-nav-item to="/borrow-book">Mượn</b-nav-item>
                    <b-nav-item to="/return-book">Trả</b-nav-item>
                    <b-nav-item to="/statistics">Thống kê</b-nav-item>
                </b-navbar-nav>
                <b-navbar-nav class="ml-auto">
                    <b-nav-item to="/login">Đăng nhập</b-nav-item>
                    <b-nav-item to="/register">Đăng ký</b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
        <router-view />
    </div>
</template>

<script>
export default {
    name: 'App'
};
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
