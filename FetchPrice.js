const { ethers } = require("ethers");

const {
  abi: QuoterABI,
} = require("@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json");

const rpcUrl = "MAINNET_INFURA_API";

const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

const fetchPrice = async (
  QUOTER_CONTRACT_ADDRESS,
  ADDRESS_FROM,
  ADDRESS_TO,
  HUMAN_VALUE
) => {
  const quoterContract = new ethers.Contract(
    QUOTER_CONTRACT_ADDRESS,
    QuoterABI,
    provider
  );
  const H_VALUE = ethers.utils.parseEther(String(HUMAN_VALUE));
  const quotedAmountOut = await quoterContract.callStatic.quoteExactInputSingle(
    ADDRESS_FROM,
    ADDRESS_TO,
    3000,
    H_VALUE,
    0
  );

  const amount = ethers.utils.formatEther(String(quotedAmountOut));
  return amount;
};

const main = async () => {
  QUOTER_CONTRACT_ADDRESS = "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6";
  const ADDRESS_FROM = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"; // 'WETH'
  const ADDRESS_TO = "0x6B175474E89094C44Da98b954EedeAC495271d0F"; // 'DAI'
  const HUMAN_VALUE = "1";

  const result = await fetchPrice(
    QUOTER_CONTRACT_ADDRESS,
    ADDRESS_FROM,
    ADDRESS_TO,
    HUMAN_VALUE
  );
  console.log("🚀 Result:", result);
};

main();
