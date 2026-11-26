import { ImageGeneratorForm } from './ImageGeneratorForm'
import { ImageLibraryGrid } from './ImageLibraryGrid'

export function ImageStudioPage() {
  return <><div className="page-heading"><div><p className="eyebrow">CREATIVE STUDIO</p><h1>Immagini</h1><p>Visual su misura, coerenti con il brand e pronti per le tue storie.</p></div></div><div className="image-layout"><ImageGeneratorForm /><ImageLibraryGrid /></div></>
}
