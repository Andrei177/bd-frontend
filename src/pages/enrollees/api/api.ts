import { $privateApi } from "../../../shared"
import { ShortEnrollee } from "./types"

export const getNotApproveEnrolleesList = async () => {
    const response = await $privateApi.get<Record<"enrollees", ShortEnrollee[]>>("/enrollee/not-approve-list")

    return response
}

export const updateEnrolleeStatus = async (enrollee_id: number | undefined, status: 'reject' | 'approve' | 'unchecked', cause_reject ?: string) => {
    if(!enrollee_id) return Promise.reject({message: "Не передан id абитуриента"})
    const response = await $privateApi.put("/enrollee/update-status", {
        enrollee_id,
        status,
        cause_reject
    })

    return response
}