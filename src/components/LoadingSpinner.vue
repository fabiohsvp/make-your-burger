<!-- 
  LoadingSpinner.vue
  Componente reutilizável para indicar carregamento
  Exibe um spinner animado e opcionalmente uma mensagem
-->
<template>
  <div class="loading-container">
    <div class="spinner"></div>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
// Definição do componente LoadingSpinner
export default {
  name: "LoadingSpinner",
  
  // Propriedades recebidas do componente pai
  props: {
    message: {
      type: String,
      default: "Carregando..." // Mensagem padrão
    }
  }
}
</script>

<style scoped>
/* Estilo do container de loading */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

/* Estilo do spinner */
.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border-left-color: #fcba03; /* Cor do tema */
  animation: spin 1s linear infinite;
  margin-bottom: 10px;
}

/* Animação de rotação */
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>