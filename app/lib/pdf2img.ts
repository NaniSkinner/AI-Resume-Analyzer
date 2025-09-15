export interface PdfConversionResult {
  imageUrl: string;
  file: File | null;
  error?: string;
}

let pdfjsLib: any = null;
let isLoading = false;
let loadPromise: Promise<any> | null = null;

async function loadPdfJs(): Promise<any> {
  if (pdfjsLib) return pdfjsLib;
  if (loadPromise) return loadPromise;

  isLoading = true;

  try {
    // @ts-expect-error - pdfjs-dist/build/pdf.mjs is not a module
    loadPromise = import("pdfjs-dist/build/pdf.mjs")
      .then((lib) => {
        console.log("📚 Loading PDF.js library...");
        // Set the worker source to use local file
        lib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";
        console.log(
          "🔧 Worker source set to:",
          lib.GlobalWorkerOptions.workerSrc
        );
        pdfjsLib = lib;
        isLoading = false;
        console.log("✅ PDF.js library ready");
        return lib;
      })
      .catch((error) => {
        console.error("❌ Failed to load PDF.js:", error);
        isLoading = false;
        throw error;
      });

    return loadPromise;
  } catch (error) {
    console.error("❌ Error loading PDF.js:", error);
    isLoading = false;
    throw error;
  }
}

export async function convertPdfToImage(
  file: File
): Promise<PdfConversionResult> {
  try {
    console.log("🔄 Starting PDF conversion for:", file.name);
    const lib = await loadPdfJs();
    console.log("✅ PDF.js library loaded");

    const arrayBuffer = await file.arrayBuffer();
    console.log(
      "✅ File converted to array buffer, size:",
      arrayBuffer.byteLength
    );

    const pdf = await lib.getDocument({ data: arrayBuffer }).promise;
    console.log("✅ PDF document loaded, pages:", pdf.numPages);

    const page = await pdf.getPage(1);
    console.log("✅ First page loaded");

    const viewport = page.getViewport({ scale: 4 });
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    canvas.width = viewport.width;
    canvas.height = viewport.height;

    if (context) {
      context.imageSmoothingEnabled = true;
      context.imageSmoothingQuality = "high";
    }

    console.log("✅ Canvas created, rendering page...");
    await page.render({ canvasContext: context!, viewport }).promise;
    console.log("✅ Page rendered to canvas");

    return new Promise((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            console.log("✅ Blob created, size:", blob.size);
            // Create a File from the blob with the same name as the pdf
            const originalName = file.name.replace(/\.pdf$/i, "");
            const imageFile = new File([blob], `${originalName}.png`, {
              type: "image/png",
            });

            console.log("✅ PDF conversion successful:", imageFile.name);
            resolve({
              imageUrl: URL.createObjectURL(blob),
              file: imageFile,
            });
          } else {
            console.error("❌ Failed to create image blob");
            resolve({
              imageUrl: "",
              file: null,
              error: "Failed to create image blob",
            });
          }
        },
        "image/png",
        1.0
      ); // Set quality to maximum (1.0)
    });
  } catch (err) {
    console.error("❌ PDF conversion error:", err);
    return {
      imageUrl: "",
      file: null,
      error: `Failed to convert PDF: ${err}`,
    };
  }
}
