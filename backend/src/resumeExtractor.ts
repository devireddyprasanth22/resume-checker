import {pdfToText} from 'pdf-ts';
import fs from 'fs';

const resumeExtractor = async (filePath: string):Promise<string> => {
    if (!fs.existsSync(filePath)) {
        throw new Error("File does not exist");
    }
    const fileBuffer = await fs.readFileSync(filePath);
    const text = await pdfToText(fileBuffer);
    return text;
}
export default resumeExtractor;