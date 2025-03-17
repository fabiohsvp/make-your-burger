<!-- 
  Dashboard.vue
  Componente principal para gerenciamento de pedidos de hambúrgueres
  Permite visualizar, atualizar status e excluir pedidos
-->
<template>
  <div id="burger-table">
    <!-- Componente de mensagem para feedback ao usuário -->
    <Message :msg="msg" v-show="msg" type="burger-theme" />
    
    <!-- Exibe spinner de carregamento enquanto os dados são buscados -->
    <LoadingSpinner v-if="!burgers" message="Carregando pedidos..." />
    
    <!-- Tabela de pedidos (exibida apenas quando há pedidos) -->
    <div v-else-if="burgers.length > 0">
        <!-- Cabeçalho da tabela -->
        <div id="burger-table-heading">
            <div class="order-id">#:</div>
            <div>Cliente:</div>
            <div>Pão</div>
            <div>Carne:</div>
            <div>Opcionais</div>
            <div>Ações:</div>
        </div>
        
        <!-- Linhas da tabela com os dados dos pedidos -->
        <div id="burger-table-rows">
            <div class="burger-table-row" v-for="burger in orderedBurgers" :key="burger.id">
                <!-- Informações do pedido -->
                <div class="order-number">{{ burger.id }}</div>
                <div>{{ burger.nome || 'Sem nome' }}</div>
                <div>{{ burger.pao || 'Não especificado' }}</div>
                <div>{{ burger.carne || 'Não especificado' }}</div>
                
                <!-- Lista de opcionais do pedido -->
                <div>
                    <ul v-if="burger.opcionais && burger.opcionais.length > 0">
                        <li v-for="(opcional, index) in burger.opcionais" :key="index">{{ opcional }}</li>
                    </ul>
                    <p v-else>Sem opcionais</p>
                </div>
                
                <!-- Controles de ação: atualizar status e excluir -->
                <div>
                    <select name="status" class="status" @change="updateBurger($event, burger.id)">
                        <option value="">Selecione</option>
                        <option v-for="s in status" :key="s.id" :value="s.tipo" :selected="burger.status == s.tipo">
                            {{ s.tipo }}
                        </option>
                    </select>
                    <button class="delete-btn" @click="deleteBurger(burger.id)">Cancelar</button>
                </div>
            </div>
        </div>
    </div>
    
    <!-- Mensagem exibida quando não há pedidos -->
    <div v-else class="no-burgers">
        <p>Não há pedidos no momento!</p>
    </div>
  </div>
</template>

<script>
// Importação de componentes
import Message from "./Message.vue"
import LoadingSpinner from "./LoadingSpinner.vue"

// Definição do componente Dashboard
export default {
  name: "Dashboard",
  
  // Estado local do componente
  data() {
    return {
        burgers: null,         // Lista de pedidos
        burger_id: null,       // ID do pedido atual (quando necessário)
        status: [],            // Lista de status possíveis
        msg: null,             // Mensagem de feedback
        isDeleting: {},        // Controle de estado de exclusão
        isUpdating: {}         // Controle de estado de atualização
    }
  },
  
  // Propriedades computadas
  computed: {
    // Ordena os pedidos do mais recente para o mais antigo
    orderedBurgers() {
        if (!this.burgers) return [];
        return [...this.burgers].sort((a, b) => {
            return b.id.localeCompare(a.id);
        });
    }
  },
  
  // Registro de componentes filhos
  components: {
    Message,
    LoadingSpinner
  },
  
  // Métodos do componente
  methods: {
    // Busca todos os pedidos da API
    async getPedidos() {
        try {
            const req = await fetch("http://localhost:3000/burgers");
            
            if (!req.ok) {
                throw new Error(`Erro ao buscar pedidos: ${req.status}`);
            }
            
            const data = await req.json();
            this.burgers = data;
            this.getStatus(); // Busca os status após carregar os pedidos
        } catch (error) {
            console.error(error);
            this.msg = "Erro ao carregar os pedidos. Tente novamente.";
            setTimeout(() => this.msg = null, 3000);
        }
    },
    
    // Busca os status possíveis da API
    async getStatus() {
        try {
            const req = await fetch("http://localhost:3000/status");
            
            if (!req.ok) {
                throw new Error(`Erro ao buscar status: ${req.status}`);
            }
            
            const data = await req.json();
            this.status = data;
        } catch (error) {
            console.error(error);
            this.msg = "Erro ao carregar os status. Tente novamente.";
            setTimeout(() => this.msg = null, 3000);
        }
    },
    
    // Remove um pedido pelo ID
    async deleteBurger(id) {
        // Confirmação antes de excluir
        if (!confirm("Tem certeza que deseja cancelar este pedido?")) {
            return;
        }
        
        // Atualiza estado de exclusão
        this.isDeleting = { ...this.isDeleting, [id]: true };
        
        try {
            // Requisição DELETE para a API
            const req = await fetch(`http://localhost:3000/burgers/${id}`, {
                method: "DELETE"
            });
            
            if (!req.ok) {
                throw new Error(`Erro ao deletar: ${req.status}`);
            }
            
            const res = await req.json();
            
            // Feedback de sucesso
            this.msg = `Pedido removido com sucesso!`;
            setTimeout(() => this.msg = null, 3000);
            
            // Recarrega a lista de pedidos
            this.getPedidos();
        } catch (error) {
            console.error(error);
            this.msg = "Erro ao remover o pedido. Tente novamente.";
            setTimeout(() => this.msg = null, 3000);
        } finally {
            // Reseta estado de exclusão
            this.isDeleting = { ...this.isDeleting, [id]: false };
        }
    },
    
    // Atualiza o status de um pedido
    async updateBurger(event, id) {
        const option = event.target.value;
        
        // Não faz nada se nenhuma opção foi selecionada
        if (!option) {
            return;
        }
        
        // Atualiza estado de atualização
        this.isUpdating = { ...this.isUpdating, [id]: true };
        
        try {
            // Prepara os dados para envio
            const dataJson = JSON.stringify({
                status: option
            });

            // Requisição PATCH para a API
            const req = await fetch(`http://localhost:3000/burgers/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: dataJson
            });
            
            if (!req.ok) {
                throw new Error(`Erro ao atualizar: ${req.status}`);
            }

            const res = await req.json();

            // Feedback de sucesso
            this.msg = `O pedido Nº ${res.id} foi atualizado para ${res.status}!`;
            setTimeout(() => this.msg = null, 3000);
        } catch (error) {
            console.error(error);
            this.msg = "Erro ao atualizar o status. Tente novamente.";
            setTimeout(() => this.msg = null, 3000);
        } finally {
            // Reseta estado de atualização
            this.isUpdating = { ...this.isUpdating, [id]: false };
        }
    }
  },
  
  // Ciclo de vida - executa quando o componente é montado
  mounted() {
    this.getPedidos();
  }
}
</script>

<style scoped>
    /* Estilo do container principal */
    #burger-table {
        max-width: 1280px;
        margin: 0 auto;
    }

    /* Estilos para layout flexível da tabela */
    #burger-table-heading,
    #burger-table-rows,
    .burger-table-row {
        display: flex;
        flex-wrap: wrap;
    }

    /* Estilo do cabeçalho da tabela */
    #burger-table-heading {
        font-weight: bold;
        padding: 12px;
        border-bottom: 3px solid #333;
    }

    /* Largura padrão das colunas */
    #burger-table-heading div,
    .burger-table-row div {
        width: 19%;
        padding: 12px;
        box-sizing: border-box;
    }

    /* Estilo das linhas da tabela */
    .burger-table-row {
        width: 100%;
        padding: 12px;
        border-bottom: 1px solid #ccc;
    }

    /* Estilo específico para a coluna de ID */
    #burger-table-heading .order-id,
    .burger-table-row .order-number {
        width: 5%;
    }

    /* Estilo do seletor de status */
    select {
        padding: 12px 6px;
        margin: 12px;
    }

    /* Estilo do botão de exclusão */
    .delete-btn {
        height: 50px;
        background-color: #222;
        color: #fcba03;
        font-weight: bold;
        border: 2px solid #222;
        padding: 10px;
        font-size: 16px;
        margin: 0 auto;
        margin-top: 10px;
        cursor: pointer;
        transition: .5s;
    }

    /* Efeito hover do botão de exclusão */
    .delete-btn:hover {
        background-color: transparent;
        color: #222
    }

    /* Estilos para estados de carregamento e sem pedidos */
    .loading, .no-burgers {
        text-align: center;
        padding: 20px;
        font-size: 18px;
        color: #555;
    }

    /* Estilo para botão desabilitado */
    .delete-btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }
    
    /* Estilo para mensagem de sem pedidos */
    .no-burgers {
        text-align: center;
        padding: 20px;
        font-size: 18px;
        color: #555;
    }

    /* Estilos para responsividade */
    @media (max-width: 768px) {
        /* Ajuste de largura para telas pequenas */
        #burger-table-heading div,
        .burger-table-row div {
            width: 100%;
            margin-bottom: 8px;
            padding: 12px;
            box-sizing: border-box;
        }
        
        /* Ajuste de padding para telas pequenas */
        #burger-table-heading,
        .burger-table-row {
            padding: 15px 0;
        }
        
        /* Mudança para layout vertical em telas pequenas */
        .burger-table-row {
            flex-direction: column;
        }
        
        /* Botão de largura total em telas pequenas */
        .delete-btn {
            width: 100%;
        }
        
        /* Select de largura total em telas pequenas */
        select {
            width: 100%;
            margin: 10px 0;
        }
    }
</style>