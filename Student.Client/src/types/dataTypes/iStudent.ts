export type Student = {
    id: number|undefined;
    name: string|undefined;
    surname: string|undefined;
    patron: string|undefined;
    faculty: string|undefined;
    specialty: string|undefined;
    course: string|undefined;
    group: string|undefined;
    city: {id: number|undefined, country: string|undefined}|undefined;
    postalCode: string|undefined;
    street: string|undefined;
    phone: string|undefined;
    email: string|undefined;
}