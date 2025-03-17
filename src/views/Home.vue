<!-- 
  Home.vue
  Página inicial da aplicação
  Contém banner e formulário para criação de hambúrgueres
-->
<template>
  <Banner />
  <div class="main-container">
    <h1>Monte o seu Hamburguer</h1>
    <BurgerForm />
  </div>
</template>

<script>
import Banner from "../components/Banner.vue"
import BurgerForm from "../components/BurgerForm.vue"

// Definição do componente Home
export default {
  name: "Home",
  components: {
    Banner,
    BurgerForm
  }
}

</script>

<style scoped>

  .main-container {
    background-color: #ffebb4;
  }
  .main-container h1 {
    background-color: #ffbb00;
    font-size: 2.5rem;
    padding: 50px;
    text-align: center;
    text-transform: uppercase;
    
  }
</style>
