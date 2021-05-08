import MonthArray from '../util/month-array.util';


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
    public static fromPGCompositeType(dob: string): DateOfBirth {
      if (!(typeof dob === "string")) { throw new TypeError(`composite type didn't return as string`); }
      const [date, month, year] = dob.replace("(", "").replace(")","").split(",");
      const userDate = parseInt(date, 10)
      return new DateOfBirth(userDate, month, year);
    }
  
    // Note: `type` on the @Column must be set to 'text'
    // convert into a stringified record literal
    public static toPGCompositeType(dob: DateOfBirth): string {
      if (!dob) { throw new TypeError(`invalid DateOfBirth object`); }

      const monthDetails = MonthArray.find((item) => item.alias === dob.month)
      if (!monthDetails) {
        throw new TypeError(`invalid month in record literal: [${dob.month}]`);
      }
    
      const userDate = dob.date;
      if (typeof userDate !== "number" || userDate > 31) {
        throw new TypeError(`invalid dateValue in record literal: [${userDate}]`);
      }

      if(dob.year.length !== 4){
        throw new TypeError(`invalid year in record literal: [${dob.year}]`);
      }
      return `(${dob.date},${monthDetails.month},${dob.year})`;
    }
  }