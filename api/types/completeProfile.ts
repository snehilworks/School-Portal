export interface CompleteStudentProfileRequestBody {
    name: string;
    email: string;
    password: string;
    phone: number;
    dob?: Date;
    gender?: string;
    fatherName?: string;
    fatherPhone?: number;
    motherName?: string;
    motherPhone?: number;
    class?: string;
    section?: string;
    admission: boolean;
    placeName?: string;
    address?: string;
    aadharNumber?: string;
    previousSchoolTC?: string | null;
  }
  