import { TatumEthSDK } from '@tatumio/eth'
import { process.env.API_KEY } from '@tatumio/shared-testing-common'
import { uma } from '@uma/sdk'

const ethSDK = TatumEthSDK({ apiKey: process.env.API_KEY })

async function ethWalletCreate() {
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

contract MotivationalWallet {

    mapping(uint => address) public users;// A mapping to store ethereum addresses of the users
    mapping(uint => ) eth_balance; //keep track of how many eth people owned
    address owner; // owner of the contract

    //constructor
    function MotivationalWallet(){
        owner = msg.sender;
    }

    //adjust the ante, player number and percentage for the winner
    function changeParameters(uint , uint8 , uint ) {

    }
}
