import { CityDTO } from './city.dto';

export interface AddressDTO {
    id : string,
    street : string;
    number: string;
    neighborhood: string;
    zipcode: string;
    city: CityDTO;
}