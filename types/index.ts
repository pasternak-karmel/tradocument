export type ApiResponse<T> = {
  data?: T;
  error?: string;
};

export type CourseFormData = {
  codeUE: string;
  codeEC: string;
  contenu: string;
  enseignement: string;
  cours: number;
  tpTd: number;
  sp: number;
  tpe: number;
  ctt: number;
  cect: number;
  cc: boolean;
  et: boolean;
  ccEt: boolean;
  professor: string;
  classId: string;
};

export type ServerActionResponse<T> = {
  data?: T;
  error?: string;
};
