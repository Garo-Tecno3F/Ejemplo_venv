const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      producto: {
        nombre: '',
        precio: null,
        stock: null,
        imagen: ''
      },
      enviando: false
    };
  },
  methods: {
    guardar() {
      this.enviando = true;
      fetch('http://127.0.0.1:5000/productos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.producto)
      })
      .then(res => {
        if (!res.ok) throw new Error('Error al guardar el producto');
        alert('Producto agregado exitosamente');
        window.location.href = './productos.html';
      })
      .catch(err => {
        console.error(err);
        alert('No se pudo guardar el producto');
      })
      .finally(() => {
        this.enviando = false;
      });
    }
  }
});

// Componente Header Oscuro
app.component('navegacion', {
  template: `
    <nav class="navbar navbar-expand-sm navbar-dark mb-4">
      <div class="container">
        <a class="navbar-brand" href="index.html">
          <img class="loguito" src="./img/logo-fix.png" alt="Logo">
        </a>
        <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="collapsibleNavId">
          <ul class="navbar-nav me-auto mt-2 mt-lg-0">
            <li class="nav-item">
              <a class="nav-link" href="index.html">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="catalogo.html">Catálogo</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="dropdownId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Admin</a>
              <div class="dropdown-menu" aria-labelledby="dropdownId">
                <a class="dropdown-item" href="productos.html">Productos</a>
                <a class="dropdown-item" href="log_delete.html">Log</a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  `
});

// Componente Footer
app.component('piesito', {
  template: `
    <footer>
      <div class="container py-3">
        <p class="text-center mb-0">Tecno3F &copy; Programación Web</p>
      </div>
    </footer>
  `
});

app.mount('#app');