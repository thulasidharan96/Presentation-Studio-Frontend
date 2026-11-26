import { useMemo } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { json } from '@codemirror/lang-json'
import { parseJsonPatch } from './patchValidation'

export function Rfc6902PatchEditor({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const validation = useMemo(() => {
    return parseJsonPatch(value) ? '' : 'Patch RFC 6902 non valida.'
  }, [value])
  return <div><div className={`tag ${validation ? 'status error' : 'status'}`}>{validation || 'Patch RFC 6902 valida'}</div><div className="code-editor" style={{ marginTop: 10 }}><CodeMirror value={value} height="220px" extensions={[json()]} onChange={onChange} /></div></div>
}
