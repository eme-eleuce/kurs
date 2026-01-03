// Tipos TypeScript para los datos de adquisiciones

export interface Producto {
  nombre: string;
  cantidad: number;
}

export interface ProductoConAccion extends Producto {
  accion: string;
}

export interface AdquisicionesTotales {
  metadata: {
    generado: string;
    total_productos: number;
    total_unidades: number;
  };
  productos: Producto[];
}

export interface MesData {
  mes: number;
  total_productos: number;
  total_unidades: number;
  productos: Producto[];
}

export interface AdquisicionesPorMes {
  metadata: {
    generado: string;
    total_meses: number;
  };
  meses: MesData[];
}

export interface Dependencia {
  nombre: string;
  mes: number;
  total_productos: number;
  total_unidades: number;
  productos: ProductoConAccion[];
}

export interface AdquisicionesPorDependencia {
  metadata: {
    generado: string;
    total_dependencias: number;
  };
  dependencias: Dependencia[];
}

export interface MesResumen {
  mes: number;
  productos: number;
  unidades: number;
  dependencias: number;
}

export interface Metadata {
  proyecto: string;
  descripcion: string;
  generado: string;
  resumen: {
    total_productos_unicos: number;
    total_unidades: number;
    total_dependencias: number;
    total_meses: number;
  };
  por_mes: MesResumen[];
}
