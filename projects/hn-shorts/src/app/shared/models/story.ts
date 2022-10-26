import { ItemType } from "./item-type";

export interface Story {
    by: string;
    descendants: number;
    id: number;
    kids: number[];
    score: number;
    text: string;
    time: number;
    title: string;
    type: ItemType;
    url: string;
}
