import { TatumEthSDK } from '@tatumio/eth'
import { process.env.API_KEY } from '@tatumio/shared-testing-common'
import { uma } from '@uma/sdk'

const ethSDK = TatumEthSDK({ apiKey: process.env.API_KEY })

export async function ethWalletTest() {
  const { mnemonic, xpub } = await ethSDK.wallet.generateWallet()

  const address = ethSDK.wallet.generateAddressFromXPub(mnemonic, 0)
  const privateKey = await ethSDK.wallet.generatePrivateKeyFromMnemonic(mnemonic, 0, { testnet: true })
  const addressFromXpub = ethSDK.wallet.generateAddressFromXPub(xpub, 0)

}

// get the contract instance
const contractAddress:string = process.env.CONTRACT_ADDR // update with optimistic oracle address you want to connect to
const client:uma.clients.optimisticOracle.Instance = uma.clients.optimisticOracle.connect(contractAddress, provider)

// gets all events using ethers query filter api
async function events() {
    const events = await client.queryFilter({})

    // returns EventState, defined in the optimistic oracle client
    const state:uma.clients.optimisticOracle.EventState = uma.clients.optimisticOracle.getEventState(events)

    // see all requests given even details
    console.log(state.requests)
}
