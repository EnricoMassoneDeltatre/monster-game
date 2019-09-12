new Vue({
    el: "#app",
    data: {
        player: 100,
        monster: 100,
        isGameRunning: false
    },
    methods: {
      startNewGame() {
        this.player = 100;
        this.monster = 100;
        this.isGameRunning = true;
      }
    }
})