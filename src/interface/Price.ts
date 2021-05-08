
const currencies: string[] = ['usd', 'yen'];

export default class Price {
    currency: string;
    amount: number;
  
    // Parse a stringified record literal
    public static fromPGCompositeType(v: string): Price {
      if (!(typeof v === "string")) { throw new TypeError(`composite type didn't return as string`); }
  
      const [currency, amountStr] = v.replace("(", "").replace(")","").split(",");
      if (!currencies.includes(currency)) {
        throw new TypeError(`invalid currency in record literal: [${currency}]`);
      }
  
      const amount = parseInt(amountStr, 10);
      if (typeof amount !== "number" || isNaN(amount) || amount < 0) {
        throw new TypeError(`invalid amount in record literal: [${amount}]`);
      }
      
      return new Price(currency, amount);
    }
  
    // Note: `type` on the @Column must be set to 'text'
    // convert a price into a stringified record literal
    public static toPGCompositeType(v: Price): string {
      if (!v) { throw new TypeError(`invalid Price object`); }
      return `(${v.currency},${v.amount})`;
    }
  
    constructor(currency: string, amount: number) {
      if (typeof amount !== "number" || amount < 0) {
        throw new TypeError("invalid price, amount must be greater than zero");
      }
      if (!currencies.includes(currency)) {
        throw new TypeError(`invalid currency (unknown value [${currency}])`);
      }
  
      this.currency = currency;
      this.amount = amount;
    }
  }