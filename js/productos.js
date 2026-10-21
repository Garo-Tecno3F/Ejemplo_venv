const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      url: 'http://127.0.0.1:5000/productos',
      productos: [],
      productoSeleccionado: null, // Para el modal
      cargando: true,
      error: false
    };
  },
  methods: {
    obtenerProductos() {
      fetch(this.url)
        .then(res => {
          if (!res.ok) throw new Error('Error al conectar con la API');
          return res.json();
        })
        .then(data => {
          this.productos = data;
          this.cargando = false;
        })
        .catch(err => {
          console.error(err);
          this.error = true;
          this.cargando = false;
        });
    },
    seleccionarProducto(producto) {
      this.productoSeleccionado = producto;
    },
    eliminar(id) {
      if (!confirm(`¿Seguro que querés eliminar el producto #${id}?`)) return;

      fetch(`${this.url}/${id}`, { method: 'DELETE' })
        .then(res => {
          if (!res.ok) throw new Error('Error al eliminar');
          this.productos = this.productos.filter(p => p.id !== id);
        })
        .catch(err => {
          console.error(err);
          alert('No se pudo eliminar el producto.');
        });
    }
  },
  mounted() {
    this.obtenerProductos();
  }
});

// Componente Header
app.component('navegacion', {
  data() {
    return {
      paginaActual: window.location.pathname.split('/').pop() || 'index.html'
    };
  },
  methods: {
    esActivo(nombrePagina) {
      return this.paginaActual === nombrePagina ? 'active' : '';
    },
    esAdminActivo() {
      return ['productos.html', 'producto_nuevo.html', 'producto_editar.html', 'log_delete.html'].includes(this.paginaActual)
        ? 'active'
        : '';
    }
  },
  template: `
    <nav class="navbar navbar-expand-sm navbar-dark mb-4">
      <div class="container">
        <a class="navbar-brand" href="index.html">
          <img class="loguito" src="./img/logo-fix.png" alt="Logo">
        </a>
        <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="collapsibleNavId">
          <ul class="navbar-nav me-auto mt-2 mt-lg-0">
            <li class="nav-item">
              <a class="nav-link" :class="esActivo('index.html')" href="index.html">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" :class="esActivo('catalogo.html')" href="catalogo.html">Catálogo</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" :class="esAdminActivo()" href="#" id="dropdownId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Admin
              </a>
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
        <p class="text-center mb-0">Tecno3F &copy; Python Intermedio</p>
      </div>
    </footer>
  `
});

app.mount('#app');