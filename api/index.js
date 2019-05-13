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

export const providerEngine = new Web3ProviderEngine();
providerEngine.addProvider(new RPCSubprovider('http://localhost:8545'));
providerEngine.start();
// Instantiate ContractWrappers with the provider

const NETWORK_CONFIGS = {
    networkId: 50
}

const contractWrappers = new ContractWrappers(providerEngine, { networkId: NETWORK_CONFIGS.networkId });

const web3Wrapper = new Web3Wrapper(providerEngine);
const [maker, taker] = await web3Wrapper.getAvailableAddressesAsync();

const contractAddresses = getContractAddressesForNetworkOrThrow(NETWORK_CONFIGS.networkId);
const zrxTokenAddress = contractAddresses.zrxToken;
const etherTokenAddress = contractAddresses.etherToken;

const makerAssetData = assetDataUtils.encodeERC20AssetData(zrxTokenAddress);
const takerAssetData = assetDataUtils.encodeERC20AssetData(etherTokenAddress);
// the amount the maker is selling of maker asset
const makerAssetAmount = Web3Wrapper.toBaseUnitAmount(new BigNumber(5), DECIMALS);
// the amount the maker wants of taker asset
const takerAssetAmount = Web3Wrapper.toBaseUnitAmount(new BigNumber(0.1), DECIMALS);

const makerZRXApprovalTxHash = await contractWrappers.erc20Token.setUnlimitedProxyAllowanceAsync(
    zrxTokenAddress,
    maker,
);
await web3Wrapper.awaitTransactionSuccessAsync(makerZRXApprovalTxHash);

// Allow the 0x ERC20 Proxy to move WETH on behalf of takerAccount
const takerWETHApprovalTxHash = await contractWrappers.erc20Token.setUnlimitedProxyAllowanceAsync(
    etherTokenAddress,
    taker,
);
await web3Wrapper.awaitTransactionSuccessAsync(takerWETHApprovalTxHash);

// Convert ETH into WETH for taker by depositing ETH into the WETH contract
const takerWETHDepositTxHash = await contractWrappers.etherToken.depositAsync(
    etherTokenAddress,
    takerAssetAmount,
    taker,
);
await web3Wrapper.awaitTransactionSuccessAsync(takerWETHDepositTxHash);

const relayerApiUrl = 'http://localhost:8080/v2';
const relayerClient = new HttpClient(relayerApiUrl);

const randomExpiration = getRandomFutureDateInSeconds();
const exchangeAddress = contractAddresses.exchange;

// Ask the relayer about the parameters they require for the order
const orderConfigRequest = {
    exchangeAddress,
    makerAddress: maker,
    takerAddress: NULL_ADDRESS,
    expirationTimeSeconds: randomExpiration,
    makerAssetAmount,
    takerAssetAmount,
    makerAssetData,
    takerAssetData,
};
const orderConfig = await httpClient.getOrderConfigAsync(orderConfigRequest);

const order = {
    salt: generatePseudoRandomSalt(),
    ...orderConfigRequest,
    ...orderConfig,
};

const orderHashHex = orderHashUtils.getOrderHashHex(order);
const signature = await signatureUtils.ecSignHashAsync(providerEngine, orderHashHex, maker);
const signedOrder = { ...order, signature };

await contractWrappers.exchange.validateOrderFillableOrThrowAsync(signedOrder);

await httpClient.submitOrderAsync(signedOrder, { networkId: NETWORK_CONFIGS.networkId }
