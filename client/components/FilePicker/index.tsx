import { FileUploader } from 'react-drag-drop-files';

interface Props {
  setFile: (file: File | null) => void;
  types: string[];
}

export default function FilePicker({ setFile, types }: Props) {
  const handleChange = (file: File) => {
    setFile(file);
  };
  return <FileUploader handleChange={handleChange} name='file' types={types} />;
}
