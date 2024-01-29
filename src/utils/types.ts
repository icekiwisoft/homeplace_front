// a furniture ad type can be a location or a sale

export enum AdType {
location,
sale
}





export interface Media
{
   file:string,
   thumbnailFile:string,

}

export interface Ad{
    description:string,
    type: AdType
    medias:Media[],
}

export interface furnitureAd extends Ad
{
}

export interface HouseAd extends Ad {

    pallor: number,
    bathroom: number,
    kitchen: number,
    room: number
}
export interface Announcer
{
    name:string,
    photoUrl:string,
    furniture:number,
    house:number,
    contact:string
    email:string
}


export interface User
{
name:string,
email:string,
is_admin:boolean

}

export interface Category
{
    name:string,
    AdNumber:number
}

