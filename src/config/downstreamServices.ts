require("dotenv").config()

const GITHUB_LINK: string = "https://github.com/axelarnetwork/axelar-web-app"
const RECAPTCHA_V3_SITE_KEY: string = "6LcxwsocAAAAANQ1t72JEcligfeSr7SSq_pDC9vR" //this is intentionally public
const RECAPTCHA_V2_SITE_KEY: string = "6LfjBv0dAAAAABkAG9sq3XK94F3GEHHOcJcag156" //this is intentionally public

interface IConfig {
  GITHUB_LINK: string
  RECAPTCHA_V3_SITE_KEY: string
  RECAPTCHA_V2_SITE_KEY: string
  blockExplorers: {
    [environment: string]: { [chain: string]: { name: string; url: string } }
  }
  tokenContracts: { [environment: string]: string }
  txConfirmationTool: { [environment: string]: string }
  axelarScanAccountSearch: { [environment: string]: string }
}

const blockExplorers = {
  devnet: {
    ethereum: { name: "Etherscan", url: "https://ropsten.etherscan.io/" },
    moonbeam: { name: "Moonscan", url: "https://moonbase.moonscan.io/" },
    avalanche: { name: "Snowtrace", url: "https://testnet.snowtrace.io/" },
    polygon: { name: "Polygonscan", url: "https://mumbai.polygonscan.com/" },
    fantom: { name: "FTMScan", url: "https://testnet.ftmscan.com/" },
    aurora: { name: "Aurora Explorer", url: "https://testnet.aurorascan.dev/" },
    terra: {
      name: "Terra Finder (testnet)",
      url: "https://finder.terra.money/testnet/",
    },
    axelar: {
      name: "Axelarscan",
      url: "https://testnet.axelarscan.io/",
    },
    osmosis: {
      name: "Big Dipper",
      url: "https://bigdipper.testnet.osmo.mp20.net/",
    },
    crescent: {
      name: "Crescent Explorer",
      url: "https://testnet.crescent.explorers.guru/",
    },
    sei: {
      name: "SEI Explorer",
      url: "https://sei.explorers.guru/",
    },
    kujira: {
      name: "Kujira Finder",
      url: "https://finder.kujira.app/harpoon-4/",
    },
    fetch: {
      name: "Fetch Explorer",
      url: "https://explore-dorado.fetch.ai/",
    },
    xpla: {
      name: "XPLA Explorer",
      url: "https://explorer.xpla.io/testnet/",
    },
  },
  testnet: {},
  local: {},
  mainnet: {
    ethereum: { name: "Etherscan", url: "https://etherscan.io/" },
    moonbeam: { name: "Moonscan", url: "https://moonbeam.moonscan.io/" },
    avalanche: { name: "Snowtrace", url: "https://snowtrace.io/" },
    polygon: { name: "Polygonscan", url: "https://polygonscan.com/" },
    binance: { name: "BscScan", url: "https://bscscan.com/" },
    fantom: { name: "FTMScan", url: "https://ftmscan.com/" },
    terra: {
      name: "Terra Finder",
      url: "https://finder.terra.money/mainnet/",
    },
    axelar: {
      name: "Axelarscan",
      url: "https://axelarscan.io/",
    },
    osmosis: {
      name: "Mintscan",
      url: "https://www.mintscan.io/osmosis/",
    },
    "e-money": {
      name: "Mintscan",
      url: "https://www.mintscan.io/emoney/",
    },
    cosmoshub: {
      name: "Mintscan",
      url: "https://www.mintscan.io/cosmos/",
    },
    juno: {
      name: "Mintscan",
      url: "https://www.mintscan.io/juno/",
    },
    crescent: {
      name: "Mintscan",
      url: "https://www.mintscan.io/crescent/",
    },
    injective: {
      name: "Mintscan",
      url: "https://www.mintscan.io/injective/"
    },
    secret: {
      name: "Mintscan",
      url: "https://www.mintscan.io/secret/",
    },
    kujira: {
      name: "Kujira Finder",
      url: "https://finder.kujira.app/kaiyo-1/",
    },
    xpla: {
      name: "XPLA Explorer",
      url: "https://explorer.xpla.io/mainnet/",
    },
  },
}
blockExplorers.testnet = blockExplorers.devnet
blockExplorers.local = blockExplorers.devnet

const tokenContracts = {
  local: "https://docs.axelar.dev/releases/testnet",
  devnet: "https://docs.axelar.dev/releases/testnet",
  testnet: "https://docs.axelar.dev/releases/testnet",
  mainnet: "https://docs.axelar.dev/releases/mainnet",
}

const txConfirmationTool = {
  local: "https://testnet.axelarbridger.com/recover",
  devnet: "https://testnet.axelarbridger.com/recover",
  testnet: "https://testnet.axelarbridger.com/recover",
  mainnet: "https://transaction-confirmation.axelar.dev",
}

const axelarScanAccountSearch = {
  local: "https://testnet.crosschain.axelarscan.io/account/",
  devnet: "https://testnet.crosschain.axelarscan.io/account/",
  testnet: "https://testnet.crosschain.axelarscan.io/account/",
  mainnet: "https://crosschain.axelarscan.io/account/",
}

const configs: IConfig = {
  GITHUB_LINK,
  RECAPTCHA_V3_SITE_KEY: RECAPTCHA_V3_SITE_KEY,
  RECAPTCHA_V2_SITE_KEY: RECAPTCHA_V2_SITE_KEY,
  blockExplorers,
  tokenContracts,
  txConfirmationTool,
  axelarScanAccountSearch
}

export default configs
