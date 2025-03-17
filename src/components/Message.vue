<!-- 
  Message.vue
  Componente reutilizável para exibir mensagens de feedback ao usuário
  Suporta diferentes tipos de mensagens (sucesso, erro, aviso)
-->
<template>
  <div class="message-container" :class="type">
    <p>{{ msg }}</p>
  </div>
</template>

<script>
// Definição do componente Message
export default {
  name: "Message",
  
  // Propriedades recebidas do componente pai
  props: {
    msg: String,         // Texto da mensagem
    type: {              // Tipo da mensagem (afeta o estilo)
      type: String,
      default: 'success' // Tipo padrão é sucesso
    }
  }
}
</script>

<style scoped>
  /* Estilo base do container de mensagem */
  .message-container {
    padding: 10px;
    border-radius: 5px;
    margin: 20px auto;
    max-width: 600px;
    text-align: center;
    font-weight: bold;
    transition: 0.3s;
  }

  /* Estilo para mensagens de sucesso */
  .success {
    background-color: #dff2bf;
    color: #4f8a10;
    border: 1px solid #4f8a10;
  }

  /* Estilo para mensagens de erro */
  .error {
    background-color: #ffbaba;
    color: #d8000c;
    border: 1px solid #d8000c;
  }

  /* Estilo para mensagens de aviso */
  .warning {
    background-color: #feefb3;
    color: #9f6000;
    border: 1px solid #9f6000;
  }

  /* Estilo específico para o tema do burger */
  .burger-theme {
    background-color: #222;
    color: #fcba03;
    border: 2px solid #fcba03;
  }
</style>