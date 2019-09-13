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

const FULL_LIFE = 100;
const PLAYER_MIN_DAMAGE = 5;
const PLAYER_MAX_DAMAGE = 12;
const MONSTER_MIN_DAMAGE = 3;
const MONSTER_MAX_DAMAGE = 10;
const SPECIAL_ATTACK_MIN_DAMAGE = 10;
const SPECIAL_ATTACK_MAX_DAMAGE = 20;
const PLAYER_LIFE_RECOVERY_WITH_HEAL = 10;

new Vue({
    el: "#app",
    data: {
        player: FULL_LIFE,
        monster: FULL_LIFE,
        isGameRunning: false
    },
    methods: {
      startNewGame() {
        this.player = FULL_LIFE;
        this.monster = FULL_LIFE;
        this.isGameRunning = true;
      },

      stopGame() {
        this.isGameRunning = false;
      },

      attack() {
        this.playOneGameRound(MONSTER_MIN_DAMAGE, MONSTER_MAX_DAMAGE);
      },

      specialAttack() {
        this.playOneGameRound(SPECIAL_ATTACK_MIN_DAMAGE, SPECIAL_ATTACK_MAX_DAMAGE);
      },

      heal() {
        this.healPlayer();
        this.playMonsterRound();
      },

      giveUp() {
        this.stopGame();
      },

      healPlayer() {
        const maxPossiblePlayerLifeRecovery = FULL_LIFE - this.player;
        const playerLifeRecovery = Math.min(maxPossiblePlayerLifeRecovery, PLAYER_LIFE_RECOVERY_WITH_HEAL);
        this.player += playerLifeRecovery;
      },

      playOneGameRound(monsterMinDamage, monsterMaxDamage) {
        const monsterDamage = computeRandomNumber(monsterMinDamage, monsterMaxDamage);
        this.hitMonster(monsterDamage);

        if (this.checkForWinner()) {
          return;
        }

        this.playMonsterRound();
      },

      playMonsterRound() {
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