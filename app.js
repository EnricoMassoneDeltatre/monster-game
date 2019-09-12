function computeRandomNumber(min, max) {
  if (min <= 0) {
    throw new RangeError("Parameter 'min' must be positive integer");
  }

  if (max <= 0) {
    throw new RangeError("Parameter 'max' must be positive integer");
  }

  if(min >= max) {
    throw new Error("Parameter 'min' must be less than parameter 'max'");
  }

  if (!Number.isInteger(min)) {
    throw new Error("Parameter 'min' is expected to be an integer");
  }

  if (!Number.isInteger(max)) {
    throw new Error("Parameter 'max' is expected to be an integer");
  }

  const randonNumberBetweenOneAndMax = Math.floor(Math.random(0, 1) * max) + 1;
  return Math.max(min, randonNumberBetweenOneAndMax);
}

const PLAYER_MIN_DAMAGE = 5;
const PLAYER_MAX_DAMAGE = 12;

const MONSTER_MIN_DAMAGE = 3;
const MONSTER_MAX_DAMAGE = 10;

const SPECIAL_ATTACK_MIN_DAMAGE = 10;
const SPECIAL_ATTACK_MAX_DAMAGE = 20;

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
      },

      stopGame() {
        this.isGameRunning = false;
      },

      attack() {
        const monsterDamage = computeRandomNumber(MONSTER_MIN_DAMAGE, MONSTER_MAX_DAMAGE);
        this.hitMonster(monsterDamage);

        if (this.checkForWinner()) {
          return;
        }

        const playerDamage = computeRandomNumber(PLAYER_MIN_DAMAGE, PLAYER_MAX_DAMAGE);
        this.hitPlayer(playerDamage);

        this.checkForWinner();
      },

      specialAttack() {
        const monsterDamage = computeRandomNumber(SPECIAL_ATTACK_MIN_DAMAGE, SPECIAL_ATTACK_MAX_DAMAGE);
        this.hitMonster(monsterDamage);

        if (this.checkForWinner()) {
          return;
        }

        const playerDamage = computeRandomNumber(PLAYER_MIN_DAMAGE, PLAYER_MAX_DAMAGE);
        this.hitPlayer(playerDamage);

        this.checkForWinner();
      },

      hitMonster(damage) {
        const actualDamage = Math.min(this.monster, damage);
        this.monster -= actualDamage;
      },

      hitPlayer(damage) {
        const actualDamage = Math.min(this.player, damage);
        this.player -= actualDamage;
      },

      checkForWinner() {
        if (this.playerWon) {

          if (confirm("You won! Do you want to play a new game ?")) {
            this.startNewGame();
          } else {
            this.stopGame();
          }

          return true;
        } else if (this.monsterWon) {
          
          if (confirm("You lose! Do you want to play a new game ?")) {
            this.startNewGame();
          } else {
            this.stopGame();
          }

          return true;
        } else {
          return false;
        }
      }
    },
    computed: {
      playerWon() {
        return this.monster <= 0;
      },
      monsterWon() {
        return this.player <= 0;
      }
    }
})