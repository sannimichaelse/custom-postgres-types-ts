
const monthArray: Array<{ alias: string, month: string }> = [
    { "alias": "jan", "month": "January" },
    { "alias": "feb", "month": "February" },
    { "alias": "mar", "month": "March" },
    { "alias": "apr", "month": "April" },
    { "alias": "may", "month": "May" },
    { "alias": "jun", "month": "June" },
    { "alias": "jul", "month": "July" },
    { "alias":"aug", "month": "August" },
    { "alias": "sep", "month": "September" },
    { "alias": "oct", "month": "October" },
    { "alias": "nov", "month": "November" },
    { "alias": "dec", "month": "December" }
];

export default class DateOfBirth {
    date: number;
    month: string;
    year: string;
  
    constructor(date: number, month: string, year: string) {
        this.date = date;
        this.month = month;
        this.year = year;
    }

    // Parse a stringified record literal
    public static fromPGCompositeType(v: string): DateOfBirth {
      if (!(typeof v === "string")) { throw new TypeError(`composite type didn't return as string`); }
  
      const [date, month, year] = v.replace("(", "").replace(")","").split(",");

      const monthDetails = monthArray.find((item) => item.alias === month)
      if (!monthDetails) {
        throw new TypeError(`invalid month in record literal: [${monthDetails}]`);
      }
    
      const userDate = parseInt(date, 10);
      if (typeof userDate !== "number" || userDate > 31) {
        throw new TypeError(`invalid dateValue in record literal: [${userDate}]`);
      }

      if(year.length !== 4){
        throw new TypeError(`invalid year in record literal: [${year}]`);
      }
      
      return new DateOfBirth(userDate, monthDetails.month, year);
    }
  
    // Note: `type` on the @Column must be set to 'text'
    // convert into a stringified record literal
    public static toPGCompositeType(v: DateOfBirth): string {
      if (!v) { throw new TypeError(`invalid Date object`); }
      return `(${v.date},${v.month},${v.year})`;
    }
  }