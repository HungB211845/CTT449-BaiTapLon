// front-end/src/router/index.js
import Vue from 'vue';
import Router from 'vue-router';

// Auth
import Login from '@/components/auth/Login.vue';
import Register from '@/components/auth/Register.vue';
// Books
import BookList from '@/components/books/BookList.vue';
import AddBook from '@/components/books/AddBook.vue';
import EditBook from '@/components/books/EditBook.vue';
// Readers
import ReaderList from '@/components/readers/ReaderList.vue';
import AddReader from '@/components/readers/AddReader.vue';
// Transactions
import BorrowBook from '@/components/transactions/BorrowBook.vue';
import ReturnBook from '@/components/transactions/ReturnBook.vue';
// Statistics
import Statistics from '@/components/Statistics.vue';
// Role guard
import { roleGuard, routeAuth } from '@/utils/role-guard';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  routes: [
    { path: '/login', component: Login },
    { path: '/register', component: Register },
    { path: '/books', component: BookList },
    { path: '/add-book', component: AddBook },
    { 
      path: '/edit-book/:id', 
      component: EditBook, 
      meta: routeAuth(true, ['admin'])
    },
    { path: '/readers', component: ReaderList },
    { path: '/add-reader', component: AddReader },
    { path: '/borrow-book', component: BorrowBook },
    { path: '/return-book', component: ReturnBook },
    { path: '/statistics', component: Statistics },
    { path: '/', redirect: '/books' },
    { path: '/unauthorized', component: { template: '<div>Không có quyền truy cập</div>' } }
  ]
});

// Add navigation guard
router.beforeEach(roleGuard(['admin']));

export default router;
