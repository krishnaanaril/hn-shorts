import { ItemType } from "./item-type";

export interface Story {
    by: string;
    descendants: number | undefined;
    id: number;
    kids: number[] | undefined;
    score: number;
    text: string | undefined;
    time: number;
    title: string;
    type: ItemType;
    url: string;
}
