/**
 * Carga un shader desde una URL y retorna su contenido como string.
 * @param url Ruta del archivo shader.
 * @returns Promise que resuelve en el contenido del shader.
 */
export async function loadShader(url: string): Promise<string> {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error al cargar el shader desde ${url}: ${response.statusText}`);
    }
    return await response.text();
  }
  
  /**
   * (Opcional) Carga múltiples shaders dado un array de URLs.
   * @param urls Array de rutas a archivos shader.
   * @returns Promise que resuelve en un array de contenidos de shaders.
   */
  export async function loadShaders(urls: string[]): Promise<string[]> {
    const promises = urls.map((url) => loadShader(url));
    return await Promise.all(promises);
  }