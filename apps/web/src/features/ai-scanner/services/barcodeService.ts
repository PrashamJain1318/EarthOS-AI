import { BrowserMultiFormatReader, IScannerControls } from '@zxing/browser';

class BarcodeService {
  private reader: BrowserMultiFormatReader;
  private currentControls: IScannerControls | null = null;

  constructor() {
    this.reader = new BrowserMultiFormatReader();
  }

  /**
   * Scans a static image file for barcodes or QR codes.
   */
  public async scanImage(file: File): Promise<string | null> {
    try {
      const imageUrl = URL.createObjectURL(file);
      const result = await this.reader.decodeFromImageUrl(imageUrl);
      URL.revokeObjectURL(imageUrl);
      return result ? result.getText() : null;
    } catch (error) {
      console.error('BarcodeService - Failed to scan image:', error);
      return null;
    }
  }

  /**
   * Binds to an existing video element and continuously searches for barcodes.
   * Useful when the stream is already managed manually (e.g. via getUserMedia).
   */
  public async bindToVideoElement(
    videoElement: HTMLVideoElement,
    onDetect: (result: string) => void
  ): Promise<void> {
    try {
      // Stop any existing decode loop
      this.stopVideoScan();

      this.currentControls = await this.reader.decodeFromVideoElement(
        videoElement,
        (result, error, controls) => {
          if (result) {
            controls.stop(); // Stop scanning once we find a result
            onDetect(result.getText());
          }
        }
      );
    } catch (error) {
      console.error('BarcodeService - Failed to bind to video element:', error);
    }
  }

  /**
   * Manually stops the active video scan loop.
   */
  public stopVideoScan(): void {
    if (this.currentControls) {
      this.currentControls.stop();
      this.currentControls = null;
    }
  }
}

export const barcodeService = new BarcodeService();
