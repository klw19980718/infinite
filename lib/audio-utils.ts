/**
 * Audio utility functions for server-side audio processing
 */
import { parseBuffer } from 'music-metadata'

/**
 * Get audio duration from a File object (Node.js server-side)
 * @param file File object from FormData
 * @returns Duration in seconds, or null if unable to parse
 */
export async function getAudioDuration(file: File): Promise<number | null> {
  try {
    // Convert File to Buffer
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    
    // Parse audio metadata
    // parseBuffer is used for Buffer input, parseFile is for file paths
    const metadata = await parseBuffer(buffer, { mimeType: file.type, size: file.size })
    
    // Get duration in seconds
    if (metadata.format.duration) {
      return Math.ceil(metadata.format.duration)
    }
    
    return null
  } catch (error) {
    console.error('Error parsing audio duration:', error)
    return null
  }
}

