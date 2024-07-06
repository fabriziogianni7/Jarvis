interface Protocol {
  key: string;
  name: string;
  logoURI: string;
}

interface Step {
  chainId: number;
  blockNumber: number;
  from: `0x${string}`;
  to: `0x${string}`;
  gasLimit: string;
  data: `0x${string}`;
  value: string;
  protocol: Protocol;
}

interface Token {
  address: `0x${string}`;
  chainId: number;
  symbol: string;
  decimals: number;
  name: string;
  coinKey: string;
  logoURI: string;
  priceUSD: string;
}

interface Data {
  description: string;
  steps: Step[];
  gasCostUSD: string;
  fromChainId: number;
  fromAmountUSD: number;
  fromAmount: string;
  fromToken: Token;
  fromAddress: `0x${string}`;
  toChainId: number;
  toAmountUSD: number;
  toAmount: string;
  toAmountMin: string;
  toToken: Token;
  toAddress: `0x${string}`;
}

 interface BrianResult {
  solver: string;
  action: string;
  type: string;
  data: Data;
}

export interface BrianResponse {
  result: BrianResult[];
}
