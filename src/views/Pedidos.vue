<!-- 
  Pedidos.vue
  Página de gerenciamento de pedidos
  Exibe o dashboard com todos os pedidos realizados
-->
<template>
  <div class="pedidos">
    <h1>Gerenciar pedidos:</h1>
    <Dashboard />
  </div>
</template>

<script>
// Importação de componentes
import Dashboard from '@/components/Dashboard.vue'

// Definição do componente Pedidos
export default {
  name: 'Pedidos',
  
  // Registro de componentes filhos
  components: {
    Dashboard
  }
}
</script>

<style scoped>
  /* Estilo do título da página */
  .pedidos h1 {
    text-align: center;
    margin-bottom: 30px;
    color: #222;
    background-color: #fcba03;
    padding: 50px;
  }
</style>