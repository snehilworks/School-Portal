export interface CompleteStudentProfileRequestBody {
    name: string;
    phone: number;
    dob?: Date;
    gender?: string;
    fatherName?: string;
    fatherPhone?: number;
    motherName?: string;
    motherPhone?: number;
    class?: string;
    placeName?: string;
    address?: string;
    aadharNumber?: string;
    previousSchoolTC?: string | null;
  }
  