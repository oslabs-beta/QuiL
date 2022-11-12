export type carContructor = {
    new (s: string): carInstance,

}

export type pool = {
    new (o: object): object
}

export type carInstance = {
    make: string,
    model?: string
} 

export interface Car {
    (make: string): 
}