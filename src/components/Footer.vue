<!-- 
  Footer.vue
  Rodapé da aplicação
  Exibe informações de copyright e ano atual
-->
<template>
  <div id="footer">
    <p>Make Your Burger &copy; {{ year }}</p>
  </div>
</template>

<script>
// Definição do componente Footer
export default {
  name: "Footer",
  
  // Propriedades computadas
  computed: {
    // Retorna o ano atual para o copyright
    year() {
      return new Date().getFullYear();
    }
  }
}
</script>

<style scoped>
  /* Estilo do rodapé */
  #footer {
    height: 200px;
    background-color: #222;
    border-top: 4px solid #111;
    color: #fcba03;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: auto;
  }
</style>