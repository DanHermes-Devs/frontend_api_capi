import { Address } from "./address";
import { Email } from "./email";
import { Phone } from "./phone";

export interface Contact {
  id: number,
  name: string,
  notes: string,
  birthday: string,
  website: string,
  company: string,
  created_at: string,
  updated_at: string,
  addresses: Address[],
  emails: Email[],
  phones: Phone[],
}
