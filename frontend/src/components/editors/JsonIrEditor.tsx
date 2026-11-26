import { useMemo } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { json } from '@codemirror/lang-json'
import { z } from 'zod'

const irSchema = z.object({ nodes: z.array(z.record(z.string(), z.unknown())).optional(), edges: z.array(z.record(z.string(), z.unknown())).optional() }).passthrough()
export function JsonIrEditor({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const valid = useMemo(() => {
    try { return irSchema.safeParse(JSON.parse(value)).success } catch { return false }
  }, [value])
  return (
    <div>
      <div className="editor-status"><span className={`tag ${valid ? 'status' : 'status error'}`}>{valid ? 'JSON valido' : 'Schema non valido'}</span><button className="button" onClick={() => { try { onChange(JSON.stringify(JSON.parse(value), null, 2)) } catch { /* Invalid JSON stays editable. */ } }}>Formatta</button></div>
      <div className="code-editor"><CodeMirror value={value} height="340px" extensions={[json()]} onChange={onChange} basicSetup={{ lineNumbers: true, foldGutter: true }} /></div>
    </div>
  )
}
