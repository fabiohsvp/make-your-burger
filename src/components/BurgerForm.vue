<!-- 
  BurgerForm.vue
  Formulário para criação de pedidos de hambúrgueres
  Permite ao usuário selecionar ingredientes e enviar pedidos
-->
<template>
    <!-- Componente de mensagem para feedback ao usuário -->
    <Message :msg="msg" v-show="msg" type="burger-theme" />
    
    <!-- Exibe spinner de carregamento enquanto os ingredientes são carregados -->
    <LoadingSpinner v-if="loading" />
    
    <!-- Formulário principal -->
    <div v-else>
        <form action="" id="burger-form" @submit="createBurger">
            <!-- Campo para nome do cliente -->
            <div class="input-container">
                <label for="nome">Nome do cliente: </label>
                <input 
                  type="text" 
                  id="nome" 
                  name="name" 
                  v-model.trim="nome" 
                  placeholder="Digite o seu nome."
                  :class="{ 'input-error': submitted && !nome }"
                >
                <small v-if="submitted && !nome" class="error-message">Nome é obrigatório</small>
            </div>
            
            <!-- Seleção de tipo de pão -->
            <div class="input-container">
                <label for="pao">Escolha o pão</label>
                <select 
                  name="pao" 
                  id="pao" 
                  v-model="pao"
                  :class="{ 'input-error': submitted && !pao }"
                >
                    <option value="">Selecione o seu pão: </option>
                    <option v-for="pao in paes" :key="pao.id" :value="pao.tipo">{{ pao.tipo }}</option>
                </select>
                <small v-if="submitted && !pao" class="error-message">Escolha um tipo de pão</small>
            </div>
            
            <!-- Seleção de tipo de carne -->
            <div class="input-container">
                <label for="carne">Escolha a carne do seu Burger: </label>
                <select 
                  name="carne" 
                  id="carne" 
                  v-model="carne"
                  :class="{ 'input-error': submitted && !carne }"
                >
                    <option value="">Selecione o tipo de carne</option>
                    <option v-for="carne in carnes" :key="carne.id" :value="carne.tipo">{{ carne.tipo }}</option>
                </select>
                <small v-if="submitted && !carne" class="error-message">Escolha um tipo de carne</small>
            </div>
            
            <!-- Seleção de opcionais (checkboxes) -->
            <div id="opcionais-container" class="input-container">
                <label id="opcionais-title" for="opcionais">Selecione os opcionais: </label>
                <div class="checkbox-container" v-for="opcional in opcionaisdata" :key="opcional.id">
                    <input type="checkbox" name="opcionais" v-model="opcionais" :value="opcional.tipo">
                    <span>{{ opcional.tipo }}</span>
                </div>
            </div>
            
            <!-- Botão de envio do formulário -->
            <div class="input-container">
                <input 
                  type="submit" 
                  class="submit-btn" 
                  value="Criar meu Burger!" 
                  :disabled="isSubmitting"
                >
                <LoadingSpinner v-if="isSubmitting" message="" class="inline-spinner" />
            </div>
        </form>
    </div>
</template>

<script>
// Importação de componentes
import Message from "./Message.vue"
import LoadingSpinner from "./LoadingSpinner.vue"

// Definição do componente BurgerForm
export default {
    name: "BurgerForm",
    
    // Estado local do componente
    data() {
        return {
            paes: null,           // Lista de tipos de pães disponíveis
            carnes: null,         // Lista de tipos de carnes disponíveis
            opcionaisdata: null,  // Lista de opcionais disponíveis
            nome: null,           // Nome do cliente
            pao: null,            // Pão selecionado
            carne: null,          // Carne selecionada
            opcionais: [],        // Opcionais selecionados
            msg: null,            // Mensagem de feedback
            submitted: false,     // Controle de estado de submissão
            loading: true,        // Controle de estado de carregamento
            isSubmitting: false   // Controle de estado durante o envio
        }
    },
    
    // Métodos do componente
    methods: {
        // Busca os ingredientes disponíveis da API
        async getIngredientes() {
            this.loading = true;
            try {
                const req = await fetch("http://localhost:3000/ingredientes")
                const data = await req.json()

                // Atualiza o estado com os dados recebidos
                this.paes = data.paes
                this.carnes = data.carnes
                this.opcionaisdata = data.opcionais
            } catch (error) {
                console.error("Erro ao carregar ingredientes:", error)
                this.msg = "Erro ao carregar ingredientes. Tente novamente mais tarde."
                setTimeout(() => {
                    this.msg = null
                }, 3000)
            } finally {
                this.loading = false;
            }
        },
        
        // Cria um novo pedido de hambúrguer
        async createBurger(e) {
            e.preventDefault()
            this.submitted = true
            
            // Validação dos campos obrigatórios
            if(!this.nome || !this.pao || !this.carne) {
                this.msg = "Por favor, preencha todos os campos obrigatórios!"
                setTimeout(() => {
                    this.msg = null
                }, 3000)
                return // Interrompe a execução se a validação falhar
            }

            this.isSubmitting = true;
            
            try {
                // Prepara os dados para envio
                const data = {
                    nome: this.nome,
                    pao: this.pao,
                    carne: this.carne,
                    opcionais: Array.from(this.opcionais),
                    status: "Solicitado",
                }

                const dataJson = JSON.stringify(data);

                // Requisição POST para a API
                const req = await fetch("http://localhost:3000/burgers", {
                    method: "POST",
                    headers: { "Content-Type": "application/json", },
                    body: dataJson,
                });

                const res = await req.json();

                // Feedback de sucesso
                this.msg = `Pedido Nº ${res.id} realizado com sucesso!`
                setTimeout(() => {
                    this.msg = null;
                }, 3000);

                // Resetar formulário
                this.nome = "";
                this.pao = "";
                this.carne = "";
                this.opcionais = [];
                this.submitted = false; // Reseta estado de validação
            } catch (error) {
                console.error("Erro ao criar burger:", error)
                this.msg = "Erro ao criar o pedido. Tente novamente mais tarde."
                setTimeout(() => {
                    this.msg = null
                }, 3000)
            } finally {
                this.isSubmitting = false;
            }
        }
    },
    
    // Ciclo de vida - executa quando o componente é montado
    mounted() {
        this.getIngredientes()
    },
    
    // Registro de componentes filhos
    components: {
        Message,
        LoadingSpinner
    }
}
</script>

<style scoped>
    /* Estilo do formulário */
    #burger-form {
        padding: 50px;
        max-width: 400px;
        margin: 0 auto;
    }

    /* Estilo dos containers de input */
    .input-container {
        display: flex;
        flex-direction: column;
        margin-bottom: 20px;
    }

    /* Estilo das labels */
    label {
        font-weight: bold;
        margin-bottom: 15px;
        color: #222;
        padding: 5px 10px;
        border-left: 4px solid #fcba03;
    }

    /* Estilo dos inputs e selects */
    input, select {
        padding: 5px 10px;
        width: 300px;
    }

    /* Estilo do container de opcionais */
    #opcionais-container {
        flex-direction: row;
        flex-wrap: wrap;
    }

    /* Estilo do título de opcionais */
    #opcionais-title {
        width: 100%;
    }

    /* Estilo dos containers de checkbox */
    .checkbox-container {
        display: flex;
        align-items: flex-start;
        width: 50%;
        margin-bottom: 20px;
    }

    /* Ajuste de largura para checkbox e texto */
    .checkbox-container span,
    .checkbox-container input {
        width: auto;
    }

    /* Estilo do texto dos checkboxes */
    .checkbox-container span {
        margin-left: 6px;
        font-weight: bold;
    }

    /* Estilo do botão de envio */
    .submit-btn {
        background-color: #222;
        color: #fcba03;
        font-weight: bold;
        border:  2px solid #222;
        padding: 10px;
        font-size: 16px;
        margin: 0 auto;
        cursor: pointer;
        transition: .5s;
    }

    /* Efeito hover do botão de envio */
    .submit-btn:hover {
        background-color: transparent;
        color: #222;
    }

    /* Estilo para inputs com erro */
    .input-error {
        border: 1px solid #d8000c;
        background-color: #fff0f0;
    }
    
    /* Estilo para mensagens de erro */
    .error-message {
        color: #d8000c;
        font-size: 12px;
        margin-top: 5px;
    }
    
    /* Estilo para spinner inline */
    .inline-spinner {
        display: inline-block;
        margin-left: 10px;
    }
    
    /* Ajustes para spinner inline */
    .inline-spinner .spinner {
        width: 20px;
        height: 20px;
        margin: 0;
    }
    
    /* Ajuste de padding para container de spinner inline */
    .inline-spinner .loading-container {
        padding: 0;
    }
    
    /* Estilo para botão desabilitado */
    .submit-btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
</style>