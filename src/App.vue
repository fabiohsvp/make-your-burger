<!-- 
  App.vue
  Componente raiz da aplicação
  Define a estrutura principal e o roteamento entre páginas
-->
<template>
  <div id="app">
    <!-- Cabeçalho da aplicação -->
    <Navbar :logo="logo" :alt="alt" />
    
    <!-- Container principal para o conteúdo -->
    <div class="main-container">
      <!-- Componente de roteamento - renderiza o componente correspondente à rota atual -->
      <router-view/>
    </div>
    
    <!-- Rodapé da aplicação -->
    <Footer />
  </div>
</template>

<script>
// Importação de componentes
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'

// Definição do componente App
export default {
  name: 'App',
  
  // Estado local do componente
  data() {
    return {
      // Dados para o logo no navbar
      logo: "/img/logo.png",
      alt: "Make Your Burger"
    }
  },
  
  // Registro de componentes filhos
  components: {
    Navbar,
    Footer
  }
}
</script>

<style>
  /* Estilos globais da aplicação */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Helvetica', sans-serif;
  }

  /* Estilo do container principal */
  .main-container {
    margin: 0px;
    min-height: 250px;
    flex: 1;
  }

  /* Layout principal da aplicação */
  #app {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  /* Estilo para links */
  a {
    text-decoration: none;
    color: #222;
    transition: 0.5s;
  }

  /* Efeito hover para links */
  a:hover {
    color: #fcba03;
  }
</style>
