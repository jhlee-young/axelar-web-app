import { useEffect, useState } from "react"
import styled from "styled-components"
import { KeplrWallet } from "hooks/wallet/KeplrWallet"
import Container from "../StyleComponents/Container"
import { FlexRow } from "../StyleComponents/FlexRow"
import { SVGImage } from "../Widgets/SVGImage"
import BoldSpan from "../StyleComponents/BoldSpan"
import { confirm } from "react-confirm-box"
import { StyledButton } from "components/StyleComponents/StyledButton"
import { MetaMaskWallet } from "hooks/wallet/MetaMaskWallet"
import {
  useConnectedWallet,
  useLCDClient,
  useWallet,
  WalletLCDClientConfig,
} from "@terra-money/wallet-provider"
import { TerraWallet } from "hooks/wallet/TerraWallet"

const StyledPageHeader = styled(Container)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 56px;
  box-shadow: 0 5px 5px 0 rgba(0, 0, 0, 0.21);
  background-color: black;
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const HeaderText = styled.div`
  display: flex;
  flex-direction: row;
  color: lightgrey;
  font-size: larger;
  box-sizing: border-box;
`
const HeaderImage = styled.div`
  font-family: EthnocentricRg-Regular;
  color: lightgrey;
  font-size: 24px;
  box-sizing: border-box;
  padding: 10px;
`
const ByText = styled.span`
  color: lightgrey;
  font-size: 12px;
  box-sizing: border-box;
  display: flex;
  align-items: flex-end;
  padding-bottom: 10px;
`
const ConnectWalletButton = styled(FlexRow)`
  cursor: pointer;
  transition: opacity 0.15s ease-in;
  &:hover {
    opacity: 0.7;
  }
`

const StyledDialogBox = styled.div`
  height: 50%;
  width: 50%;
  min-width: 400px;
  background-color: white;
  padding: 2em;
  box-sizing: border-box;
  border-radius: 10px;
  font-size: 0.9em;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.22), inset 0 0 3px 0 #262426;
  border: solid 1px #b9bac8;
`

const PageHeader = () => {
  const [showWalletOptions, setShowWalletOptions] = useState(false)
  const terraWallet = useWallet()
  const lcdClient = useLCDClient(
    (process.env.REACT_APP_STAGE === "mainnet"
      ? terraConfigMainnet
      : terraConfigTestnet) as WalletLCDClientConfig
  )
  const connectedWallet = useConnectedWallet()

  useEffect(() => {
    if (!showWalletOptions) return

    const options = {
      render: (message: string, onConfirm: () => void) => {
        return (
          <StyledDialogBox>
            <div>{message}</div>
            <br />
            <StyledButton onClick={onConfirm}>Done</StyledButton>
          </StyledDialogBox>
        )
      },
    }

    const message: any = (
      <div
        style={{
          display: `flex`,
          flexWrap: `wrap`,
          width: `100%`,
          border: "0.1px solid lightgrey",
        }}
      >
        <WalletOption
          onClick={async () => new KeplrWallet("terra").connectToWallet()}
          label={"Keplr Wallet"}
          image={require(`assets/svg/keplr.svg`).default}
        />
        <WalletOption
          onClick={async () =>
            new TerraWallet(
              terraWallet,
              lcdClient,
              connectedWallet
            ).connectToWallet()
          }
          label={"Terra Station"}
          image={require(`assets/svg/terra-station.svg`).default}
        />
        <WalletOption
          onClick={async () => new MetaMaskWallet("ethereum").connectToWallet()}
          label={"MetaMask"}
          image={require(`assets/svg/metamask.svg`).default}
        />
      </div>
    )
    confirm(message, options as any).then((done) => {
      done && setShowWalletOptions(false)
    })
  }, [
    showWalletOptions,
    setShowWalletOptions,
    connectedWallet,
    lcdClient,
    terraWallet,
  ])

  const pillStyle =
    process.env.REACT_APP_STAGE === "mainnet"
      ? { color: `green`, fontSize: `smaller`, fontWeight: `bolder` }
      : {
          color: `white`,
          fontSize: `smaller`,
          fontWeight: `bolder`,
          backgroundColor: `red`,
          padding: `0.2em`,
          borderRadius: `10px`,
        }

  return (
    <StyledPageHeader>
      <HeaderText>
        <HeaderImage>Satellite</HeaderImage>
        <ByText>
          <BoldSpan style={{ marginRight: `0.5em` }}>(BETA)</BoldSpan>
          Powered by Axelar
        </ByText>
      </HeaderText>
      <FlexRow>
        <div style={{ fontSize: `0.8em` }}>
          <ConnectWalletButton onClick={() => setShowWalletOptions(true)}>
            <FlexRow
              style={{
                padding: "4px 8px 4px 8px",
                borderRadius: "4px",
                backgroundColor: "rgb(30 64 175)",
                color: "white",
              }}
            >
              <p>Connect Wallet</p>
            </FlexRow>
          </ConnectWalletButton>
        </div>
        {HeaderDivider()}
        <div style={pillStyle}>
          {(process.env.REACT_APP_STAGE || "").toUpperCase()}
        </div>
        {HeaderDivider()}
      </FlexRow>
    </StyledPageHeader>
  )
}

const StyledWalletOption = styled(ConnectWalletButton)`
  cursor: pointer;
  padding-bottom: 1em;
  padding-top: 1em;
  flex-direction: column;
  box-sizing: border-box;
  border: 0.1px solid lightgrey;
  width: 50%;
  &:hover {
    background-color: lightgrey;
    border-radius: 10px;
  }
`

const terraConfigMainnet = {
  URL: "https://lcd.terra.dev",
  chainId: "columbus-5",
}

const terraConfigTestnet = {
  URL: "https://bombay-lcd.terra.dev",
  chainId: "bombay-12",
}

const WalletOption = ({ label, onClick, image }: any) => {
  return (
    <StyledWalletOption onClick={onClick}>
      <SVGImage height={`3em`} width={`3em`} margin={`auto`} src={image} />
      <h3>{label}</h3>
    </StyledWalletOption>
  )
}
const HeaderDivider = () => (
  <div style={{ color: `grey`, margin: `0px 1em 0px 1em` }}>|</div>
)

export default PageHeader
