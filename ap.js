new Vue({
    el: '#projeto',
    data: {
        vjogador: 100,
        vmonstro: 100,
        jogar: false,
        logs: []        
    },
    computed: {
        hasResult() {
            return this.vjogador == 0 || this.vmonstro == 0
        }
    },
    methods: {
        novoJogo(){
            this.jogar = true
            this.vjogador = 100
            this.vmonstro = 100
            this.log = []
        } ,
        random(min, max){
            const value = Math.random() * (max - min) + min
            return Math.round(value)
        },
        ataque(especial){
            this.machucar('vmonstro',5, 10, especial, 'Jogador', 'Monstro', 'player')
            if (this.vmonstro > 0) {
                this.machucar('vjogador',7, 12, false, 'Monstro', 'Jogador', 'monster')
            }
            
        },
        machucar(prop,min, max, especial, unidades, alvo, cls){
            const plus = especial ? 5 : 0
            const machucar = this.random(min + plus, max + plus)
            this[prop] = Math.max(this[prop] - machucar, 0)
            this.historico(`${unidades} atingiu ${alvo} com ${machucar}.`, cls)
        },
        curar(min, max){
            const curar = this.random(min, max)
            this.vjogador = Math.min(this.vjogador + curar, 100)
            this.historico(`Jogado se curou em ${curar}.`, 'player')
        },
        curarMachucar(min, max) {
            this.curar(10, 15)
            this.machucar('vjogador', 7, 12, false, 'Monstro', 'Jogador', 'monster')
        },
        historico(text, cls ){
            this.logs.unshift({ text, cls })
        }      

    },
    watch: {
        hasResult(value){
            if (value) this.jogar = false
        }
    }
})