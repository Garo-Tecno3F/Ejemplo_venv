const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      id: null,
      producto: {
        nombre: '',
        precio: 0,
        stock: 0,
        imagen: ''
      },
      cargando: true,
      enviando: false
    };
  },
  methods: {
    cargarDatos() {
      fetch(`http://127.0.0.1:5000/productos/${this.id}`)
        .then(res => {
          if (!res.ok) throw new Error('No se encontró el producto');
          return res.json();
        })
        .then(data => {
          this.producto = data;
          this.cargando = false;
        })
        .catch(err => {
          console.error(err);
          alert('Error al cargar datos del producto');
          window.location.href = './productos.html';
        });
    },
    modificar() {
      this.enviando = true;
      fetch(`http://127.0.0.1:5000/productos/${this.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.producto)
      })
      .then(res => {
        if (!res.ok) throw new Error('Error al actualizar');
        alert('Producto modificado exitosamente');
        window.location.href = './productos.html';
      })
      .catch(err => {
        console.error(err);
        alert('No pudo modificarse el producto');
      })
      .finally(() => {
        this.enviando = false;
      });
    }
  },
  mounted() {
    const params = new URLSearchParams(window.location.search);
    this.id = params.get('id');
    if (this.id) {
      this.cargarDatos();
    } else {
      alert('ID no especificado');
      window.location.href = './productos.html';
    }
  }
});

// Componente Navegación con tus clases de CSS (loguito, navbar, etc.)
app.component('navegacion', {
  template: `
    <nav class="navbar navbar-expand-sm navbar-light bg-light">
      <div class="container">
        <a class="navbar-brand" href="index.html">
          <img class="loguito" src="./img/logo-fix.png" alt="Logo">
        </a>
        <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId"
          aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="collapsibleNavId">
          <ul class="navbar-nav me-auto mt-2 mt-lg-0">
            <li class="nav-item">
              <a class="nav-link active" href="index.html">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link active" href="catalogo.html">Catálogo</a>
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

// Componente Footer estándar
app.component('piesito', {
  template: `
    <footer>
      <p class="text-center py-3 mb-0">Tecno3F &copy; Programación Web</p>
    </footer>
  `
});

app.mount('#app');