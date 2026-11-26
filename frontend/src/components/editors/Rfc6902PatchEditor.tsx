import { useMemo } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { json } from '@codemirror/lang-json'
import { applyPatch, type Operation } from 'fast-json-patch'

export function Rfc6902PatchEditor({ value, onChange, documentValue = {} }: { value: string; onChange: (value: string) => void; documentValue?: unknown }) {
  const validation = useMemo(() => {
    try {
      const patch = JSON.parse(value) as Operation[]
      if (!Array.isArray(patch)) return 'La patch deve essere un array di operazioni.'
      applyPatch(structuredClone(documentValue), patch, true, false)
      return ''
    } catch (error) {
      return error instanceof Error ? error.message : 'Patch JSON non valida.'
    }
  }, [documentValue, value])
  return <div><div className={`tag ${validation ? 'status error' : 'status'}`}>{validation || 'Patch RFC 6902 valida'}</div><div className="code-editor" style={{ marginTop: 10 }}><CodeMirror value={value} height="220px" extensions={[json()]} onChange={onChange} /></div></div>
}
