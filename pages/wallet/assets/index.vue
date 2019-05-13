<template>
  <div>
    {{ $store.state.accounts }}
    
    <v-dialog
      v-model="dialog"
      width="500"
    >

      <v-card>
        <v-card-title
          primary-title
        >
        <div class="headline">
          Minter Dex è diverso</div>
          <div class="body-1">Il wallet è mantenuto in sicurezza sul tuo dispositivo</div>
        </v-card-title>
        <v-divider></v-divider>

        <v-card-text>
          <v-checkbox color="primary" v-model="terms1">
            <span slot="label" style="color:#2d2d2d">
              Ho compreso che i miei fondi sono mantenuti in sicurezza su questo dispositivo, non da una società
            </span>
          </v-checkbox>
          <v-checkbox color="primary" v-model="terms2">
            <span slot="label" style="color:#2d2d2d">
              Ho compreso che spostando questa app su un altro dispositivo o cancellandola, il mio wallet Ethereum potrà essere recuperato esclusivamente utilizzando la frase di backup
            </span>
          </v-checkbox>
          <v-checkbox color="primary" v-model="terms3">
            <span slot="label" style="color:#2d2d2d">
              Vorrei contribuire a migliorare la piattaforma Minter Dex inviando statistiche di utilizzo anonime agli sviluppatori.
            </span>
          </v-checkbox>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            primary
            :disabled="!isValid"
            @click="dialog = false"
          >
            Ho capito
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
import {
    assetDataUtils,
    BigNumber,
    ContractWrappers,
    generatePseudoRandomSalt,
    Order,
    orderHashUtils,
    signatureUtils,
    RPCSubprovider,
    Web3ProviderEngine
} from '0x.js'
import { HttpClient, OrderbookRequest, OrderConfigRequest } from '@0x/connect'
import { Web3Wrapper } from '@0x/web3-wrapper'
import { getContractAddressesForNetworkOrThrow } from '@0x/contract-addresses'

export default {
  layout: 'auth',
  data () {
    return {
      dialog: false,
      terms1: false,
      terms2: false,
      terms3: false,
      providerEngine: null,
      networkId: 50,
      contractWrappers: null,
      web3Wrapper: null,
      maker: null,
      taker: null,
      contractAddresses: null,
      makerAssetData: null,
      takerAssetData: null,
      takerAssetAmount: null,
      makerAssetAmount: null
    }
  },
  /*async mounted () {
    this.$store.commit('SET_SECTION', 'dashboard')

    this.providerEngine = new Web3ProviderEngine();
    this.providerEngine.addProvider(new RPCSubprovider('http://localhost:8545'));
    this.providerEngine.start();

    this.contractWrappers = new ContractWrappers(this.providerEngine, { networkId: this.networkId });
    this.web3Wrapper = new Web3Wrapper(this.providerEngine);

    [this.maker, this.taker] = await this.web3Wrapper.getAvailableAddressesAsync();

    this.contractAddresses = getContractAddressesForNetworkOrThrow(this.networkId);
    const zrxTokenAddress = this.contractAddresses.zrxToken;
    const etherTokenAddress = this.contractAddresses.etherToken;

    this.makerAssetData = assetDataUtils.encodeERC20AssetData(zrxTokenAddress);
    this.takerAssetData = assetDataUtils.encodeERC20AssetData(etherTokenAddress);
    // the amount the maker is selling of maker asset
    this.makerAssetAmount = Web3Wrapper.toBaseUnitAmount(new BigNumber(5), 18);
    // the amount the maker wants of taker asset
    this.takerAssetAmount = Web3Wrapper.toBaseUnitAmount(new BigNumber(0.1), 18);

    const makerZRXApprovalTxHash = await this.contractWrappers.erc20Token.setUnlimitedProxyAllowanceAsync(
        zrxTokenAddress,
        this.maker,
    );
    console.log(await this.web3Wrapper.awaitTransactionSuccessAsync(makerZRXApprovalTxHash));

    // Allow the 0x ERC20 Proxy to move WETH on behalf of takerAccount
    const takerWETHApprovalTxHash = await this.contractWrappers.erc20Token.setUnlimitedProxyAllowanceAsync(
        etherTokenAddress,
        this.taker,
    );
    console.log(await this.web3Wrapper.awaitTransactionSuccessAsync(takerWETHApprovalTxHash));

    // Convert ETH into WETH for taker by depositing ETH into the WETH contract
    const takerWETHDepositTxHash = await this.contractWrappers.etherToken.depositAsync(
        etherTokenAddress,
        this.takerAssetAmount,
        this.taker,
    );
    console.log(await this.web3Wrapper.awaitTransactionSuccessAsync(takerWETHDepositTxHash));
    
    this.submit()
  },*/
  computed: {
    isValid() {
      return this.terms1 && this.terms2
    }
  },
  methods: {
    async submit() {
      const relayerApiUrl = 'http://localhost:8080/v2';
      const relayerClient = new HttpClient(relayerApiUrl);

      const randomExpiration = 1583795643;
      const exchangeAddress = this.contractAddresses.exchange;

      // Ask the relayer about the parameters they require for the order
      const orderConfigRequest = {
          exchangeAddress,
          makerAddress: this.maker,
          takerAddress: this.taker,
          expirationTimeSeconds: randomExpiration,
          makerAssetAmount: this.makerAssetAmount,
          takerAssetAmount: this.takerAssetAmount,
          makerAssetData: this.makerAssetData,
          takerAssetData: this.takerAssetData,
      };
      const orderConfig = await relayerClient.getOrderConfigAsync(orderConfigRequest);
      console.log(orderConfig)

      const order = {
          salt: generatePseudoRandomSalt(),
          ...orderConfigRequest,
          ...orderConfig,
      };

      const orderHashHex = orderHashUtils.getOrderHashHex(order);
      const signature = await signatureUtils.ecSignHashAsync(this.providerEngine, orderHashHex, this.maker);
      const signedOrder = { ...order, signature };

      console.log(await this.contractWrappers.exchange.validateOrderFillableOrThrowAsync(signedOrder));

      await relayerClient.submitOrderAsync(signedOrder, { networkId: this.networkId })

    }
  }
}
</script>
