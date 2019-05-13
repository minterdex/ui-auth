<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" :clipped="clipped" floating fixed app>
      
      <v-list>
        <v-list-tile v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title" />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    
    </v-navigation-drawer>
    
    <v-toolbar :clipped-left="clipped" fixed app id="toolbar">
      
      
      <v-toolbar-side-icon @click="drawer = !drawer" :size="46" />
      <v-toolbar-title>Minter Dex</v-toolbar-title>
      <v-spacer />
      <v-menu :nudge-width="300" offset-y >
        <v-avatar slot="activator" size="36" v-html="$store.getters.avatar"></v-avatar>

        <v-card>
          <v-list style="background-color:#ededed">
            <v-list-tile avatar>
              <v-list-tile-avatar>
                <v-avatar size="38" v-html="$store.getters.avatar"></v-avatar>
              </v-list-tile-avatar>

              <v-list-tile-content>
                <v-list-tile-title>Account #1</v-list-tile-title>
                <v-list-tile-sub-title>{{ $store.state.wallet.address }}</v-list-tile-sub-title>
              </v-list-tile-content>

            </v-list-tile>
          </v-list>

          <v-divider></v-divider>

          <v-list>
            <v-list-tile @click="logout">
              <v-list-tile-action>
                <v-icon>exit_to_app</v-icon>
              </v-list-tile-action>
              <v-list-tile-title>Log out</v-list-tile-title>
            </v-list-tile>

          </v-list>
          
        </v-card>
      </v-menu>
      
      
    </v-toolbar>

    <v-content>
      <v-toolbar style="background-color:#FAFAFA!important">
        <v-toolbar-title class="pl-2">{{ $store.state.section }}</v-toolbar-title>      
      </v-toolbar>
      <v-container fluid py-1>
        <nuxt />
      </v-container>
    </v-content>
    
  </v-app>
</template>

<script>

export default {
  data() {
    return {
      clipped: true,
      drawer: true,
      fixed: true,
      items: [
        { icon: 'apps', title: 'Dashboard', to: '/wallet/assets' },
      ],
      title: 'Minter DEX'
    }
  },
  methods: {
    logout() {
      this.$store.commit('LOG_OUT')
      this.$router.push('/')
    }
  }
}
</script>

<style>
#toolbar .v-toolbar__content {
  padding: 0 16px!important;
}
</style>