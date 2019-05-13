<template>
  <v-card flat>
    <v-card-title primary-title>
      <v-flex text-xs-center xs12>
        <h3 class="display-1 mt-2 mb-2">
          Confirm backup
        </h3>
        <span class="grey--text">
          Verify your backup phrase or <span @click="back" class="link">go back</span>
        </span>
        
      </v-flex>
      <v-flex xs12 class="mt-4">
        <div class="seed-container">
          <span class="seed-item" v-for="(sentence, index) in confirmedMnemonic" @click="removeMnemonic(index)">{{ sentence }}</span>
        </div>
        <div class="subheading grey--text text--darken-3 mt-4" v-if="!isCorrect">Please, tap each word in the correct order</div>
        <div class="seed-container random" v-if="mnemonic.length > 0">
          <span v-for="(sentence, index) in mnemonic" @click="addMnemonic(index)">{{ sentence }}</span>
        </div>
      </v-flex>
      <v-flex xs12 class="mt-4 red--text text-xs-center" v-if="mnemonic.length === 0 && !isCorrect">
        Wrong order, try again.
      </v-flex>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn flat :disabled="confirmedMnemonic.length === 0" @click="reset">
        Reset
      </v-btn>
      <v-btn color="primary" :disabled="!isCorrect" @click="onConfirm">
        Confirm
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
canvas
bag
crisp
student
stool
glare
popular
inch
entry
loud
mosquito
senior
<script>

export default {
  data () {
    return {
      mnemonic: [],
      confirmedMnemonic: []
    }
  },
  mounted() {
    this.reset()
  },
  computed: {
    isCorrect() {
      return this.confirmedMnemonic.join(" ") === this.$store.state.wallet.mnemonic
    }
  },
  methods: {
    onConfirm() {
      this.$router.push('/wallet/assets')
    },
    back() {
      this.$store.commit('SET_SECTION', 'create_backup')
    },
    reset() {
      this.mnemonic = this.shuffle(this.$store.state.wallet.mnemonic.split(" "))
      this.confirmedMnemonic = []
    },
    shuffle (array) {
      var currentIndex = array.length;
      var temporaryValue, randomIndex;

      while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    },
    addMnemonic(index) {
      this.confirmedMnemonic.push(this.mnemonic[index])
      this.mnemonic.splice(index, 1)
    },
    removeMnemonic(index) {
      this.mnemonic.push(this.confirmedMnemonic[index])
      this.confirmedMnemonic.splice(index, 1)
    }
  }
}
</script>

<style>
.seed-container.random {
  background-color: transparent;
  border: 0;
  padding: 10px 5px;
}
.seed-container.random > span {
  background-color: #1976d2;
  border-radius: 4px;
  margin: 3px;
  border: solid 1px #1976d2;
  cursor: pointer;
  color: #FFF;
  line-height: 34px;
  padding: 0 15px;
}
.seed-item {
  border-radius: 4px;
  padding: 0 20px!important;
  margin: 3px!important;
  box-shadow: 0 1px 2px 0 rgba(0,0,0,0.2)!important;
  background-color: #fff!important;
  font-size: 15px!important;
  line-height: 36px;
  max-height: 36px;
  cursor: pointer;
}
.link {
  color: #1976d2;
  cursor: pointer;
  text-decoration: underline;
}
</style>
