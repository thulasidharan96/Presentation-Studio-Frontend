import { validate, type Operation } from 'fast-json-patch'

export function parseJsonPatch(value: string): Operation[] | null {
  try {
    const operations: unknown = JSON.parse(value)
    if (!Array.isArray(operations)) return null
    const error = validate(operations as Operation[])
    return error ? null : operations as Operation[]
  } catch {
    return null
  }
}
