export interface Entertainer {
    entertainerID: number;
    entStageName: string;
    entSSN: string;
    entStreetAddress: string;
    entCity: string;
    entState: string;
    entZipCode: number;
    entPhoneNumber: string;
    entWebPage: string;
    entEmailAddress: string;
    dateEntered: string; // ISO date in string format (e.g. "1997-05-24")
    timesBooked: number;
    lastBookedDate: string; // ISO date in string format (e.g. "1997-05-24")

  }
  