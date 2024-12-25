export interface Protocol {
  name: string;
  symbol: string;
  category: string;
  chains: string[];
  tvl: number;
  change_1h: number;
  change_1d: number;
  change_7d: number;
}

export interface ProtocolsResponse extends Protocol {
  slug: string;
  parentProtocol: string;
  description: string;
  twitter: string;
  url: string;
}