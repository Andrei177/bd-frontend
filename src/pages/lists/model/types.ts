export type Direction = {
    name_direction: string,
    number_direction: string,
    plan: number
}

export type Faculty = {
    faculty_id: number,
    name_faculty: string,
    directions: Direction[]
}