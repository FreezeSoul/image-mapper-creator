import { createWorker } from 'tesseract.js';

const worker = createWorker({
    logger: m => console.log(m),
    langPath: './',
});

export async function orcText(imageData: any, position: any) {
    if (!(worker as any).__isinitialize) {
        await worker.load();
        await worker.loadLanguage('eng+chi_sim');
        await worker.initialize('chi_sim');
        (worker as any).__isinitialize = true;
    }
    const { data: { text } } = await worker.recognize(imageData, { rectangle: position });
    return text;
}
