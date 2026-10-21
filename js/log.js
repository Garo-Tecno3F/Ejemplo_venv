const { createApp } = Vue;

const app = createApp({
  data() {
    return {
      url: 'http://127.0.0.1:5000/log',
      logs: [],
      cargando: true,
      error: false
    };
  },
  methods: {
    obtenerLogs() {
      fetch(this.url)
        .then(res => {
          if (!res.ok) {
            throw new Error('Error al conectar con la API de logs');
          }
          return res.json();
        })
        .then(data => {
          // Invertimos la lista para mostrar primero las operaciones más recientes
          this.logs = data.reverse();
          this.cargando = false;
        })
        .catch(err => {
          console.error('Error cargando logs:', err);
          this.error = true;
          this.cargando = false;
        });
    },
    formatearFecha(stringFecha) {
      if (!stringFecha) return '-';
      const fecha = new Date(stringFecha);
      if (isNaN(fecha.getTime())) return stringFecha;
      return fecha.toLocaleString('es-AR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });
    },
    badgeClass(operacion) {
      if (operacion === 'Alta') return 'badge-op badge-alta';
      if (operacion === 'Modificación') return 'badge-op badge-modificacion';
      if (operacion === 'Baja') return 'badge-op badge-baja';
      return 'badge-op bg-secondary text-white';
    }
  },
  mounted() {
    this.obtenerLogs();
  }
});

// Componente Header
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