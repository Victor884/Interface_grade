class API_GRADE_MAker {
    private baseURL: string;
  
    constructor(baseURL: string) {
      this.baseURL = baseURL;
    }
  
    private async request(method: string, route: string, body: any = null): Promise<any> {
      const options: RequestInit = {
        method: method.toUpperCase(),
        headers: { "Content-Type": "application/json" },
        credentials: "include", // Envia cookies
      };
    
      if (body) {
        options.body = JSON.stringify(body);
      }
    
      try {
        const response = await fetch(`${this.baseURL}${route}`, options);
    
        if (!response.ok) {
          const error = await response.json().catch(() => ({
            message: "Erro desconhecido",
          }));
          throw new Error(error.message || `Erro ${response.status}`);
        }
    
        return response.status !== 204 ? await response.json() : null;
      } catch (error) {
        console.error(`Erro na requisição para ${route}:`, error);
        throw error;
      }
    }
  
    public get(route: string): Promise<any> {
      return this.request("GET", route);
    }
  
    public post(route: string, body: any = null): Promise<any> {
      return this.request("POST", route, body);
    }
  
    public put(route: string, body: any = null): Promise<any> {
      return this.request("PUT", route, body);
    }
  
    public delete(route: string): Promise<any> {
      return this.request("DELETE", route);
    }
  }
  
  // Exporta uma instância configurada da API
  export default new API_GRADE_MAker("http://localhost:8080/api");