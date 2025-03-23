<template>
  <div class="dark-mode-toggle">
    <b-form-checkbox
      v-model="darkMode"
      switch
      @change="toggleDarkMode"
    >
      <i :class="darkMode ? 'fas fa-moon' : 'fas fa-sun'"></i>
      {{ darkMode ? 'Chế độ tối' : 'Chế độ sáng' }}
    </b-form-checkbox>
  </div>
</template>

<script>
export default {
  name: 'DarkModeToggle',
  data() {
    return {
      darkMode: false
    };
  },
  created() {
    // Check if user previously enabled dark mode
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode === 'true') {
      this.darkMode = true;
      this.applyDarkMode(true);
    }
  },
  methods: {
    toggleDarkMode(value) {
      this.applyDarkMode(value);
      localStorage.setItem('darkMode', value);
    },
    applyDarkMode(isDark) {
      const body = document.body;
      if (isDark) {
        body.classList.add('dark-mode');
      } else {
        body.classList.remove('dark-mode');
      }
    }
  }
};
</script>

<style>
.dark-mode-toggle {
  padding: 10px;
}

/* Dark mode CSS variables */
:root {
  --bg-color: #ffffff;
  --text-color: #212529;
  --border-color: #dee2e6;
  --input-bg: #ffffff;
  --card-bg: #ffffff;
}

.dark-mode {
  --bg-color: #343a40;
  --text-color: #f8f9fa;
  --border-color: #495057;
  --input-bg: #212529;
  --card-bg: #1d2124;
}

/* Apply variables to elements */
body.dark-mode {
  background-color: var(--bg-color);
  color: var(--text-color);
}

body.dark-mode .card,
body.dark-mode .modal-content {
  background-color: var(--card-bg);
  color: var(--text-color);
}

body.dark-mode .form-control {
  background-color: var(--input-bg);
  color: var(--text-color);
  border-color: var(--border-color);
}

body.dark-mode .table {
  color: var(--text-color);
}
</style>
