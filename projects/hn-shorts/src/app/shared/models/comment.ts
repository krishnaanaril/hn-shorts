import { ItemType } from "./item-type";

export interface Comment {
    by: string;
    id: number;
    kids: number;
    parent: number;
    text: string;
    time: number;
    type: ItemType
}
